import type { Metadata } from "next";
import { Section } from "@/components/section";
import { Eyebrow } from "@/components/eyebrow";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/page-hero";
import { ButtonLink } from "@/components/button";
import { FaqAccordion } from "@/components/faq-accordion";
import { NewsletterForm } from "@/components/newsletter-form";
import { EditorialImage } from "@/components/editorial-image";
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
    question: "Preciso de ter um problema para começar coaching?",
    answer:
      "Não. O coaching é tanto para resolver bloqueios como para elevar quem já está bem e quer chegar mais longe. O ponto de partida és tu e os teus objetivos.",
  },
  {
    question: "Quanto tempo demora a ver resultados?",
    answer:
      "Depende de ti e do que procuras, mas sais logo da primeira sessão com clareza e um próximo passo concreto. A maioria nota diferenças reais nas primeiras semanas.",
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
      <PageHero title="Contactos" />

      <Section tone="page" id="form">
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

          {/* RIGHT — profile image + direct contact details */}
          <Reveal delay={80}>
            <div className="lg:pl-2">
              <EditorialImage
                src="/img/profile-2.jpg"
                alt="Retrato de Filipa Marques"
                ornament="hatch"
                sizes="(max-width: 1024px) 90vw, 38vw"
                className="mb-10"
              />

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

      {/* FAQ — accordion over dark band */}
      <Section tone="dark">
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          {/* LEFT — intro + CTA */}
          <Reveal>
            <Eyebrow tone="dark" className="mb-4">
              Perguntas &amp; respostas
            </Eyebrow>
            <h2 className="font-display text-balance text-[clamp(2rem,4vw,3rem)] leading-[1.1] text-fg-inverse">
              Perguntas frequentes
            </h2>
            <p className="text-pretty mt-4 max-w-md text-lg leading-relaxed text-fg-inverse-muted">
              O essencial antes de marcares, sem rodeios. Se ficar alguma dúvida,
              fala comigo — respondo a tudo.
            </p>
            <ButtonLink href="#form" className="mt-8">
              Marcar conversa
            </ButtonLink>
          </Reveal>

          {/* RIGHT — accordion */}
          <Reveal delay={80}>
            <FaqAccordion items={faqs} name="contact-faq" />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
