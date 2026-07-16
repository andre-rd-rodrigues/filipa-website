import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Section } from "@/components/section";
import { Container } from "@/components/container";
import { Eyebrow } from "@/components/eyebrow";
import { SiteLogo } from "@/components/site-logo";
import { LogoStrip } from "@/components/logo-strip";
import { MarqueeStrip } from "@/components/marquee-strip";
import { ScrollingHeadline } from "@/components/scrolling-headline";
import { EditorialImage } from "@/components/editorial-image";
import { InstagramStrip } from "@/components/instagram-strip";

// Prop-driven behaviour + smoke renders for the presentational layer. Kept
// light: these components carry no content, so we only guard the render path
// and the handful of props that change structure.

describe("Section", () => {
  it("renders children and applies the id", () => {
    const { container } = render(<Section id="destaques">Conteúdo</Section>);
    expect(screen.getByText("Conteúdo")).toBeInTheDocument();
    expect(container.querySelector("section#destaques")).not.toBeNull();
  });

  it("skips the container wrapper when container is false", () => {
    render(<Section container={false}>Sem container</Section>);
    expect(screen.getByText("Sem container")).toBeInTheDocument();
  });
});

describe("Container", () => {
  it("renders children with a custom element tag", () => {
    const { container } = render(
      <Container as="section">Dentro</Container>,
    );
    expect(screen.getByText("Dentro")).toBeInTheDocument();
    expect(container.querySelector("section")).not.toBeNull();
  });
});

describe("Eyebrow", () => {
  it("renders its label with the eyebrow class", () => {
    render(<Eyebrow>Kicker</Eyebrow>);
    const el = screen.getByText("Kicker");
    expect(el).toHaveClass("eyebrow");
  });
});

describe("SiteLogo", () => {
  it("uses the navbar monogram for the navbar variant", () => {
    const { container } = render(<SiteLogo variant="navbar" />);
    const img = container.querySelector("img");
    expect(img).not.toBeNull();
    expect(img?.getAttribute("src")).toContain("logo-icon-w");
  });

  it("uses the full lockup for the default variant", () => {
    const { container } = render(<SiteLogo />);
    expect(container.querySelector("img")?.getAttribute("src")).toContain(
      "logo-text-icon-orange",
    );
  });
});

describe("LogoStrip", () => {
  it("renders the trust band with club names", () => {
    render(<LogoStrip />);
    expect(screen.getByText("Clubes")).toBeInTheDocument();
    expect(screen.getByText("SL Benfica")).toBeInTheDocument();
  });
});

describe("MarqueeStrip", () => {
  it("exposes the phrase once as the region label", () => {
    render(<MarqueeStrip text="Mentalidade" />);
    expect(
      screen.getByRole("region", { name: "Mentalidade" }),
    ).toBeInTheDocument();
  });
});

describe("ScrollingHeadline", () => {
  it("renders as a labelled region with the given text", () => {
    render(<ScrollingHeadline text="Alto rendimento" eyebrow="Foco" />);
    expect(
      screen.getByRole("region", { name: "Alto rendimento" }),
    ).toBeInTheDocument();
  });
});

describe("EditorialImage", () => {
  it("renders the photo and an index ornament", () => {
    render(
      <EditorialImage
        src="/img/foto.webp"
        alt="Retrato editorial"
        ornament={["index", "corner-brackets"]}
        index="01"
      />,
    );
    expect(screen.getByAltText("Retrato editorial")).toBeInTheDocument();
    expect(screen.getByText("01")).toBeInTheDocument();
  });
});

describe("InstagramStrip", () => {
  it("renders one labelled profile link with the given handle", () => {
    render(
      <InstagramStrip
        images={[{ src: "/img/insta.webp", alt: "Post" }]}
        href="https://instagram.com/exemplo"
        handle="@exemplo"
      />,
    );
    const badge = screen.getByRole("link", { name: /Segue no Instagram @exemplo/ });
    expect(badge).toHaveAttribute("href", "https://instagram.com/exemplo");
  });
});
