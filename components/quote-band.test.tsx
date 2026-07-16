import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { QuoteBand } from "@/components/quote-band";

describe("QuoteBand", () => {
  it("renders the quote, attribution name and optional title", () => {
    render(
      <QuoteBand
        eyebrow="Testemunho"
        quote="A mente treina-se como o corpo."
        name="Filipa Marques"
        title="Coaching & PNL"
      />,
    );

    // The spotlight effect renders the quote in several stacked copies.
    expect(
      screen.getAllByText(/A mente treina-se como o corpo\./).length,
    ).toBeGreaterThan(0);
    expect(screen.getByText("Testemunho")).toBeInTheDocument();
    expect(screen.getByText("Filipa Marques")).toBeInTheDocument();
    expect(screen.getByText("Coaching & PNL")).toBeInTheDocument();
  });

  it("renders without an eyebrow or title", () => {
    render(<QuoteBand quote="Foco." name="Alguém" />);
    expect(screen.getAllByText(/Foco\./).length).toBeGreaterThan(0);
    expect(screen.getByText("Alguém")).toBeInTheDocument();
  });
});
