const baseUrl = process.env.BASE_URL || "http://localhost:3000";

const checks = [
  { path: "/wp-admin/install.php?step=1", status: 404 },
  { path: "/wp-login.php", status: 404 },
  { path: "/.env", status: 404 },
  { path: "/.git/config", status: 404 },
  { path: "/", status: 200 },
  { path: "/logo-azul.svg", status: 200 },
  { path: "/hero-limpeza-pos-obra.webp", status: 200 },
];

const requiredHeaders = [
  "x-content-type-options",
  "x-frame-options",
  "referrer-policy",
  "permissions-policy",
  "cross-origin-opener-policy",
  "cross-origin-resource-policy",
  "content-security-policy-report-only",
];

async function checkStatus({ path, status }) {
  const response = await fetch(new URL(path, baseUrl));

  if (response.status !== status) {
    throw new Error(`${path} returned ${response.status}, expected ${status}`);
  }

  return response;
}

async function main() {
  for (const check of checks) {
    await checkStatus(check);
  }

  const home = await fetch(new URL("/", baseUrl));
  const missingHeaders = requiredHeaders.filter(
    (header) => !home.headers.has(header),
  );

  if (missingHeaders.length > 0) {
    throw new Error(`Missing security headers: ${missingHeaders.join(", ")}`);
  }

  const html = await home.text();

  if (!html.includes("/hero-limpeza-pos-obra.webp")) {
    throw new Error("Hero image is not referenced in the home page HTML");
  }

  const heroOptimizedAsset = html
    .match(/["'](\/_next\/image\?url=%2Fhero-limpeza-pos-obra\.webp[^"']+)["']/)?.[1]
    ?.replaceAll("&amp;", "&");

  if (!heroOptimizedAsset) {
    throw new Error("Could not find the optimized hero image URL in the home page");
  }

  await checkStatus({ path: heroOptimizedAsset, status: 200 });

  const nextStaticAsset = html.match(/["'](\/_next\/static\/[^"']+)["']/)?.[1];

  if (!nextStaticAsset) {
    throw new Error("Could not find a Next.js static asset in the home page");
  }

  await checkStatus({ path: nextStaticAsset, status: 200 });

  console.log(`Security smoke test passed for ${baseUrl}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
