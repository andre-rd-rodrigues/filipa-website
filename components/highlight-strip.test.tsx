import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { HighlightStrip } from "@/components/highlight-strip";
import { makeHighlightItem } from "@/test/fixtures";

describe("HighlightStrip", () => {
  it("renders one link per item with its href, label and body", () => {
    const items = [
      makeHighlightItem({ label: "Serviços", href: "/servicos" }),
      makeHighlightItem({ label: "Cursos", href: "/cursos", body: "Formações." }),
    ];
    render(<HighlightStrip items={items} />);

    for (const item of items) {
      const link = screen.getByRole("link", { name: new RegExp(item.label) });
      expect(link).toHaveAttribute("href", item.href);
      expect(screen.getByText(item.body)).toBeInTheDocument();
    }
  });

  it("renders nothing but the grid when given no items", () => {
    render(<HighlightStrip items={[]} />);
    expect(screen.queryAllByRole("link")).toHaveLength(0);
  });
});
