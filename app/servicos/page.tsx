import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/section";
import { Eyebrow } from "@/components/eyebrow";
import { ButtonLink } from "@/components/button";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/page-hero";
import { primaryCta } from "@/lib/site";
import { audiences, services } from "./data";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Coaching individual, coaching de equipas, inteligência emocional e PNL aplicados ao desporto. Serviços que ligam a mente aos teus resultados.",
};

export default function ServicosPage() {
  return (
    <>
      <PageHero title="Serviços" />

      {/* Signature service-row list */}
      <Section tone="page">
        <Reveal>
          <Eyebrow className="mb-4">O que ofereço</Eyebrow>
          <h2 className="font-display max-w-2xl text-balance text-[clamp(2rem,4vw,3.25rem)] leading-[1.1]">
            Cada serviço, um caminho para agir com foco.
          </h2>
          <p className="text-pretty mt-5 max-w-xl text-lg leading-relaxed text-fg-muted">
            Do acompanhamento individual às formações para clubes — escolhe por
            onde começar e falamos sobre o que faz sentido para ti.
          </p>
        </Reveal>

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
                  <h3 className="font-body text-[clamp(1.25rem,2vw,1.5rem)] font-semibold tracking-[-0.01em]">
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
                  className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-none border border-[color:var(--border-stone)] text-fg transition-[border-color] duration-[220ms] ease-out group-hover:border-action"
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

        <Reveal className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-3">
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
      </Section>

      {/* Final CTA */}
      <Section tone="ink" className="text-center">
        <Reveal>
          <h2 className="font-display mx-auto max-w-2xl text-balance text-[clamp(2rem,4vw,3rem)] leading-[1.1]">
            Não sabes por onde começar?
          </h2>
          <p className="text-pretty mx-auto mt-5 max-w-lg text-lg leading-relaxed text-fg-inverse-muted">
            Marca uma conversa e descobrimos juntos qual o serviço que melhor
            responde ao teu momento.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
            <ButtonLink href="/cursos" variant="secondary-dark">
              Ver cursos
            </ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
