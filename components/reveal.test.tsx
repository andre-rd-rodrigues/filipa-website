import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Reveal } from "@/components/reveal";

describe("Reveal", () => {
  it("renders its children (content is visible without motion)", () => {
    render(
      <Reveal>
        <p>Conteúdo revelado</p>
      </Reveal>,
    );
    expect(screen.getByText("Conteúdo revelado")).toBeInTheDocument();
  });

  it("honors the polymorphic `as` prop", () => {
    render(
      <Reveal as="section">
        <span>secção</span>
      </Reveal>,
    );
    expect(screen.getByText("secção").closest("section")).not.toBeNull();
  });
});
