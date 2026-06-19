# Security

## Protections in code

- Scanner paths for WordPress, PHP tooling, leaked env files, git metadata, backups, archives, SQL dumps, and PHP files are blocked in `src/proxy.ts`.
- Blocked scanner probes return `404` instead of `403`.
- Blocked requests log only path, method, user-agent, and best-effort IP from proxy headers. Cookies, authorization headers, tokens, and request bodies are not logged.
- `X-Powered-By` is disabled in `next.config.ts`.
- Global security headers are configured in `next.config.ts`:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy` denying camera, microphone, geolocation, payment, usb, and fullscreen
  - `Cross-Origin-Opener-Policy: same-origin`
  - `Cross-Origin-Resource-Policy: same-site`
  - `Content-Security-Policy-Report-Only`
- `Strict-Transport-Security` is only emitted in production when `ENABLE_HSTS=true`.
- Canonical host and HTTPS redirects run only in production. Set `CANONICAL_HOST` to the chosen host, for example `mmflimpezas.com.br`.

## Content Security Policy

The current CSP is intentionally report-only:

- scripts, styles, images, fonts, workers, and connections are limited to the current origin unless explicitly needed;
- `style-src 'unsafe-inline'` and `script-src 'unsafe-inline' 'unsafe-eval'` are kept during the report-only phase to avoid breaking Next.js runtime behavior before CSP reports are reviewed;
- fonts are local through `@fontsource`, so Google Fonts is not allowed;
- no Google Analytics, Tag Manager, or external API domain is currently present in the code.

After monitoring reports in staging and production, replace `Content-Security-Policy-Report-Only` with `Content-Security-Policy` and tighten inline script/style rules with nonces or hashes.

## Forms and APIs

This project currently has no API routes, route handlers, server actions, or POST forms. The contact flow links to WhatsApp.

Before adding any public POST endpoint, implement server-side controls:

- validate body data with Zod or equivalent;
- limit request body size;
- sanitize text fields;
- add a honeypot field for public forms;
- add rate limiting by IP or a simple fingerprint;
- consider Cloudflare Turnstile or reCAPTCHA for public forms;
- return generic errors without stack traces, secrets, tokens, or internal details.

## Environment Variables

- `.env*` files are ignored by git.
- Keep `NEXT_PUBLIC_` only for values that can safely be exposed in the browser.
- Move any API key, SMTP password, database URL, token, or private credential into unprefixed server-side environment variables.
- Rotate any secret if it was ever committed or exposed publicly.

## Testing Locally

Run the application, then run the smoke test from another terminal:

```bash
npm run dev
BASE_URL=http://localhost:3000 npm run test:security
```

Production-like test:

```bash
npm run build
npm run start
BASE_URL=http://localhost:3000 npm run test:security
```

Manual checks:

```bash
curl -I http://localhost:3000/
curl -I http://localhost:3000/wp-admin/install.php?step=1
curl -I http://localhost:3000/.env
curl -I http://localhost:3000/.git/config
```

## Hosting and CDN Checklist

- Enforce HTTPS at the hosting/CDN layer.
- Pick the canonical domain with or without `www`, then set `CANONICAL_HOST`.
- Only enable `ENABLE_HSTS=true` after the production domain and all subdomains are confirmed to work over HTTPS.
- Configure CSP report collection before switching CSP from report-only to enforcement.
- Add CDN/WAF rate limits for repeated 404 scanner probes.
- If Cloudflare is used, preserve `cf-connecting-ip` and consider Bot Fight Mode, WAF managed rules, and Turnstile for future forms.
