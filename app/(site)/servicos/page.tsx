import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/section";
import { Eyebrow } from "@/components/eyebrow";
import { ButtonLink } from "@/components/button";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/page-hero";
import { QuoteBand } from "@/components/quote-band";
import { EditorialImage } from "@/components/editorial-image";
import { primaryCta, quotes, site } from "@/lib/site";
import { audiences, services } from "./data";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Coaching individual, coaching de equipas, inteligência emocional e PNL aplicados ao desporto. Serviços que ligam a mente aos teus resultados.",
  alternates: {
    canonical: "/servicos",
  },
  openGraph: {
    title: "Serviços",
    description:
      "Coaching individual, coaching de equipas, inteligência emocional e PNL aplicados ao desporto. Serviços que ligam a mente aos teus resultados.",
    type: "website",
  },
};

export default function ServicosPage() {
  return (
    <>
      <PageHero title="Serviços" />

      {/* Signature service-row list */}
      <Section tone="page">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <Eyebrow className="mb-4">O que ofereço</Eyebrow>
            <h2 className="font-display max-w-2xl text-balance text-[clamp(2rem,4vw,3.25rem)] leading-[1.1]">
              Treina a tua mente para elevares os teus resultados.
            </h2>
            <p className="text-pretty mt-5 max-w-xl text-lg leading-relaxed text-fg-muted">
              Coaching e PNL aplicados ao desporto, desde o acompanhamento
              individual a formações personalizadas para clubes. Escolhe por onde
              queres começar e desenhamos o plano juntos.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <EditorialImage
              src="/img/profile-2.jpg"
              alt="Filipa Marques com uma bola de futebol"
              priority
            />
          </Reveal>
        </div>

        <div className="mt-14 border-t border-[color:var(--border-stone)]">
          {services.map((service, i) => (
            <Reveal key={service.number} delay={i * 60}>
              <Link
                href={primaryCta.href}
                className="group flex items-start gap-6 border border-transparent border-b-[color:var(--border-stone)] p-6 transition-[border-color] duration-[220ms] ease-out hover:border-action sm:gap-10 sm:p-8"
              >
                <span
                  aria-hidden
                  className="font-display shrink-0 text-[clamp(2rem,4vw,3rem)] leading-none text-action"
                >
                  {service.number}
                </span>

                <div className="min-w-0 flex-1">
                  <h3 className="font-body text-[clamp(1.25rem,2vw,1.5rem)] font-semibold tracking-[-0.01em] transition-transform duration-[220ms] ease-out group-hover:translate-x-1">
                    {service.title}
                  </h3>
                  <p className="text-pretty mt-2 max-w-2xl text-[1.0625rem] leading-relaxed text-fg-muted">
                    {service.description}
                  </p>
                  {service.includes ? (
                    <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[0.9375rem] text-fg-secondary">
                      {service.includes.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span
                            aria-hidden
                            className="h-1 w-1 shrink-0 rounded-none bg-action"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>

                <span
                  aria-hidden
                  className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-none border border-[color:var(--border-stone)] text-fg transition-[border-color,background-color,color,transform] duration-[220ms] ease-out group-hover:translate-x-1 group-hover:border-action group-hover:bg-action group-hover:text-ink"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                  </svg>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Para quem — editorial audience columns */}
      <Section tone="muted">
        <Reveal>
          <Eyebrow className="mb-4">Para quem</Eyebrow>
          <h2 className="font-display max-w-2xl text-balance text-[clamp(2rem,4vw,3.25rem)] leading-[1.1]">
            Feito para quem vive o desporto.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
          <Reveal>
            <EditorialImage
              src="/img/profile-1.jpg"
              alt="Retrato de Filipa Marques"
              sizes="(max-width: 1024px) 90vw, 38vw"
            />
          </Reveal>

          <Reveal delay={80} className="space-y-8">
            {audiences.map((audience) => (
              <div
                key={audience.title}
                className="border-t border-[color:var(--border-stone)] pt-5"
              >
                <h3 className="font-body text-xl font-semibold tracking-[-0.01em]">
                  {audience.title}
                </h3>
                <p className="text-pretty mt-3 text-[1.0625rem] leading-relaxed text-fg-muted">
                  {audience.description}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </Section>

      {/* Quote band — cursor-spotlight reveal */}
      <Section tone="dark" size="lg">
        <Reveal>
          <QuoteBand
            eyebrow="autonomia e consciência"
            quote={quotes.servicos}
            name={site.name}
          />
        </Reveal>
      </Section>

      {/* Final CTA */}
      <Section tone="ink">
        <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <EditorialImage
              src="/img/profile-3.jpg"
              alt="Filipa Marques em estúdio"
              sizes="(max-width: 1024px) 90vw, 34vw"
            />
          </Reveal>

          <Reveal delay={80}>
            <h2 className="font-display text-balance text-[clamp(2rem,4vw,3rem)] leading-[1.1]">
              O teu próximo nível começa aqui.
            </h2>
            <p className="text-pretty mt-5 max-w-lg text-lg leading-relaxed text-fg-inverse-muted">
              Vamos conversar? Agenda uma sessão de diagnóstico e descobrimos,
              juntos, o melhor plano de jogo para ti.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
              <ButtonLink href="/cursos" variant="secondary-dark">
                Ver cursos
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
