import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("next/script", () => ({
  default: ({ onLoad }: { onLoad?: () => void }) => (
    <button type="button" onClick={onLoad}>
      Load reCAPTCHA
    </button>
  ),
}));

async function renderConfiguredForm() {
  const { ContactForm } = await import(
    "@/app/(site)/contactos/contact-form"
  );
  return render(<ContactForm />);
}

async function fillRequiredFields(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText("Nome"), "Ana Silva");
  await user.type(screen.getByLabelText("Email"), "ana@example.com");
  await user.type(screen.getByLabelText("Mensagem"), "Quero saber mais.");
  await user.click(screen.getByRole("checkbox"));
}

describe("ContactForm with reCAPTCHA", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubEnv("NEXT_PUBLIC_RECAPTCHA", "recaptcha-site-key");
    vi.stubEnv("NEXT_PUBLIC_FORMSPREE_ID", "contact-form");
  });

  afterEach(() => {
    delete window.grecaptcha;
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("blocks submission until reCAPTCHA returns a token", async () => {
    const renderCaptcha = vi.fn(() => 7);
    window.grecaptcha = {
      render: renderCaptcha,
      getResponse: vi.fn(() => ""),
      reset: vi.fn(),
    };
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    await renderConfiguredForm();

    await user.click(screen.getByRole("button", { name: "Load reCAPTCHA" }));
    await waitFor(() => expect(renderCaptcha).toHaveBeenCalled());
    await fillRequiredFields(user);
    await user.click(screen.getByRole("button", { name: "Enviar mensagem" }));

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Confirma que não és um robô antes de enviar.",
    );
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("sends the token and resets the widget after an upstream failure", async () => {
    const reset = vi.fn();
    window.grecaptcha = {
      render: vi.fn(() => 11),
      getResponse: vi.fn(() => "captcha-token"),
      reset,
    };
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response(null, { status: 500 }));
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    await renderConfiguredForm();

    await user.click(screen.getByRole("button", { name: "Load reCAPTCHA" }));
    await waitFor(() => expect(window.grecaptcha?.render).toHaveBeenCalled());
    await fillRequiredFields(user);
    await user.click(screen.getByRole("button", { name: "Enviar mensagem" }));

    await screen.findByRole("alert");
    const [, request] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(JSON.parse(request.body as string)).toMatchObject({
      "g-recaptcha-response": "captcha-token",
    });
    expect(reset).toHaveBeenCalledWith(11);
  });
});
