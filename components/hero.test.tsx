import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/hero";

describe("Hero", () => {
  it("renders the name heading and both CTAs", () => {
    render(<Hero />);

    expect(
      screen.getByRole("heading", { level: 1, name: /Filipa Marques/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Marcar conversa" }),
    ).toHaveAttribute("href", "/contactos");
    expect(
      screen.getByRole("link", { name: "Conhecer serviços" }),
    ).toHaveAttribute("href", "/servicos");
  });
});
