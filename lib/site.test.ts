import { describe, expect, it } from "vitest";
import { legalLinks, navLinks, primaryCta } from "@/lib/site";

describe("site configuration", () => {
  it("exposes non-empty primary navigation with valid entries", () => {
    expect(navLinks.length).toBeGreaterThan(0);
    for (const link of navLinks) {
      expect(link.label).toBeTruthy();
      expect(link.href).toMatch(/^\//);
    }
  });

  it("exposes non-empty legal links with valid entries", () => {
    expect(legalLinks.length).toBeGreaterThan(0);
    for (const link of legalLinks) {
      expect(link.label).toBeTruthy();
      expect(link.href).toMatch(/^\//);
    }
  });

  it("defines a primary call to action", () => {
    expect(primaryCta.label).toBeTruthy();
    expect(primaryCta.href).toMatch(/^\//);
  });
});
