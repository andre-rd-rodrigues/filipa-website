import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/section";
import { Eyebrow } from "@/components/eyebrow";
import { ButtonLink } from "@/components/button";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/page-hero";
import { QuoteBand } from "@/components/quote-band";
import { EditorialImage } from "@/components/editorial-image";
import { getSiteSettings } from "@/lib/settings";
import { getServicesPage } from "@/lib/pages";
import { getAllServices } from "@/lib/services";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getServicesPage();
  const description =
    page.seo?.metaDescription ??
    "Coaching individual, coaching de equipas, inteligência emocional e PNL aplicados ao desporto. Serviços que ligam a mente aos teus resultados.";
  return {
    title: page.seo?.metaTitle ?? "Serviços",
    description,
    alternates: { canonical: "/servicos" },
    openGraph: {
      title: page.seo?.metaTitle ?? "Serviços",
      description,
      type: "website",
    },
  };
}

export default async function ServicosPage() {
  const [site, page, services] = await Promise.all([
    getSiteSettings(),
    getServicesPage(),
    getAllServices(),
  ]);

  return (
    <>
      <PageHero title={page.heroTitle ?? "Serviços"} />

      {/* Signature service-row list */}
      <Section tone="page">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <Eyebrow className="mb-4">{page.introEyebrow}</Eyebrow>
            <h2 className="font-display max-w-2xl text-balance text-[clamp(2rem,4vw,3.25rem)] leading-[1.1]">
              {page.introTitle}
            </h2>
            <p className="text-pretty mt-5 max-w-xl text-lg leading-relaxed text-fg-muted">
              {page.introBody}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <EditorialImage
              src="/img/profile-bola.webp"
              alt="Filipa Marques a segurar uma bola de futebol"
              priority
            />
          </Reveal>
        </div>

        <div className="mt-14 border-t border-[color:var(--border-stone)]">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 60}>
              <Link
                href={`/servicos/${service.slug}`}
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
          <Eyebrow className="mb-4">{page.audiencesEyebrow}</Eyebrow>
          <h2 className="font-display max-w-2xl text-balance text-[clamp(2rem,4vw,3.25rem)] leading-[1.1]">
            {page.audiencesTitle}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
          <Reveal>
            <EditorialImage
              src="/img/profile-blazer-branco.webp"
              alt="Filipa Marques de blazer branco, pose pensativa"
              sizes="(max-width: 1024px) 90vw, 38vw"
            />
          </Reveal>

          <Reveal delay={80} className="space-y-8">
            {(page.audiences ?? []).map((aud) => (
              <div
                key={aud.title}
                className="border-t border-[color:var(--border-stone)] pt-5"
              >
                <h3 className="font-body text-xl font-semibold tracking-[-0.01em]">
                  {aud.title}
                </h3>
                <p className="text-pretty mt-3 text-[1.0625rem] leading-relaxed text-fg-muted">
                  {aud.description}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </Section>

      {/* Quote band */}
      <Section tone="dark" size="lg">
        <Reveal>
          <QuoteBand
            eyebrow={page.quoteEyebrow ?? ""}
            quote={site.quotes.servicos}
            name={site.name}
          />
        </Reveal>
      </Section>

      {/* Final CTA */}
      <Section tone="ink">
        <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <EditorialImage
              src="/img/profile-escritorio.webp"
              alt="Filipa Marques à secretária, de blazer azul"
              sizes="(max-width: 1024px) 90vw, 34vw"
            />
          </Reveal>

          <Reveal delay={80}>
            <h2 className="font-display text-balance text-[clamp(2rem,4vw,3rem)] leading-[1.1]">
              {page.ctaTitle}
            </h2>
            <p className="text-pretty mt-5 max-w-lg text-lg leading-relaxed text-fg-inverse-muted">
              {page.ctaBody}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {(page.ctas ?? []).map((cta) => (
                <ButtonLink
                  key={cta.label}
                  href={cta.href}
                  variant={cta.variant === "primary" ? "primary" : "secondary-dark"}
                >
                  {cta.label}
                </ButtonLink>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
