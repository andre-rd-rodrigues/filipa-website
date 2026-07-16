import { describe, expect, it } from "vitest";
import {
  getAllCourses,
  getCourseBySlug,
  getUpcomingSessions,
} from "@/lib/courses";

// Contract tests: assert the shape and invariants the pages rely on, never the
// specific mock content. These are exactly the guarantees a future Sanity
// mapping must preserve, so they double as the migration regression net.

describe("courses data layer", () => {
  it("returns a non-empty list where every course has the required fields", async () => {
    const courses = await getAllCourses();
    expect(courses.length).toBeGreaterThan(0);

    for (const course of courses) {
      expect(typeof course.slug).toBe("string");
      expect(course.slug.length).toBeGreaterThan(0);
      expect(typeof course.title).toBe("string");
      expect(typeof course.category).toBe("string");
      expect(typeof course.summary).toBe("string");
      expect(typeof course.audience).toBe("string");
      expect(Array.isArray(course.outcomes)).toBe(true);
      expect(Array.isArray(course.ctas)).toBe(true);
      for (const cta of course.ctas) {
        expect(typeof cta.label).toBe("string");
        expect(typeof cta.href).toBe("string");
        expect(["primary", "secondary"]).toContain(cta.variant);
      }
      expect(typeof course.image.src).toBe("string");
      expect(typeof course.image.alt).toBe("string");
    }
  });

  it("exposes unique slugs", async () => {
    const courses = await getAllCourses();
    const slugs = courses.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("finds a course by a known slug", async () => {
    const all = await getAllCourses();
    const target = all[0];
    const found = await getCourseBySlug(target.slug);
    expect(found).not.toBeNull();
    expect(found?.slug).toBe(target.slug);
  });

  it("returns null for an unknown slug", async () => {
    expect(await getCourseBySlug("__does-not-exist__")).toBeNull();
  });
});

describe("getUpcomingSessions", () => {
  it("returns only sessions from the start of today onward", async () => {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const sessions = await getUpcomingSessions();
    for (const item of sessions) {
      const date = new Date(`${item.session.date}T00:00:00`);
      expect(date.getTime()).toBeGreaterThanOrEqual(startOfToday.getTime());
    }
  });

  it("is sorted ascending by session date", async () => {
    const sessions = await getUpcomingSessions();
    for (let i = 1; i < sessions.length; i++) {
      expect(
        sessions[i - 1].session.date.localeCompare(sessions[i].session.date),
      ).toBeLessThanOrEqual(0);
    }
  });

  it("carries the course + edition context for each session", async () => {
    const sessions = await getUpcomingSessions();
    for (const item of sessions) {
      expect(typeof item.course.slug).toBe("string");
      expect(typeof item.course.title).toBe("string");
      expect(typeof item.course.category).toBe("string");
      expect(typeof item.course.image.src).toBe("string");
      expect(typeof item.edition.label).toBe("string");
      expect(Array.isArray(item.edition.sessions)).toBe(true);
      expect(typeof item.session.date).toBe("string");
    }
  });
});
