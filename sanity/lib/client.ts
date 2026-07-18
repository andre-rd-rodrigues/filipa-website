import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "@/sanity/env";

/**
 * Single import point for reading content from Sanity. GROQ queries live
 * alongside their content type in lib/*. `useCdn` keeps reads fast and cheap for
 * published content; disable it for draft/preview reads.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // The site is statically generated, so all reads happen at build time. Skip
  // the CDN to always build from the freshest published content (no edge lag).
  useCdn: false,
  perspective: "published",
});

/**
 * Thin wrapper so call sites don't repeat generics/options. Uses ISR: pages
 * regenerate at most once a minute, so Studio edits go live without a redeploy
 * and stale build-cache entries self-heal.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { revalidate: 60 },
  });
}
