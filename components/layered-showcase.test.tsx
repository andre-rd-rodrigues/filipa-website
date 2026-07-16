import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { LayeredShowcase } from "@/components/layered-showcase";

// Reduced motion short-circuits the GSAP effect, keeping the render synchronous.
beforeEach(() => {
  window.matchMedia = ((query: string) =>
    ({
      matches: true,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(() => false),
    }) as unknown as MediaQueryList) as typeof window.matchMedia;
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("LayeredShowcase", () => {
  it("renders the eyebrow, title, paragraphs and images from props", () => {
    render(
      <LayeredShowcase
        eyebrow="Sobre"
        title="Treino mental"
        paragraphs={["Primeiro parágrafo.", "Segundo parágrafo."]}
        images={[
          { src: "/img/a.webp", alt: "Foto A" },
          { src: "/img/b.webp", alt: "Foto B" },
        ]}
      />,
    );

    expect(screen.getByText("Sobre")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Treino mental" })).toBeInTheDocument();
    expect(screen.getByText("Primeiro parágrafo.")).toBeInTheDocument();
    expect(screen.getByText("Segundo parágrafo.")).toBeInTheDocument();
    expect(screen.getByAltText("Foto A")).toBeInTheDocument();
    expect(screen.getByAltText("Foto B")).toBeInTheDocument();
  });

  it("renders an optional CTA link", () => {
    render(
      <LayeredShowcase
        eyebrow="Sobre"
        title="Título"
        paragraphs={["Texto."]}
        cta={{ label: "Saber mais", href: "/sobre" }}
        images={[
          { src: "/img/a.webp", alt: "Foto A" },
          { src: "/img/b.webp", alt: "Foto B" },
        ]}
      />,
    );
    expect(screen.getByRole("link", { name: "Saber mais" })).toHaveAttribute(
      "href",
      "/sobre",
    );
  });
});
