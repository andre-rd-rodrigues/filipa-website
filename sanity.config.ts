"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { apiVersion, dataset, projectId } from "@/sanity/env";
import { schemaTypes } from "@/sanity/schemaTypes";
import { structure, SINGLETON_TYPES } from "@/sanity/structure";

/** Documentos únicos: não podem ser criados/duplicados/apagados livremente. */
const SINGLETONS = new Set<string>([...SINGLETON_TYPES, "siteSettings"]);

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
  schema: {
    types: schemaTypes,
    // Hide singletons from the global "create new" menu.
    templates: (prev) => prev.filter((t) => !SINGLETONS.has(t.schemaType)),
  },
  document: {
    // Remove create/duplicate/delete actions for singleton documents.
    actions: (prev, { schemaType }) =>
      SINGLETONS.has(schemaType)
        ? prev.filter(
            (action) =>
              !["duplicate", "delete", "unpublish"].includes(
                (action as { action?: string }).action ?? "",
              ),
          )
        : prev,
  },
});
