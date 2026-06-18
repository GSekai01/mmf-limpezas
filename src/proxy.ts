import { NextRequest, NextResponse } from "next/server";

const blockedPrefixes = [
  "/wp-admin",
  "/wp-content",
  "/wp-includes",
  "/administrator",
  "/phpmyadmin",
  "/vendor",
  "/backup",
  "/backups",
  "/.env",
  "/.git",
] as const;

const blockedExactPaths = [
  "/wp-login.php",
  "/xmlrpc.php",
  "/adminer.php",
  "/composer.json",
  "/composer.lock",
] as const;

const blockedExtensions = [
  ".php",
  ".sql",
  ".bak",
  ".old",
  ".zip",
  ".tar.gz",
] as const;

const safeCanonicalHost = /^[a-z0-9.-]+(?::\d+)?$/i;
const localHosts = new Set(["localhost", "127.0.0.1", "::1"]);

function isBlockedScannerPath(pathname: string) {
  const path = pathname.toLowerCase();

  if (blockedExactPaths.includes(path as (typeof blockedExactPaths)[number])) {
    return true;
  }

  if (
    blockedPrefixes.some(
      (prefix) => path === prefix || path.startsWith(`${prefix}/`),
    )
  ) {
    return true;
  }

  return blockedExtensions.some((extension) => path.endsWith(extension));
}

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    forwardedFor?.split(",")[0]?.trim() ||
    "unknown"
  );
}

function logBlockedRequest(request: NextRequest) {
  console.warn(
    JSON.stringify({
      event: "blocked_scanner_path",
      path: request.nextUrl.pathname,
      method: request.method,
      userAgent: request.headers.get("user-agent") || "unknown",
      ip: getClientIp(request),
    }),
  );
}

function getCanonicalRedirect(request: NextRequest) {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  const canonicalHost = process.env.CANONICAL_HOST;
  const requestHost = request.headers.get("host");
  const requestHostname = request.nextUrl.hostname;
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const shouldForceHttps = forwardedProto === "http";

  if (localHosts.has(requestHostname)) {
    return null;
  }

  if (
    canonicalHost &&
    safeCanonicalHost.test(canonicalHost) &&
    requestHost &&
    requestHost.toLowerCase() !== canonicalHost.toLowerCase()
  ) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.host = canonicalHost;
    return url;
  }

  if (shouldForceHttps) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    return url;
  }

  return null;
}

export function proxy(request: NextRequest) {
  // These paths are common automated exploitation probes for WordPress, PHP,
  // leaked environment files, backups, source control metadata, and SQL dumps.
  // Return 404 instead of 403 so scanners do not receive confirmation that a
  // protected resource exists.
  if (isBlockedScannerPath(request.nextUrl.pathname)) {
    logBlockedRequest(request);
    return new NextResponse(null, { status: 404 });
  }

  const canonicalRedirectUrl = getCanonicalRedirect(request);

  if (canonicalRedirectUrl) {
    return NextResponse.redirect(canonicalRedirectUrl, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
