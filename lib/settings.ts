import { cache } from "react";
import { sanityFetch } from "@/sanity/lib/client";
import { siteConfig } from "@/lib/site";

export type SiteSettings = {
  name: string;
  tagline: string;
  fullName: string;
  description: string;
  url: string;
  locale: string;
  quote: string;
  contact: {
    phone: string;
    phoneHref: string;
    email: string;
    emailHref: string;
    location: string;
  };
  socials: { label: string; handle: string; href: string }[];
  quotes: { home: string; servicos: string; sobre: string };
};

type RawSettings = {
  name: string;
  tagline: string;
  fullName: string;
  description: string;
  quote: string;
  phone: string;
  email: string;
  location: string;
  socials?: { label: string; handle: string; href: string }[];
  quoteHome?: string;
  quoteServicos?: string;
  quoteSobre?: string;
};

const query = `*[_type == "siteSettings"][0]{
  name, tagline, fullName, description, quote,
  phone, email, location,
  socials[]{ label, handle, href },
  quoteHome, quoteServicos, quoteSobre
}`;

/**
 * Global site settings from Sanity. Memoized per request so the header, footer,
 * metadata and JSON-LD share a single fetch.
 */
export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const data = await sanityFetch<RawSettings | null>(query);
  if (!data) {
    throw new Error(
      'Missing "Definições do site" document in Sanity. Run the content migration.',
    );
  }

  const telHref = `tel:${data.phone.replace(/\s+/g, "")}`;
  const mailHref = `mailto:${data.email}`;

  return {
    name: data.name,
    tagline: data.tagline,
    fullName: data.fullName,
    description: data.description,
    url: siteConfig.url,
    locale: siteConfig.locale,
    quote: data.quote,
    contact: {
      phone: data.phone,
      phoneHref: telHref,
      email: data.email,
      emailHref: mailHref,
      location: data.location,
    },
    socials: data.socials ?? [],
    quotes: {
      home: data.quoteHome ?? "",
      servicos: data.quoteServicos ?? "",
      sobre: data.quoteSobre ?? "",
    },
  };
});
