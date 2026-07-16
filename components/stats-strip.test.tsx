import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatsStrip } from "@/components/stats-strip";
import { makeStat } from "@/test/fixtures";

/** Force `prefers-reduced-motion: reduce` so the count-up is skipped and the
 *  final value is rendered synchronously (the SSR / no-JS path). */
function stubReducedMotion(matches: boolean) {
  window.matchMedia = ((query: string) =>
    ({
      matches,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(() => false),
    }) as unknown as MediaQueryList) as typeof window.matchMedia;
}

describe("StatsStrip", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders each stat's label, description and CTA", () => {
    const items = [
      makeStat({ label: "Atletas", cta: { label: "Sobre", href: "/sobre" } }),
      makeStat({
        label: "Anos",
        description: "Experiência.",
        cta: { label: "Serviços", href: "/servicos" },
      }),
    ];
    render(<StatsStrip items={items} />);

    for (const item of items) {
      expect(screen.getByText(item.label)).toBeInTheDocument();
      expect(screen.getByText(item.description)).toBeInTheDocument();
      const cta = screen.getByRole("link", { name: new RegExp(item.cta.label) });
      expect(cta).toHaveAttribute("href", item.cta.href);
    }
  });

  it("shows the final value with its suffix under reduced motion", () => {
    stubReducedMotion(true);
    render(<StatsStrip items={[makeStat({ value: 250, suffix: "+", label: "X" })]} />);
    expect(screen.getByText("250+")).toBeInTheDocument();
  });
});
