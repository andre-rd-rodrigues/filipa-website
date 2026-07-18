import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SiteFooter } from "@/components/site-footer";
import { legalLinks, navLinks } from "@/lib/site";
import { makeSiteSettings } from "@/test/fixtures";

describe("SiteFooter", () => {
  it("renders navigation and legal links plus contact info", () => {
    const settings = makeSiteSettings();
    render(<SiteFooter settings={settings} />);

    for (const link of navLinks) {
      expect(
        screen.getAllByRole("link", { name: link.label }).length,
      ).toBeGreaterThan(0);
    }
    for (const link of legalLinks) {
      expect(
        screen.getAllByRole("link", { name: link.label }).length,
      ).toBeGreaterThan(0);
    }
    expect(screen.getByText(settings.contact.phone)).toBeInTheDocument();
    expect(screen.getByText(settings.contact.email)).toBeInTheDocument();
  });
});
