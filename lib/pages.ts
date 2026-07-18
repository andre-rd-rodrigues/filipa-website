/**
 * Page singletons data layer — backed by Sanity. Each function returns the
 * editable copy for one page; repeatable content (services, courses, posts,
 * episodes) lives in its own data layer.
 */
import { cache } from "react";
import { sanityFetch } from "@/sanity/lib/client";

export type Cta = { label: string; href: string; variant: "primary" | "secondary" };
export type Img = { src: string; alt: string };
export type SeoMeta = { metaTitle?: string; metaDescription?: string; ogImage?: Img };

const IMG = (name: string, field = name) =>
  `"${name}": ${field}{ "src": asset->url, "alt": alt }`;
const CTA = `{ label, href, variant }`;
const SEO = `"seo": seo{ metaTitle, metaDescription, ${IMG("ogImage")} }`;

// ---------------------------------------------------------------------------

export type HomePage = {
  heroBackdropWord?: string;
  heroEyebrow?: string[];
  heroCtas?: Cta[];
  methodEyebrow?: string;
  methodTitle?: string;
  methodParagraphs?: string[];
  methodCta?: Cta;
  methodImages?: Img[];
  servicesEyebrow?: string;
  servicesTitle?: string;
  highlights?: { label: string; body: string; href: string; image: Img }[];
  marqueeText?: string;
  stats?: {
    value: number;
    suffix?: string;
    label: string;
    description: string;
    cta: { label: string; href: string };
  }[];
  podcastEyebrow?: string;
  podcastTitle?: string;
  quoteEyebrow?: string;
  blogEyebrow?: string;
  blogTitle?: string;
  instagramImages?: Img[];
  seo?: SeoMeta;
};

export const getHomePage = cache(async (): Promise<HomePage> => {
  return (
    (await sanityFetch<HomePage | null>(`*[_type == "homePage"][0]{
      heroBackdropWord, heroEyebrow, heroCtas[]${CTA},
      methodEyebrow, methodTitle, methodParagraphs, methodCta${CTA},
      "methodImages": methodImages[]{ "src": asset->url, "alt": alt },
      servicesEyebrow, servicesTitle,
      highlights[]{ label, body, href, ${IMG("image")} },
      marqueeText,
      stats[]{ value, suffix, label, description, "cta": cta{ label, href } },
      podcastEyebrow, podcastTitle,
      quoteEyebrow,
      blogEyebrow, blogTitle,
      "instagramImages": instagramImages[]{ "src": asset->url, "alt": alt },
      ${SEO}
    }`)) ?? {}
  );
});

// ---------------------------------------------------------------------------

export type AboutPage = {
  heroTitle?: string;
  portrait?: Img;
  portraitCaption?: string;
  bioTitle?: string;
  bioParagraphs?: string[];
  valuesEyebrow?: string;
  valuesTitle?: string;
  values?: { title: string; body: string }[];
  credentialsEyebrow?: string;
  credentialsTitle?: string;
  credentialsIntro?: string;
  credentialsImage?: Img;
  credentials?: {
    title: string;
    detail: string;
    type: "licenciatura" | "pos-graduacao" | "certificacao";
  }[];
  ctaImage?: Img;
  ctaTitle?: string;
  ctaBody?: string;
  ctas?: Cta[];
  seo?: SeoMeta;
};

export const getAboutPage = cache(async (): Promise<AboutPage> => {
  return (
    (await sanityFetch<AboutPage | null>(`*[_type == "aboutPage"][0]{
      heroTitle, ${IMG("portrait")}, portraitCaption, bioTitle, bioParagraphs,
      valuesEyebrow, valuesTitle, values[]{ title, body },
      credentialsEyebrow, credentialsTitle, credentialsIntro, ${IMG("credentialsImage")},
      credentials[]{ title, detail, type },
      ${IMG("ctaImage")}, ctaTitle, ctaBody, ctas[]${CTA},
      ${SEO}
    }`)) ?? {}
  );
});

// ---------------------------------------------------------------------------

