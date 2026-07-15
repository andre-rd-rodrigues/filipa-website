"use client";

import { useId, useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/button";

const subjects = [
  "Coaching individual",
  "Coaching de equipa",
  "Cursos",
  "Palestra / formação",
  "Outro",
] as const;

type FormState = {
  nome: string;
  email: string;
  telefone: string;
  assunto: string;
  mensagem: string;
  consentimento: boolean;
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  nome: "",
  email: "",
  telefone: "",
  assunto: subjects[0],
  mensagem: "",
  consentimento: false,
};

const fieldClasses =
  "w-full rounded-none border border-[color:var(--border-stone)] bg-surface px-4 py-[13px] font-body text-[1.0625rem] text-fg placeholder:text-fg-muted transition-colors duration-200 focus:border-action focus:ring-2 focus:ring-action/30 focus:outline-none aria-[invalid=true]:border-error";

const labelClasses = "eyebrow block text-fg-muted";

export function ContactForm() {
  const uid = useId();
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const fieldId = (name: keyof FormState) => `${uid}-${name}`;
  const errorId = (name: keyof FormState) => `${uid}-${name}-error`;

  function update(
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value, type } = event.target;
    const nextValue =
      type === "checkbox"
        ? (event.target as HTMLInputElement).checked
        : value;
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
    if (!state.nome.trim()) next.nome = "Diz-me como te chamas.";
    if (!state.email.trim()) {
      next.email = "Preciso do teu email para responder.";
    } else if (!state.email.includes("@")) {
      next.email = "Verifica o email, parece estar incompleto.";
    }
    if (!state.mensagem.trim()) {
      next.mensagem = "Conta-me um pouco sobre o que precisas.";
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

    // Mock submission — no network call. Simulates a brief send delay.
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setValues(initialState);
    }, 600);
  }

  if (isSent) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-none border border-[color:var(--border-stone)] bg-surface p-8"
      >
        <span
          aria-hidden
          className="flex h-11 w-11 items-center justify-center rounded-none bg-success/12 text-success"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <h3 className="mt-5 font-body text-xl font-semibold tracking-[-0.01em] text-fg">
          Mensagem enviada!
        </h3>
        <p className="text-pretty mt-2 text-[1.0625rem] leading-relaxed text-fg-muted">
          Obrigada pela tua mensagem. Entro em contacto em breve, normalmente
          em 24–48h.
        </p>
        <div className="mt-6">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setIsSent(false)}
          >
            Enviar outra mensagem
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <label htmlFor={fieldId("nome")} className={labelClasses}>
          Nome
        </label>
        <input
          id={fieldId("nome")}
          name="nome"
          type="text"
          value={values.nome}
          onChange={update}
          required
          autoComplete="name"
          aria-invalid={errors.nome ? true : undefined}
          aria-describedby={errors.nome ? errorId("nome") : undefined}
          className={`mt-2 ${fieldClasses}`}
        />
        {errors.nome ? (
          <p id={errorId("nome")} className="mt-1.5 text-sm text-error">
            {errors.nome}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={fieldId("email")} className={labelClasses}>
          Email
        </label>
        <input
          id={fieldId("email")}
          name="email"
          type="email"
          value={values.email}
          onChange={update}
          required
          autoComplete="email"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? errorId("email") : undefined}
          className={`mt-2 ${fieldClasses}`}
        />
        {errors.email ? (
          <p id={errorId("email")} className="mt-1.5 text-sm text-error">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={fieldId("telefone")} className={labelClasses}>
          Telefone <span className="normal-case text-fg-muted">(opcional)</span>
        </label>
        <input
          id={fieldId("telefone")}
          name="telefone"
          type="tel"
          value={values.telefone}
          onChange={update}
          autoComplete="tel"
          className={`mt-2 ${fieldClasses}`}
        />
      </div>

      <div>
        <label htmlFor={fieldId("assunto")} className={labelClasses}>
          Assunto
        </label>
        <select
          id={fieldId("assunto")}
          name="assunto"
          value={values.assunto}
          onChange={update}
          className={`mt-2 appearance-none bg-[length:1.1rem] bg-[right_1rem_center] bg-no-repeat pr-11 ${fieldClasses}`}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%239a9aa0' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
          }}
        >
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor={fieldId("mensagem")} className={labelClasses}>
          Mensagem
        </label>
        <textarea
          id={fieldId("mensagem")}
          name="mensagem"
          value={values.mensagem}
          onChange={update}
          required
          rows={5}
          placeholder="Conta-me onde estás e onde queres chegar."
          aria-invalid={errors.mensagem ? true : undefined}
          aria-describedby={errors.mensagem ? errorId("mensagem") : undefined}
          className={`mt-2 resize-y ${fieldClasses}`}
        />
        {errors.mensagem ? (
          <p id={errorId("mensagem")} className="mt-1.5 text-sm text-error">
            {errors.mensagem}
          </p>
        ) : null}
      </div>

      <div>
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
            className="mt-1 h-[18px] w-[18px] shrink-0 rounded-none border border-[color:var(--border-stone)] accent-action focus:ring-2 focus:ring-action/30 focus:outline-none"
          />
          <label
            htmlFor={fieldId("consentimento")}
            className="text-[0.9375rem] leading-relaxed text-fg-secondary"
          >
            Li e aceito a{" "}
            <Link
              href="/privacidade"
              className="text-action-deep underline decoration-1 underline-offset-2 hover:text-action-hover"
            >
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

      <div className="mt-1">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? "A enviar…" : "Enviar mensagem"}
        </Button>
      </div>
    </form>
  );
}
