/**
 * Services data layer — backed by Sanity. The public surface is a set of async
 * functions returning plain data, so page components stay unchanged.
 */
import { sanityFetch } from "@/sanity/lib/client";

/** A single "O que vais ganhar" item — optional bold label + description. */
export type ServiceBenefit = { label?: string; description: string };

/** A single step in the "Como funciona" flow. */
export type ServiceProcessStep = { title: string; lead?: string; body: string };

/** Closing CTA copy for the detail page (falls back to generic defaults). */
export type ServiceClosing = {
  heading?: string | null;
  lead?: string | null;
  body?: string | null;
};

export type Service = {
  slug: string;
  number: string;
  title: string;
  tag?: string;
  subtitle?: string;
  summary: string;
  description: string;
  image: { src: string; alt: string };
  intro?: string[];
  benefits?: ServiceBenefit[];
  process?: ServiceProcessStep[];
  audience?: string;
  includes?: string[];
  ctas?: { label: string; href: string; variant: "primary" | "secondary" }[];
  closing?: ServiceClosing;
};

const FIELDS = `
  "slug": slug.current,
  number,
  title,
  tag,
  subtitle,
  summary,
  description,
  "image": { "src": image.asset->url, "alt": image.alt },
  intro,
  includes,
  audience,
  benefits[]{ label, description },
  process[]{ title, lead, body },
  ctas[]{ label, href, variant },
  "closing": { "heading": closingHeading, "lead": closingLead, "body": closingBody }
`;

/** All services, in editorial order. */
export async function getAllServices(): Promise<Service[]> {
  return sanityFetch<Service[]>(
    `*[_type == "service"] | order(orderRank asc){${FIELDS}}`,
  );
}

/** A single service by slug, or null if not found. */
export async function getServiceBySlug(slug: string): Promise<Service | null> {
  return sanityFetch<Service | null>(
    `*[_type == "service" && slug.current == $slug][0]{${FIELDS}}`,
    { slug },
  );
}
