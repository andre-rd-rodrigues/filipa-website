import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PageHero } from "@/components/page-hero";

describe("PageHero", () => {
  it("renders the title and a breadcrumb back to the site root", () => {
    render(<PageHero title="Sobre" />);

    expect(screen.getByRole("heading", { name: "Sobre" })).toBeInTheDocument();
    const home = screen.getByRole("link", { name: "Início" });
    expect(home).toHaveAttribute("href", "/");
  });

  it("uses an explicit breadcrumb label when provided", () => {
    render(<PageHero title="Artigo" breadcrumb="Blog" />);

    expect(screen.getByRole("heading", { name: "Artigo" })).toBeInTheDocument();
    const current = screen.getByText("Blog");
    expect(current).toHaveAttribute("aria-current", "page");
  });

  it("renders an optional logo image", () => {
    render(
      <PageHero
        title="Podcast"
        logo={{ src: "/img/podcast.webp", alt: "Capa do podcast" }}
      />,
    );
    expect(screen.getByAltText("Capa do podcast")).toBeInTheDocument();
  });
});
