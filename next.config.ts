import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Remote imagery (editorial photography). Kept intentionally narrow.
    // Swap/extend with the Sanity CDN host (cdn.sanity.io) when the blog
    // moves off mocked data — see lib/blog.ts.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
