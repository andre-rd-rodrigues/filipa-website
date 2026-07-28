import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "@/app/(site)/contactos/contact-form";

async function fillRequiredFields() {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText("Nome"), "Ana Silva");
  await user.type(screen.getByLabelText("Email"), "ana@example.com");
  await user.type(screen.getByLabelText("Mensagem"), "Quero saber mais.");
  await user.click(screen.getByRole("checkbox"));
  return user;
}

describe("ContactForm", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_FORMSPREE_ID", "contact-form");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

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

  it("shows a distinct validation error for an incomplete email", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText("Nome"), "Ana Silva");
    await user.type(screen.getByLabelText("Email"), "ana.example.com");
    await user.type(screen.getByLabelText("Mensagem"), "Quero saber mais.");
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: "Enviar mensagem" }));

    expect(
      screen.getByText("Verifica o email, parece estar incompleto."),
    ).toBeInTheDocument();
  });

  it("posts the selected subject and entered fields to Formspree", async () => {
    const user = userEvent.setup();
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response(null, { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    render(<ContactForm />);

    await user.type(screen.getByLabelText("Telefone (opcional)"), "912345678");
    await user.selectOptions(
      screen.getByLabelText("Assunto"),
      "Palestra / formação",
    );
    await fillRequiredFields();
    await user.click(screen.getByRole("button", { name: "Enviar mensagem" }));

    expect(fetchMock).toHaveBeenCalledWith(
      "https://formspree.io/f/contact-form",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: "Ana Silva",
          email: "ana@example.com",
          telefone: "912345678",
          assunto: "Palestra / formação",
          mensagem: "Quero saber mais.",
          _subject: "Novo contacto: Palestra / formação",
        }),
      },
    );
    expect(await screen.findByRole("status")).toHaveTextContent(
      "Mensagem enviada!",
    );
  });

  it("disables submission while pending and can reset after success", async () => {
    let resolveRequest!: (response: Response) => void;
    vi.stubGlobal(
      "fetch",
      vi.fn(
        () =>
          new Promise<Response>((resolve) => {
            resolveRequest = resolve;
          }),
      ),
    );
    render(<ContactForm />);
    const user = await fillRequiredFields();

    await user.click(screen.getByRole("button", { name: "Enviar mensagem" }));
    expect(screen.getByRole("button", { name: "A enviar…" })).toBeDisabled();

    resolveRequest(new Response(null, { status: 200 }));
    await screen.findByText("Mensagem enviada!");
    await user.click(
      screen.getByRole("button", { name: "Enviar outra mensagem" }),
    );

    expect(screen.getByLabelText("Nome")).toHaveValue("");
    expect(screen.getByLabelText("Email")).toHaveValue("");
    expect(screen.getByLabelText("Mensagem")).toHaveValue("");
  });

  it("shows an alert and restores submission after Formspree rejects", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(null, { status: 500 })),
    );
    render(<ContactForm />);
    const user = await fillRequiredFields();

    await user.click(screen.getByRole("button", { name: "Enviar mensagem" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Não consegui enviar a mensagem.",
    );
    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: "Enviar mensagem" }),
      ).toBeEnabled(),
    );
  });
});
