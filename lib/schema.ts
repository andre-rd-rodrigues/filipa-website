/**
 * JSON-LD Schema.org builders.
 *
 * Exports functions that return plain objects suitable for JSON-LD serialization.
 * All data sourced from lib/site.ts — no mock/unverified claims encoded.
 */

import { site, contact, socials } from "@/lib/site";
import type { Course } from "@/lib/courses";

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
