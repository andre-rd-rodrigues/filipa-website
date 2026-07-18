import type { SchemaTypeDefinition } from "sanity";

// Reusable objects
import { figure } from "./objects/figure";
import { cta } from "./objects/cta";
import { faqItem } from "./objects/faqItem";
import { benefit } from "./objects/benefit";
import { processStep } from "./objects/processStep";
import { principle } from "./objects/principle";
import { credential } from "./objects/credential";
import { courseModule } from "./objects/courseModule";
import { courseEdition, courseSession } from "./objects/courseEdition";
import { audience } from "./objects/audience";
import { stat } from "./objects/stat";
import { socialLink } from "./objects/socialLink";
import { episodeLink } from "./objects/episodeLink";
import { highlightItem } from "./objects/highlightItem";
import { seo } from "./objects/seo";
import { richText, calloutQuote } from "./objects/richText";
import {
  legalBody,
  cookieRow,
  cookieTableBlock,
  cookieSettingsButtonBlock,
} from "./objects/legalBody";

// Documents — settings & collections
import { siteSettings } from "./documents/siteSettings";
import { category } from "./documents/category";
import { post } from "./documents/post";
import { service } from "./documents/service";
import { course } from "./documents/course";
import { episode } from "./documents/episode";
import { legalPage } from "./documents/legalPage";

// Documents — page singletons
import { homePage } from "./documents/homePage";
import { aboutPage } from "./documents/aboutPage";
import { servicesPage } from "./documents/servicesPage";
import { coursesPage } from "./documents/coursesPage";
import { blogPage } from "./documents/blogPage";
import { podcastPage } from "./documents/podcastPage";
import { contactPage } from "./documents/contactPage";

/** Content model registry. */
export const schemaTypes: SchemaTypeDefinition[] = [
  // Objects
  figure,
  cta,
  faqItem,
  benefit,
  processStep,
  principle,
  credential,
  courseModule,
  courseEdition,
  courseSession,
  audience,
  stat,
  socialLink,
  episodeLink,
  highlightItem,
  seo,
  richText,
  calloutQuote,
  legalBody,
  cookieRow,
  cookieTableBlock,
  cookieSettingsButtonBlock,
  // Settings & collections
  siteSettings,
  category,
  post,
  service,
  course,
  episode,
  legalPage,
  // Page singletons
  homePage,
  aboutPage,
  servicesPage,
  coursesPage,
  blogPage,
  podcastPage,
  contactPage,
];
