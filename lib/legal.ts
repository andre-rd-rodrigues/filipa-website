/**
 * Legal pages data layer — backed by Sanity. Body is Portable Text with two
 * custom blocks (cookie table + cookie settings button) rendered on the page.
 */
import type { PortableTextBlock } from "@portabletext/types";
import { sanityFetch } from "@/sanity/lib/client";

export type CookieRow = {
  name: string;
  provider: string;
  purpose: string;
  duration: string;
};

export type LegalPage = {
  title: string;
  slug: string;
  lastUpdated?: string;
  body: PortableTextBlock[];
  cookies?: CookieRow[];
  seo?: { metaTitle?: string; metaDescription?: string };
};

export async function getLegalPage(slug: string): Promise<LegalPage | null> {
  return sanityFetch<LegalPage | null>(
    `*[_type == "legalPage" && slug.current == $slug][0]{
      title,
      "slug": slug.current,
      lastUpdated,
      body,
      cookies[]{ name, provider, purpose, duration },
      "seo": seo{ metaTitle, metaDescription }
    }`,
    { slug },
  );
}
