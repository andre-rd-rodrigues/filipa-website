import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SiteFooter } from "@/components/site-footer";
import { contact, legalLinks, navLinks } from "@/lib/site";

describe("SiteFooter", () => {
  it("renders navigation and legal links plus contact info", () => {
    render(<SiteFooter />);

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
    expect(screen.getByText(contact.phone)).toBeInTheDocument();
    expect(screen.getByText(contact.email)).toBeInTheDocument();
  });
});
