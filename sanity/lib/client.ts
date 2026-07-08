import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "@/sanity/env";

/**
 * Single import point for reading content from Sanity. GROQ queries live
 * alongside their content type once schemas are added. `useCdn` keeps reads
 * fast and cheap for published content; disable it for draft/preview reads.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
