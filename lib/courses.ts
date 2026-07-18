/**
 * Courses data layer — backed by Sanity. The public surface is a set of async
 * functions returning plain data, so page components stay unchanged.
 */
import { sanityFetch } from "@/sanity/lib/client";

/** A programme module: a titled group of syllabus items. */
export type CourseModule = { title: string; items: string[] };

/** A single scheduled session within a course edition. */
export type CourseSession = {
  /** ISO date, `yyyy-mm-dd`. */
  date: string;
  /** Start time, `HH:mm` (24h). */
  start?: string;
  /** End time, `HH:mm` (24h). */
  end?: string;
};

/** A course edition/intake — a run of the course with its own dates. */
export type CourseEdition = {
  label: string;
  format?: string;
  sessions: CourseSession[];
};

export type Course = {
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  summary: string;
  audience: string;
  duration?: string;
  schedule?: string;
  format?: string;
  includes?: string[];
  intro?: string[];
  objectives?: string[];
  program?: CourseModule[];
  outcomes: string[];
  ctas: { label: string; href: string; variant: "primary" | "secondary" }[];
  image: { src: string; alt: string };
  editions?: CourseEdition[];
};

const FIELDS = `
  "slug": slug.current,
  title,
  subtitle,
  category,
  summary,
  audience,
  duration,
  schedule,
  format,
  includes,
  intro,
  objectives,
  program[]{ title, items },
  outcomes,
  ctas[]{ label, href, variant },
  "image": { "src": image.asset->url, "alt": image.alt },
  editions[]{ label, format, sessions[]{ date, start, end } }
`;

/** All courses, in editorial order. */
export async function getAllCourses(): Promise<Course[]> {
  return sanityFetch<Course[]>(
    `*[_type == "course"] | order(orderRank asc){${FIELDS}}`,
  );
}

/** A single course by slug, or null if not found. */
export async function getCourseBySlug(slug: string): Promise<Course | null> {
  return sanityFetch<Course | null>(
    `*[_type == "course" && slug.current == $slug][0]{${FIELDS}}`,
    { slug },
  );
}

/** A single upcoming session, flattened with its course and edition context. */
export type UpcomingSession = {
  course: Pick<Course, "slug" | "title" | "category" | "image">;
  edition: CourseEdition;
  session: CourseSession;
};

/**
 * All future course sessions, flattened and sorted ascending by date.
 * "Future" is relative to the start of today (so today's sessions still show).
 */
export async function getUpcomingSessions(): Promise<UpcomingSession[]> {
  const courses = await getAllCourses();

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const upcoming: UpcomingSession[] = [];
  for (const course of courses) {
    for (const edition of course.editions ?? []) {
      for (const session of edition.sessions ?? []) {
        if (new Date(`${session.date}T00:00:00`) >= startOfToday) {
          upcoming.push({
            course: {
              slug: course.slug,
              title: course.title,
              category: course.category,
              image: course.image,
            },
            edition,
            session,
          });
        }
      }
    }
  }

  upcoming.sort((a, b) => a.session.date.localeCompare(b.session.date));
  return upcoming;
}