export type ServicesPage = {
  heroTitle?: string;
  introEyebrow?: string;
  introTitle?: string;
  introBody?: string;
  introImage?: Img;
  audiencesEyebrow?: string;
  audiencesTitle?: string;
  audiencesImage?: Img;
  audiences?: { title: string; description: string }[];
  quoteEyebrow?: string;
  ctaImage?: Img;
  ctaTitle?: string;
  ctaBody?: string;
  ctas?: Cta[];
  seo?: SeoMeta;
};

export const getServicesPage = cache(async (): Promise<ServicesPage> => {
  return (
    (await sanityFetch<ServicesPage | null>(`*[_type == "servicesPage"][0]{
      heroTitle, introEyebrow, introTitle, introBody, ${IMG("introImage")},
      audiencesEyebrow, audiencesTitle, ${IMG("audiencesImage")},
      audiences[]{ title, description },
      quoteEyebrow, ${IMG("ctaImage")}, ctaTitle, ctaBody, ctas[]${CTA},
      ${SEO}
    }`)) ?? {}
  );
});

// ---------------------------------------------------------------------------

export type CoursesPage = {
  heroTitle?: string;
  datesEyebrow?: string;
  listEyebrow?: string;
  howEyebrow?: string;
  howTitle?: string;
  howItWorks?: { title: string; body: string }[];
  faqTitle?: string;
  faqs?: { question: string; answer: string }[];
  ctaTitle?: string;
  ctaBody?: string;
  ctas?: Cta[];
  seo?: SeoMeta;
};

export const getCoursesPage = cache(async (): Promise<CoursesPage> => {
  return (
    (await sanityFetch<CoursesPage | null>(`*[_type == "coursesPage"][0]{
      heroTitle, datesEyebrow, listEyebrow,
      howEyebrow, howTitle, howItWorks[]{ title, body },
      faqTitle, faqs[]{ question, answer },
      ctaTitle, ctaBody, ctas[]${CTA},
      ${SEO}
    }`)) ?? {}
  );
});

// ---------------------------------------------------------------------------

export type BlogPageContent = {
  heroTitle?: string;
  emptyState?: string;
  ctaTitle?: string;
  ctaBody?: string;
  ctas?: Cta[];
  seo?: SeoMeta;
};

export const getBlogPage = cache(async (): Promise<BlogPageContent> => {
  return (
    (await sanityFetch<BlogPageContent | null>(`*[_type == "blogPage"][0]{
      heroTitle, emptyState, ctaTitle, ctaBody, ctas[]${CTA}, ${SEO}
    }`)) ?? {}
  );
});

// ---------------------------------------------------------------------------

export type PodcastPage = {
  heroTitle?: string;
  heroLogo?: Img;
  featuredEyebrow?: string;
  listEyebrow?: string;
  listTitle?: string;
  listCta?: Cta;
  subscribeEyebrow?: string;
  subscribeTitle?: string;
  subscribeBody?: string;
  platforms?: { platform: string; href: string }[];
  seo?: SeoMeta;
};

export const getPodcastPage = cache(async (): Promise<PodcastPage> => {
  return (
    (await sanityFetch<PodcastPage | null>(`*[_type == "podcastPage"][0]{
      heroTitle, ${IMG("heroLogo")}, featuredEyebrow,
      listEyebrow, listTitle, listCta${CTA},
      subscribeEyebrow, subscribeTitle, subscribeBody,
      platforms[]{ platform, href },
      ${SEO}
    }`)) ?? {}
  );
});

// ---------------------------------------------------------------------------

export type ContactPage = {
  heroTitle?: string;
  formEyebrow?: string;
  formTitle?: string;
  formBody?: string;
  directImage?: Img;
  directTitle?: string;
  directNote?: string;
  socialTitle?: string;
  faqEyebrow?: string;
  faqTitle?: string;
  faqBody?: string;
  faqCtaLabel?: string;
  faqs?: { question: string; answer: string }[];
  seo?: SeoMeta;
};

export const getContactPage = cache(async (): Promise<ContactPage> => {
  return (
    (await sanityFetch<ContactPage | null>(`*[_type == "contactPage"][0]{
      heroTitle, formEyebrow, formTitle, formBody,
      ${IMG("directImage")}, directTitle, directNote, socialTitle,
      faqEyebrow, faqTitle, faqBody, faqCtaLabel, faqs[]{ question, answer },
      ${SEO}
    }`)) ?? {}
  );
});
