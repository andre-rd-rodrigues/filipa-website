import { describe, expect, it, vi } from "vitest";
import { makeCourse } from "@/test/fixtures";

const fixtureCourses = [
  makeCourse({
    slug: "curso-um",
    title: "Curso Um",
    editions: [
      {
        label: "Passada",
        format: "Online (Zoom)",
        sessions: [{ date: "2020-01-01", start: "19:00", end: "21:00" }],
      },
      {
        label: "Futura",
        format: "Online (Zoom)",
        sessions: [
          { date: "2999-10-09", start: "19:00", end: "21:00" },
          { date: "2999-10-07", start: "19:00", end: "21:00" },
        ],
      },
    ],
  }),
  makeCourse({ slug: "curso-dois", title: "Curso Dois" }),
];

vi.mock("@/sanity/lib/client", () => ({
  sanityFetch: vi.fn(
    async (query: string, params: Record<string, unknown> = {}) => {
      if (query.includes("slug.current == $slug")) {
        return fixtureCourses.find((c) => c.slug === params.slug) ?? null;
      }
      return fixtureCourses;
    },
  ),
}));

import {
  getAllCourses,
  getCourseBySlug,
  getUpcomingSessions,
} from "@/lib/courses";

describe("courses data layer", () => {
  it("returns a non-empty list where every course has the required fields", async () => {
    const courses = await getAllCourses();
    expect(courses.length).toBeGreaterThan(0);

    for (const course of courses) {
      expect(typeof course.slug).toBe("string");
      expect(typeof course.title).toBe("string");
      expect(typeof course.category).toBe("string");
      expect(typeof course.summary).toBe("string");
      expect(typeof course.audience).toBe("string");
      expect(Array.isArray(course.outcomes)).toBe(true);
      expect(Array.isArray(course.ctas)).toBe(true);
      expect(typeof course.image.src).toBe("string");
      expect(typeof course.image.alt).toBe("string");
    }
  });

  it("finds a course by a known slug", async () => {
    const found = await getCourseBySlug("curso-um");
    expect(found).not.toBeNull();
    expect(found?.slug).toBe("curso-um");
  });

  it("returns null for an unknown slug", async () => {
    expect(await getCourseBySlug("__does-not-exist__")).toBeNull();
  });
});

describe("getUpcomingSessions", () => {
  it("returns only sessions from the start of today onward, sorted ascending", async () => {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const sessions = await getUpcomingSessions();
    expect(sessions.length).toBeGreaterThan(0);

    for (let i = 0; i < sessions.length; i++) {
      const date = new Date(`${sessions[i].session.date}T00:00:00`);
      expect(date.getTime()).toBeGreaterThanOrEqual(startOfToday.getTime());
      if (i > 0) {
        expect(
          sessions[i - 1].session.date.localeCompare(sessions[i].session.date),
        ).toBeLessThanOrEqual(0);
      }
    }
  });

  it("carries the course + edition context for each session", async () => {
    const sessions = await getUpcomingSessions();
    for (const item of sessions) {
      expect(typeof item.course.slug).toBe("string");
      expect(typeof item.course.title).toBe("string");
      expect(typeof item.edition.label).toBe("string");
      expect(typeof item.session.date).toBe("string");
    }
  });
});
