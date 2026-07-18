/**
 * JSON-LD Schema.org builders.
 *
 * Pure functions returning plain objects for JSON-LD serialization. Identity
 * data comes from Sanity site settings (passed in); URLs use the deployment
 * config in lib/site.ts.
 */

import { siteConfig } from "@/lib/site";
import type { SiteSettings } from "@/lib/settings";
import type { Course } from "@/lib/courses";
import type { Service } from "@/lib/services";
import type { BlogPost, FaqItem } from "@/lib/blog";

export interface JsonLdData {
  "@context": string;
  "@type": string;
  [key: string]: unknown;
}

/** Organization schema for the site owner. Used sitewide. */
export function buildOrganizationSchema(settings: SiteSettings): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.fullName,
    url: siteConfig.url,
    email: settings.contact.email,
    telephone: settings.contact.phone,
    sameAs: settings.socials.map((s) => s.href),
  };
}

/** WebSite schema for the site itself. */
export function buildWebSiteSchema(settings: SiteSettings): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: settings.fullName,
    url: siteConfig.url,
    inLanguage: "pt-PT",
  };
}

/** Course schema for a single course (course detail page). */
export function buildCourseSchema(
  course: Course,
  settings: SiteSettings,
): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.summary,
    url: `${siteConfig.url}/cursos/${course.slug}`,
    inLanguage: "pt-PT",
    provider: {
      "@type": "Organization",
      name: settings.fullName,
      url: siteConfig.url,
    },
  };
}

/** Service schema for a single service (service detail page). */
export function buildServiceSchema(
  service: Service,
  settings: SiteSettings,
): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary,
    url: `${siteConfig.url}/servicos/${service.slug}`,
    serviceType: service.title,
    areaServed: "Portugal",
    provider: {
      "@type": "Organization",
      name: settings.fullName,
      url: siteConfig.url,
    },
  };
}

/** BlogPosting schema for a single blog article (blog detail page). */
export function buildBlogPostingSchema(
  post: BlogPost,
  settings: SiteSettings,
): JsonLdData {
  const url = `${siteConfig.url}/blog/${post.slug}`;
  const image = post.coverImage.src.startsWith("http")
    ? post.coverImage.src
    : `${siteConfig.url}${post.coverImage.src}`;

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
      url: `${siteConfig.url}/sobre`,
    },
    publisher: {
      "@type": "Organization",
      name: settings.fullName,
      url: siteConfig.url,
    },
  };
}

/** FAQPage schema for an article's FAQ block. */
export function buildFaqSchema(faq: FaqItem[]): JsonLdData {
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

/** Person schema for Filipa Marques (about page). */
export function buildPersonSchema(settings: SiteSettings): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: settings.name,
    jobTitle: settings.tagline,
    url: `${siteConfig.url}/sobre`,
    image: `${siteConfig.url}/img/profile-1.jpg`,
    sameAs: settings.socials.map((s) => s.href),
    worksFor: {
      "@type": "Organization",
      name: settings.fullName,
    },
    areaServed: "Portugal",
  };
}
