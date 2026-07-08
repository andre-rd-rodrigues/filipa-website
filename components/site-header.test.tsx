import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// SiteHeader reads usePathname; provide a stable value outside the app router.
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

import { SiteHeader } from "@/components/site-header";
import { navLinks } from "@/lib/site";

describe("SiteHeader", () => {
  it("renders every primary navigation link", () => {
    render(<SiteHeader />);
    for (const link of navLinks) {
      expect(
        screen.getAllByRole("link", { name: link.label }).length,
      ).toBeGreaterThan(0);
    }
  });
});
