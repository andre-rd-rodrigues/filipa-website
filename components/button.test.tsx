import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button, ButtonLink } from "@/components/button";

describe("Button", () => {
  it("renders its label as a button", () => {
    render(<Button>Marcar conversa</Button>);
    expect(
      screen.getByRole("button", { name: "Marcar conversa" }),
    ).toBeInTheDocument();
  });

  it("renders ButtonLink as an anchor with the given href", () => {
    render(<ButtonLink href="/contactos">Contacta</ButtonLink>);
    const link = screen.getByRole("link", { name: "Contacta" });
    expect(link).toHaveAttribute("href", "/contactos");
  });
});
