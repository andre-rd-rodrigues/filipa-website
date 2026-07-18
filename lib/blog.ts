/**
 * Blog data layer — backed by Sanity.
 *
 * The public surface is a set of async functions returning plain data, so page
 * components stay unchanged. `body` is Portable Text, rendered with
 * @portabletext/react on the article page.
 */
import type { PortableTextBlock } from "@portabletext/types";
import { sanityFetch } from "@/sanity/lib/client";

/** A single question/answer pair. Powers the on-page FAQ + FAQPage JSON-LD. */
export type FaqItem = { question: string; answer: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  /** ISO date string. */
  publishedAt: string;
  /** Estimated reading time in minutes. */
  readingMinutes: number;
  coverImage: { src: string; alt: string };
  /** Portable Text — only present on the detail query. */
  body?: PortableTextBlock[];
  /** SEO keywords surfaced in <meta keywords> and article JSON-LD. */
  keywords?: string[];
  /** Optional FAQ block: rendered on-page and emitted as FAQPage JSON-LD. */
  faq?: FaqItem[];
  /** Slugs of related posts (same series/topic) for internal linking. */
  relatedSlugs?: string[];
};

const CARD_FIELDS = `
  "slug": slug.current,
  title,
  excerpt,
  "category": category->title,
  author,
  publishedAt,
  readingMinutes,
  "coverImage": { "src": coverImage.asset->url, "alt": coverImage.alt }
`;

/** All posts, newest first. */
export async function getAllPosts(): Promise<BlogPost[]> {
  return sanityFetch<BlogPost[]>(
    `*[_type == "post"] | order(publishedAt desc){${CARD_FIELDS}}`,
  );
}

/** A single post by slug, or null if not found. */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return sanityFetch<BlogPost | null>(
    `*[_type == "post" && slug.current == $slug][0]{
      ${CARD_FIELDS},
      body,
      keywords,
      faq[]{ question, answer },
      "relatedSlugs": relatedPosts[]->slug.current
    }`,
    { slug },
  );
}

/** The N most recent posts (home teaser, related lists). */
export async function getLatestPosts(limit = 3): Promise<BlogPost[]> {
  return sanityFetch<BlogPost[]>(
    `*[_type == "post"] | order(publishedAt desc)[0...$limit]{${CARD_FIELDS}}`,
    { limit },
  );
}

/** Locale-aware date formatting shared by blog surfaces. */
export function formatPostDate(iso: string): string {
  return new Intl.DateTimeFormat("pt-PT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

/** Categories for the blog filters, in editorial order. */
export async function getAllCategories(): Promise<string[]> {
  return sanityFetch<string[]>(
    `*[_type == "category"] | order(order asc, title asc).title`,
  );
}

/**
 * URL-friendly slug for a category label.
 * e.g. "Saúde Mental no Desporto" → "saude-mental-no-desporto".
 */
export function categorySlug(category: string): string {
  return category
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Resolve a category slug back to its label, or null if unknown. */
export function categoryFromSlug(
  slug: string,
  categories: string[],
): string | null {
  return categories.find((c) => categorySlug(c) === slug) ?? null;
}
