"use client";

import { useId, useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";

type FormState = {
  email: string;
  consentimento: boolean;
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  email: "",
  consentimento: false,
};

function EnvelopeIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <rect x="2" y="4" width="20" height="16" rx="0" />
      <path d="m2 7 10 7 10-7" />
    </svg>
  );
}

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function NewsletterForm({
  variant = "light",
  title,
  description,
  fullWidth = false,
}: {
  /** `dark` for footer / dark bands; `light` for page sections. */
  variant?: "light" | "dark";
  /** Large display title above the form (reference: “Newsletter Signup”). */
  title?: string;
  description?: string;
  /** Stretch to the full width of the parent (footer). */
  fullWidth?: boolean;
}) {
  const uid = useId();
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const isDark = variant === "dark";
  const fieldId = (name: keyof FormState) => `${uid}-${name}`;
  const errorId = (name: keyof FormState) => `${uid}-${name}-error`;

  const titleClass = isDark ? "text-fg-inverse" : "text-fg";
  const descClass = isDark ? "text-fg-inverse-muted" : "text-fg-muted";
  const iconClass = isDark ? "text-fg-inverse" : "text-fg";
  const inputClass = isDark
    ? "min-w-0 flex-1 bg-transparent font-body text-[1.0625rem] text-fg-inverse placeholder:text-fg-inverse-muted focus:outline-none"
    : "min-w-0 flex-1 bg-transparent font-body text-[1.0625rem] text-fg placeholder:text-fg-muted focus:outline-none";
  const underlineClass = isDark
    ? "border-b border-white/20 focus-within:border-action"
    : "border-b border-[color:var(--border-stone)] focus-within:border-action";
  const consentLabelClasses = isDark
    ? "text-[0.9375rem] leading-relaxed text-fg-inverse-muted"
    : "text-[0.9375rem] leading-relaxed text-fg-secondary";
  const checkboxClasses = isDark
    ? "mt-0.5 h-[18px] w-[18px] shrink-0 rounded-none border border-white/25 bg-transparent accent-action focus:ring-2 focus:ring-action/30 focus:outline-none"
    : "mt-0.5 h-[18px] w-[18px] shrink-0 rounded-none border border-[color:var(--border-stone)] accent-action focus:ring-2 focus:ring-action/30 focus:outline-none";
  const linkClass = isDark
    ? "text-fg-inverse underline decoration-1 underline-offset-2 transition-colors hover:text-action"
    : "text-fg underline decoration-1 underline-offset-2 transition-colors hover:text-action-deep";

  function update(event: ChangeEvent<HTMLInputElement>) {
    const { name, value, type } = event.target;
    const nextValue = type === "checkbox" ? event.target.checked : value;
    setValues((prev) => ({ ...prev, [name]: nextValue }));
    setErrors((prev) => {
      if (!prev[name as keyof FormState]) return prev;
      const next = { ...prev };
      delete next[name as keyof FormState];
      return next;
    });
  }

  function validate(state: FormState): FieldErrors {
    const next: FieldErrors = {};
    if (!state.email.trim()) {
      next.email = "Preciso do teu email para te enviar novidades.";
    } else if (!state.email.includes("@")) {
      next.email = "Verifica o email — parece estar incompleto.";
    }
    if (!state.consentimento) {
      next.consentimento = "Aceita a Política de Privacidade para continuar.";
    }
    return next;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setValues(initialState);
    }, 600);
  }

  return (
    <div className={fullWidth ? "w-full" : "max-w-xl"}>
      {title ? (
        <h2
          className={`font-display text-balance text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.08] tracking-[-0.02em] ${titleClass}`}
        >
          {title}
        </h2>
      ) : null}
      {description ? (
        <p
          className={`text-pretty mt-4 text-[1.0625rem] leading-relaxed ${descClass}`}
        >
          {description}
        </p>
      ) : null}

      {isSent ? (
        <div
          role="status"
          aria-live="polite"
          className={title || description ? "mt-8" : undefined}
        >
          <p
            className={`font-body text-[1.0625rem] font-semibold tracking-[-0.01em] ${titleClass}`}
          >
            Estás na lista!
          </p>
          <p className={`text-pretty mt-2 text-[0.9375rem] leading-relaxed ${descClass}`}>
            Obrigada por te inscreveres. Recebes novidades em breve — sem spam.
          </p>
        </div>
      ) : (
        <form
          noValidate
          onSubmit={handleSubmit}
          className={title || description ? "mt-8" : undefined}
        >
          <label htmlFor={fieldId("email")} className="sr-only">
            Email
          </label>

          <div
            className={`flex items-center gap-4 pb-3 transition-colors duration-200 ${underlineClass}`}
          >
            <EnvelopeIcon className={`shrink-0 ${iconClass}`} />
            <input
              id={fieldId("email")}
              name="email"
              type="email"
              value={values.email}
              onChange={update}
              required
              autoComplete="email"
              placeholder="Introduz o teu email"
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? errorId("email") : undefined}
              className={inputClass}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              aria-label={isSubmitting ? "A inscrever" : "Subscrever newsletter"}
              className={`shrink-0 transition-colors duration-200 hover:text-action disabled:opacity-50 ${iconClass}`}
            >
              <ArrowIcon />
            </button>
          </div>

          {errors.email ? (
            <p id={errorId("email")} className="mt-2 text-sm text-error">
              {errors.email}
            </p>
          ) : null}

          <div className="mt-5">
            <div className="flex items-start gap-3">
              <input
                id={fieldId("consentimento")}
                name="consentimento"
                type="checkbox"
                checked={values.consentimento}
                onChange={update}
                required
                aria-invalid={errors.consentimento ? true : undefined}
                aria-describedby={
                  errors.consentimento ? errorId("consentimento") : undefined
                }
                className={checkboxClasses}
              />
              <label
                htmlFor={fieldId("consentimento")}
                className={consentLabelClasses}
              >
                Li e aceito a{" "}
                <Link href="/privacidade" className={linkClass}>
                  Política de Privacidade
                </Link>
                .
              </label>
            </div>
            {errors.consentimento ? (
              <p
                id={errorId("consentimento")}
                className="mt-1.5 text-sm text-error"
              >
                {errors.consentimento}
              </p>
            ) : null}
          </div>
        </form>
      )}
    </div>
  );
}
