import type { NextConfig } from "next";

/**
 * Content-Security-Policy, kept in Report-Only mode for now so violations are
 * logged (browser console) without breaking the site. Sources cover everything
 * the site actually loads: Google Fonts, Sanity CDN, YouTube thumbnails,
 * Google Analytics (@next/third-parties), reCAPTCHA v2 and Formspree.
 * Promote to an enforced `Content-Security-Policy` once validated.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self' https://formspree.io",
  "img-src 'self' data: blob: https://cdn.sanity.io https://images.unsplash.com https://i.ytimg.com https://img.youtube.com https://i.postimg.cc https://www.google.com https://www.gstatic.com",
  "font-src 'self' https://fonts.gstatic.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "script-src 'self' 'unsafe-inline' https://www.google.com https://www.gstatic.com https://www.googletagmanager.com",
  "connect-src 'self' https://formspree.io https://cdn.sanity.io https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com",
  "frame-src https://www.google.com",
].join("; ");

/** Security response headers, applied to every route. */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Content-Security-Policy-Report-Only", value: contentSecurityPolicy },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  images: {
    // Prefer AVIF (falls back to WebP), which is typically 20-50% smaller than
    // WebP for the Sanity editorial photography — the main lever for the
    // "Images over 100 kB" crawl finding, since delivery goes through next/image.
    formats: ["image/avif", "image/webp"],
    // Remote imagery. Unsplash covers the current mocked editorial photography;
    // cdn.sanity.io is ready for when content moves to Sanity — see lib/blog.ts.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**",
      },
      // YouTube episode thumbnails (see youTubeThumbnail in app/(site)/podcast/data.ts).
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
    ],
  },
};

export default nextConfig;
