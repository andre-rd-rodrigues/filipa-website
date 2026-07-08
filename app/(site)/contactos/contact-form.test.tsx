import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "@/app/(site)/contactos/contact-form";

describe("ContactForm", () => {
  it("renders the core fields", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Mensagem")).toBeInTheDocument();
  });

  it("shows validation errors when submitted empty", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(
      screen.getByRole("button", { name: "Enviar mensagem" }),
    );

    expect(screen.getByText("Diz-me como te chamas.")).toBeInTheDocument();
    expect(
      screen.getByText("Preciso do teu email para responder."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Conta-me um pouco sobre o que precisas."),
    ).toBeInTheDocument();
  });
});
