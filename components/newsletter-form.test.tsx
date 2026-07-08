import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NewsletterForm } from "@/components/newsletter-form";

describe("NewsletterForm", () => {
  it("renders the email field", () => {
    render(<NewsletterForm />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
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
});
