import { NextStudio } from "next-sanity/studio";

import config from "@/sanity.config";

/**
 * Embedded Sanity Studio, mounted at /studio. The catch-all segment lets the
 * Studio's internal routing (Structure, Vision, etc.) work without 404s.
 */
export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
