import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Consent, CookieSettingsButton } from "@/components/consent";

const STORAGE_KEY = "fm-cookie-consent";

beforeEach(() => {
  window.localStorage.clear();
});

describe("Consent", () => {
  it("shows the banner when no choice is stored", async () => {
    render(<Consent />);
    expect(
      await screen.findByRole("dialog", { name: "Consentimento de cookies" }),
    ).toBeInTheDocument();
  });

  it("stays hidden when a choice is already stored", () => {
    window.localStorage.setItem(STORAGE_KEY, "granted");
    render(<Consent />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("persists acceptance and dismisses the banner", async () => {
    const user = userEvent.setup();
    render(<Consent />);

    await user.click(await screen.findByRole("button", { name: "Aceitar" }));

    // "granted" is the flag Google Analytics is gated on.
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe("granted");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("persists refusal and dismisses the banner", async () => {
    const user = userEvent.setup();
    render(<Consent />);

    await user.click(await screen.findByRole("button", { name: "Recusar" }));

    expect(window.localStorage.getItem(STORAGE_KEY)).toBe("denied");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("reopens from the settings button after a choice was made", async () => {
    const user = userEvent.setup();
    window.localStorage.setItem(STORAGE_KEY, "denied");
    render(
      <>
        <Consent />
        <CookieSettingsButton>Definições de cookies</CookieSettingsButton>
      </>,
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await user.click(
      screen.getByRole("button", { name: "Definições de cookies" }),
    );
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
  });
});
