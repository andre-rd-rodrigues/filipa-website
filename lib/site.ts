/**
 * Structural site configuration kept in code (routing + deployment config).
 *
 * Editorial identity (name, tagline, contactos, redes sociais, citações) lives
 * in Sanity — see `lib/settings.ts` / the "Definições do site" document.
 */

import type { Metadata } from "next";

/** Deployment config — used for canonical URLs, sitemap and JSON-LD. */
export const siteConfig = {
  url: "https://filipamarques.pt",
  locale: "pt-PT",
} as const;

/** Default Open Graph share image (1200×630 JPEG). Overridden by Sanity `seo.ogImage`. */
export const defaultOgImage = {
  url: "/img/opengraph-image.jpg",
  width: 1200,
  height: 630,
} as const;

/** Resolve OG images: Sanity override when set, otherwise the site default. */
export function resolveOgImages(overrideSrc?: string | null) {
  return [overrideSrc ? { url: overrideSrc } : { ...defaultOgImage }];
}

type BuildOpenGraphOpts = {
  title: string;
  description: string;
  /** Path or absolute URL; resolved via metadataBase. Defaults to site root. */
  url?: string;
  type?: "website" | "article" | "profile";
  images?: ReturnType<typeof resolveOgImages>;
  siteName: string;
  publishedTime?: string;
};

/**
 * Full Open Graph object so page-level metadata never drops url / siteName / locale
 * when overriding the root layout’s openGraph.
 */
export function buildOpenGraph({
  title,
  description,
  url = "/",
  type = "website",
  images = resolveOgImages(),
  siteName,
  publishedTime,
}: BuildOpenGraphOpts): NonNullable<Metadata["openGraph"]> {
  return {
    title,
    description,
    url,
    siteName,
    locale: "pt_PT",
    type,
    images,
    ...(publishedTime ? { publishedTime } : {}),
  };
}

export type NavLink = { label: string; href: string };

/** Primary navigation (header). */
export const navLinks: NavLink[] = [
  { label: "Sobre", href: "/sobre" },
  { label: "Serviços", href: "/servicos" },
  { label: "Cursos", href: "/cursos" },
  { label: "Blog", href: "/blog" },
  { label: "Podcast", href: "/podcast" },
  { label: "Contactos", href: "/contactos" },
];

/** Legal / policy pages (footer + cookie banner). */
export const legalLinks: NavLink[] = [
  { label: "Política de Privacidade", href: "/privacidade" },
  { label: "Termos e Condições", href: "/termos" },
  { label: "Política de Cookies", href: "/cookies" },
];

/** Primary call to action, used across pages. */
export const primaryCta = { label: "Marcar conversa", href: "/contactos" } as const;

/** Site design / development credit (footer). */
export const siteCredit = {
  name: "André Rodrigo",
  href: "https://andrerodrigo.com",
} as const;
