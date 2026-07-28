import type { MetadataRoute } from "next";
import { getSiteSettings } from "@/lib/settings";

/**
 * Web app manifest — enables "Add to Home Screen" and defines the installed
 * app name, icons and colours. `theme_color`/`background_color` match the
 * always-dark brand surface (`#0A0A0A`).
 */
export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const site = await getSiteSettings();
  return {
    name: site.fullName,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0A0A0A",
    theme_color: "#0A0A0A",
    lang: "pt-PT",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
