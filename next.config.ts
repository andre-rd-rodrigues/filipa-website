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
