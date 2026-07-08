import type { Metadata } from "next";
import { Section } from "@/components/section";
import { Eyebrow } from "@/components/eyebrow";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/page-hero";
import { contact, socials } from "@/lib/site";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contactos",
  description:
    "Marca uma conversa com a Filipa Marques. Coaching, PNL e inteligência emocional para o desporto — por telefone, email ou formulário. Respondo em breve.",
};

const faqs = [
  {
    question: "A primeira sessão é já um compromisso?",
    answer:
      "Não. A primeira conversa serve para nos conhecermos, perceber onde estás e o que procuras. Sem obrigação — só decidimos avançar se fizer sentido para ti.",
  },
  {
    question: "Trabalhas online ou presencial?",
    answer:
      "As duas. Faço sessões presenciais em Portugal e online por videochamada, para que a distância nunca seja um obstáculo.",
  },
  {
    question: "O que partilho fica confidencial?",
    answer:
      "Sempre. Tudo o que falamos é confidencial e tratado com o cuidado que mereces — é a base para trabalharmos com confiança.",
  },
];

export default function ContactosPage() {
  return (
    <>
      <PageHero
        eyebrow="Contactos"
        title="Vamos falar?"
        description="Marca uma conversa. Conta-me onde estás e onde queres chegar — respondo em breve."
      />

      <Section tone="page">
        <div className="grid gap-x-14 gap-y-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          {/* LEFT — the form */}
          <Reveal>
            <Eyebrow className="mb-4">Envia mensagem</Eyebrow>
            <h2 className="font-display text-balance text-[clamp(2rem,4vw,3rem)] leading-[1.1]">
              Conta-me o que precisas.
            </h2>
            <p className="text-pretty mt-4 max-w-lg text-lg leading-relaxed text-fg-muted">
              Preenche o formulário e recebes resposta minha, normalmente em
              24–48h. Sem respostas automáticas.
            </p>
            <div className="mt-10">
              <ContactForm />
            </div>
          </Reveal>

          {/* RIGHT — direct contact details */}
          <Reveal delay={80}>
            <div className="lg:pl-2">
              <h3 className="eyebrow text-fg-muted">Contacto directo</h3>

              <dl className="mt-6 space-y-6">
                <div className="border-t border-[color:var(--border-stone)] pt-5">
                  <dt className="text-sm font-medium text-fg-secondary">
                    Telefone
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={contact.phoneHref}
                      className="text-[1.0625rem] text-fg transition-colors hover:text-action-deep"
                    >
                      {contact.phone}
                    </a>
                  </dd>
                </div>

                <div className="border-t border-[color:var(--border-stone)] pt-5">
                  <dt className="text-sm font-medium text-fg-secondary">
                    Email
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={contact.emailHref}
                      className="break-words text-[1.0625rem] text-fg transition-colors hover:text-action-deep"
                    >
                      {contact.email}
                    </a>
                  </dd>
                </div>

                <div className="border-t border-[color:var(--border-stone)] pt-5">
                  <dt className="text-sm font-medium text-fg-secondary">
                    Onde
                  </dt>
                  <dd className="mt-1 text-[1.0625rem] text-fg">
                    {contact.location}
                  </dd>
                </div>
              </dl>

              <p className="text-pretty mt-8 max-w-sm text-[0.9375rem] leading-relaxed text-fg-muted">
                Escrevo-te de volta, normalmente em 24–48h. Prefiro conversas a
                respostas automáticas.
              </p>

              <div className="mt-10 border-t border-[color:var(--border-stone)] pt-6">
                <h3 className="eyebrow text-fg-muted">Segue o trabalho</h3>
                <ul className="mt-4 space-y-3">
                  {socials.map((social) => (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-baseline gap-2 text-[1.0625rem] text-fg transition-colors hover:text-action-deep"
                      >
                        <span className="font-medium">{social.label}</span>
                        <span className="text-[0.9375rem] text-fg-muted transition-colors group-hover:text-action-deep">
                          {social.handle}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Reassurance — light FAQ */}
      <Section tone="muted">
        <Reveal>
          <Eyebrow className="mb-4">Antes de marcares</Eyebrow>
          <h2 className="font-display max-w-2xl text-balance text-[clamp(2rem,4vw,3rem)] leading-[1.1]">
            O essencial, sem rodeios.
          </h2>
        </Reveal>

        <Reveal className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-3">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="border-t border-[color:var(--border-stone)] pt-5"
            >
              <h3 className="font-body text-xl font-semibold tracking-[-0.01em]">
                {faq.question}
              </h3>
              <p className="text-pretty mt-3 text-[1.0625rem] leading-relaxed text-fg-muted">
                {faq.answer}
              </p>
            </div>
          ))}
        </Reveal>
      </Section>
    </>
  );
}
