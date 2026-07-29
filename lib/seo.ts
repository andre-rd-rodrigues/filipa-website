import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/settings";
import { resolveOgImages, siteConfig } from "@/lib/site";

type PageMetaInput = {
  title?: string;
  absoluteTitle?: string;
  description: string;
  path: string;
  ogTitle?: string;
  ogImageSrc?: string | null;
  ogImageAlt?: string;
  ogType?: "website" | "article" | "profile";
  publishedTime?: string;
  keywords?: string[];
};

export async function pageMetadata(input: PageMetaInput): Promise<Metadata> {
  const site = await getSiteSettings();
  const ogTitle =
    input.ogTitle ?? input.title ?? `${site.name} | ${site.tagline}`;
  const url = new URL(input.path, siteConfig.url).toString();
  const images = resolveOgImages(input.ogImageSrc, input.ogImageAlt);

  return {
    ...(input.absoluteTitle
      ? { title: { absolute: input.absoluteTitle } }
      : input.title
        ? { title: input.title }
        : {}),
    description: input.description,
    ...(input.keywords ? { keywords: input.keywords } : {}),
    alternates: { canonical: input.path },
    openGraph: {
      title: ogTitle,
      description: input.description,
      url,
      siteName: site.fullName,
      locale: "pt_PT",
      type: input.ogType ?? "website",
      ...(input.publishedTime ? { publishedTime: input.publishedTime } : {}),
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: input.description,
      images,
    },
  };
}
