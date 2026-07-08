import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { FaqAccordion, type FaqItem } from "@/components/faq-accordion";

const items: FaqItem[] = [
  { question: "Como funciona o coaching?", answer: "Sessões one-to-one." },
  { question: "Onde decorrem as sessões?", answer: "Presencial e online." },
];

describe("FaqAccordion", () => {
  it("renders every question", () => {
    render(<FaqAccordion items={items} />);
    for (const item of items) {
      expect(screen.getByText(item.question)).toBeInTheDocument();
    }
  });

  it("opens the first item by default", () => {
    const { container } = render(<FaqAccordion items={items} />);
    const details = container.querySelectorAll("details");
    expect(details[0]).toHaveAttribute("open");
    expect(details[1]).not.toHaveAttribute("open");
  });
});
