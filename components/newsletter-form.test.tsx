import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NewsletterForm } from "@/components/newsletter-form";

describe("NewsletterForm", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    window.history.replaceState(null, "", "/");
  });

  it("renders the email field without stealing focus", () => {
    render(<NewsletterForm />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).not.toHaveFocus();
  });

  it("focuses the email field when the URL hash is #newsletter", () => {
    window.history.replaceState(null, "", "/#newsletter");
    render(<NewsletterForm />);
    expect(screen.getByLabelText("Email")).toHaveFocus();
  });

  it("focuses the email field when the hash changes to #newsletter", () => {
    render(<NewsletterForm />);
    expect(screen.getByLabelText("Email")).not.toHaveFocus();

    window.history.replaceState(null, "", "/#newsletter");
    window.dispatchEvent(new HashChangeEvent("hashchange"));

    expect(screen.getByLabelText("Email")).toHaveFocus();
  });

  it("shows a validation error when submitted empty", async () => {
    const user = userEvent.setup();
    render(<NewsletterForm />);

    await user.click(
      screen.getByRole("button", { name: "Subscrever newsletter" }),
    );

    expect(
      screen.getByText("Preciso do teu email para te enviar novidades."),
    ).toBeInTheDocument();
  });

  it("distinguishes an incomplete email from missing consent", async () => {
    const user = userEvent.setup();
    render(<NewsletterForm />);

    await user.type(screen.getByLabelText("Email"), "filipa.example.com");
    await user.click(
      screen.getByRole("button", { name: "Subscrever newsletter" }),
    );

    expect(
      screen.getByText("Verifica o email, parece estar incompleto."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Aceita a Política de Privacidade para continuar."),
    ).toBeInTheDocument();
  });

  it("posts a valid subscription, disables submission, and shows success", async () => {
    const user = userEvent.setup();
    let resolveRequest!: (response: Response) => void;
    const fetchMock = vi.fn(
      () =>
        new Promise<Response>((resolve) => {
          resolveRequest = resolve;
        }),
    );
    vi.stubGlobal("fetch", fetchMock);
    render(<NewsletterForm />);

    await user.type(screen.getByLabelText("Email"), "filipa@example.com");
    await user.click(screen.getByRole("checkbox"));
    await user.click(
      screen.getByRole("button", { name: "Subscrever newsletter" }),
    );

    expect(screen.getByRole("button", { name: "A inscrever" })).toBeDisabled();
    expect(fetchMock).toHaveBeenCalledWith("/api/newsletter", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "filipa@example.com",
        consentimento: true,
      }),
    });

    resolveRequest(new Response(null, { status: 200 }));

    expect(
      await screen.findByRole("status", { name: "" }),
    ).toHaveTextContent("Obrigado pela inscrição!");
    expect(screen.queryByLabelText("Email")).not.toBeInTheDocument();
  });

  it("shows an alert and restores the submit button after an API failure", async () => {
    const user = userEvent.setup();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(null, { status: 502 })),
    );
    render(<NewsletterForm />);

    await user.type(screen.getByLabelText("Email"), "filipa@example.com");
    await user.click(screen.getByRole("checkbox"));
    await user.click(
      screen.getByRole("button", { name: "Subscrever newsletter" }),
    );

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Não consegui completar a inscrição.",
    );
    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: "Subscrever newsletter" }),
      ).toBeEnabled(),
    );
  });
});
