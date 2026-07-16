import { describe, expect, it } from "vitest";
import { getAllServices, getServiceBySlug } from "@/lib/services";

// Contract tests: assert the shape and invariants pages rely on, not the
// specific mock content, so they hold once content moves to Sanity.

describe("services data layer", () => {
  it("returns a non-empty list where every service has the required fields", async () => {
    const services = await getAllServices();
    expect(services.length).toBeGreaterThan(0);

    for (const service of services) {
      expect(typeof service.slug).toBe("string");
      expect(service.slug.length).toBeGreaterThan(0);
      expect(typeof service.number).toBe("string");
      expect(service.number.length).toBeGreaterThan(0);
      expect(typeof service.title).toBe("string");
      expect(typeof service.summary).toBe("string");
      expect(typeof service.description).toBe("string");
      expect(typeof service.image.src).toBe("string");
      expect(typeof service.image.alt).toBe("string");

      // Optional CTAs, when present, must be well-formed.
      for (const cta of service.ctas ?? []) {
        expect(typeof cta.label).toBe("string");
        expect(typeof cta.href).toBe("string");
        expect(["primary", "secondary"]).toContain(cta.variant);
      }
    }
  });

  it("exposes unique slugs", async () => {
    const services = await getAllServices();
    const slugs = services.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("finds a service by a known slug", async () => {
    const all = await getAllServices();
    const target = all[0];
    const found = await getServiceBySlug(target.slug);
    expect(found).not.toBeNull();
    expect(found?.slug).toBe(target.slug);
  });

  it("returns null for an unknown slug", async () => {
    expect(await getServiceBySlug("__does-not-exist__")).toBeNull();
  });
});
