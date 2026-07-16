/**
 * JSON-LD Schema.org builders.
 *
 * Exports functions that return plain objects suitable for JSON-LD serialization.
 * All data sourced from lib/site.ts — no mock/unverified claims encoded.
 */

import { site, contact, socials } from "@/lib/site";
import type { Course } from "@/lib/courses";
import type { Service } from "@/lib/services";
import type { BlogPost } from "@/lib/blog";

export interface JsonLdData {
  "@context": string;
  "@type": string;
  [key: string]: unknown;
}

/**
 * Organization schema for the site owner.
 * Used sitewide; represents the business entity.
 */
export function buildOrganizationSchema(): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.fullName,
    url: site.url,
    email: contact.email,
    telephone: contact.phone,
    sameAs: socials.map((s) => s.href),
  };
}

/**
 * WebSite schema for the site itself.
 * Marks the overall site identity and language.
 */
export function buildWebSiteSchema(): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.fullName,
    url: site.url,
    inLanguage: "pt-PT",
  };
}

/**
 * Person schema for Filipa Marques (about page).
 *
 * NOTE: Does NOT include credential-specific fields (alumniOf, hasCredential, award).
 * The credentials in app/(site)/sobre/data.ts are MOCK/REPRESENTATIVE — not verified.
 * Until real credentials are confirmed, we only encode:
 * - name, title (jobTitle), URL, image, social profiles, work affiliation, service area.
 * - Credential-specific schema fields MUST be added in a follow-up once real credentials exist.
 */
/**
 * Course schema for a single course (course detail page).
 * Provider is the site owner Organization. No price/date encoded until the
 * real enrolment details are confirmed.
 */
export function buildCourseSchema(course: Course): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.summary,
    url: `${site.url}/cursos/${course.slug}`,
    inLanguage: "pt-PT",
    provider: {
      "@type": "Organization",
      name: site.fullName,
      url: site.url,
    },
  };
}

/**
 * Service schema for a single service (service detail page).
 * Provider is the site owner Organization. No price encoded until real
 * pricing is confirmed.
 */
export function buildServiceSchema(service: Service): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary,
    url: `${site.url}/servicos/${service.slug}`,
    serviceType: service.title,
    areaServed: "Portugal",
    provider: {
      "@type": "Organization",
      name: site.fullName,
      url: site.url,
    },
  };
}

/**
 * BlogPosting schema for a single blog article (blog detail page).
 * Improves eligibility for rich results and clarifies authorship/dates to
 * search engines. Image is resolved to an absolute URL.
 */
export function buildBlogPostingSchema(post: BlogPost): JsonLdData {
  const url = `${site.url}/blog/${post.slug}`;
  const image = post.coverImage.src.startsWith("http")
    ? post.coverImage.src
    : `${site.url}${post.coverImage.src}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    inLanguage: "pt-PT",
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    image: [image],
    articleSection: post.category,
    ...(post.keywords?.length ? { keywords: post.keywords.join(", ") } : {}),
    author: {
      "@type": "Person",
      name: post.author,
      url: `${site.url}/sobre`,
    },
    publisher: {
      "@type": "Organization",
      name: site.fullName,
      url: site.url,
    },
  };
}

/**
 * FAQPage schema for an article's FAQ block.
 * Emitted only when the post has FAQ items; powers FAQ rich results.
 */
export function buildFaqSchema(
  faq: NonNullable<BlogPost["faq"]>,
): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildPersonSchema(): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.tagline, // "Coaching & PNL"
    url: `${site.url}/sobre`,
    image: `${site.url}/img/profile-1.jpg`,
    sameAs: socials.map((s) => s.href),
    worksFor: {
      "@type": "Organization",
      name: site.fullName,
    },
    areaServed: "Portugal",
  };
}
