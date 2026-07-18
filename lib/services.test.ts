import { describe, expect, it, vi } from "vitest";
import { makeService } from "@/test/fixtures";

const fixtureServices = [
  makeService({ slug: "servico-um", number: "01", title: "Serviço Um" }),
  makeService({ slug: "servico-dois", number: "02", title: "Serviço Dois" }),
];

vi.mock("@/sanity/lib/client", () => ({
  sanityFetch: vi.fn(
    async (query: string, params: Record<string, unknown> = {}) => {
      if (query.includes("slug.current == $slug")) {
        return fixtureServices.find((s) => s.slug === params.slug) ?? null;
      }
      return fixtureServices;
    },
  ),
}));

import { getAllServices, getServiceBySlug } from "@/lib/services";

describe("services data layer", () => {
  it("returns a non-empty list where every service has the required fields", async () => {
    const services = await getAllServices();
    expect(services.length).toBeGreaterThan(0);

    for (const service of services) {
      expect(typeof service.slug).toBe("string");
      expect(service.slug.length).toBeGreaterThan(0);
      expect(typeof service.number).toBe("string");
      expect(typeof service.title).toBe("string");
      expect(typeof service.summary).toBe("string");
      expect(typeof service.description).toBe("string");
      expect(typeof service.image.src).toBe("string");
      expect(typeof service.image.alt).toBe("string");
    }
  });

  it("exposes unique slugs", async () => {
    const services = await getAllServices();
    const slugs = services.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("finds a service by a known slug", async () => {
    const found = await getServiceBySlug("servico-um");
    expect(found).not.toBeNull();
    expect(found?.slug).toBe("servico-um");
  });

  it("returns null for an unknown slug", async () => {
    expect(await getServiceBySlug("__does-not-exist__")).toBeNull();
  });
});
