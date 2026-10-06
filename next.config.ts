import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Single-locale setup for now (English). Bangla later moves pages under app/[locale].
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    // Dev only. On this Windows machine's slow disk, Turbopack's dev cache compaction overlapped with
    // page requests and pages failed with "Unexpected end of JSON input". Production builds unaffected.
    turbopackFileSystemCacheForDev: false,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default withNextIntl(nextConfig);
