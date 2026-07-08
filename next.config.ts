import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
    ],
  },
};

export default nextConfig;
