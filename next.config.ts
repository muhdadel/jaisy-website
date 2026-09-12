import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

/**
 * Content-Security-Policy is intentionally strict but permissive enough for
 * Next.js' inline runtime + the self-hosted fonts used by the site.
 * Widen `img-src` / `connect-src` here when Phase 2 adds a storage/analytics provider.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-src 'self' https://www.google.com https://maps.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  /**
   * Production only. On a plain-http dev origin (e.g. http://192.168.x.x:3000 when
   * testing from a phone) this makes the browser upgrade every `/_next/static/*`
   * request to https, which the dev server cannot answer — the page then renders
   * with no CSS or JS. `localhost` is exempt from the upgrade, which is why it
   * only breaks on the LAN address.
   */
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // HSTS is meaningless over http and would pin the LAN host to https once seen.
  ...(isDev
    ? []
    : [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ]),
];

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Lets phones/tablets on the LAN load `/_next/*` dev assets.
  allowedDevOrigins: ["192.168.100.3", "192.168.1.122"],
  images: {
    formats: ["image/avif", "image/webp"],
    ...(isGitHubPages ? { unoptimized: true } : {}),
  },
  ...(isGitHubPages
    ? {
        output: "export" as const,
        trailingSlash: true,
        ...(basePath
          ? { basePath, assetPrefix: basePath }
          : {}),
      }
    : {
        async headers() {
          return [
            {
              source: "/:path*",
              headers: securityHeaders,
            },
          ];
        },
      }),
};

export default nextConfig;
