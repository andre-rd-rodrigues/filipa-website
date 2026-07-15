import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/section";
import { Eyebrow } from "@/components/eyebrow";
import { ButtonLink } from "@/components/button";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/page-hero";
import { getAllServices, getServiceBySlug } from "@/lib/services";
import { buildServiceSchema } from "@/lib/schema";
import { primaryCta } from "@/lib/site";

// All slugs are known at build time (mock today, Sanity later). Unknown slugs
// 404 rather than rendering on demand.
export const dynamicParams = false;

export async function generateStaticParams() {
  const services = await getAllServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata(props: PageProps<"/servicos/[slug]">) {
  const { slug } = await props.params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: "Serviço não encontrado" };

  return {
    title: service.title,
    description: service.summary,
    alternates: {
      canonical: `/servicos/${slug}`,
    },
    openGraph: {
      title: service.title,
      description: service.summary,
      type: "website",
      images: [{ url: service.image.src }],
    },
  };
}

export default async function ServicePage(props: PageProps<"/servicos/[slug]">) {
  const { slug } = await props.params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const ctas = service.ctas ?? [
    { label: primaryCta.label, href: primaryCta.href, variant: "primary" as const },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildServiceSchema(service)),
        }}
      />

      <PageHero
        title={service.title}
        parent={{ label: "Serviços", href: "/servicos" }}
      />

      {/* Service intro — image + summary + practical details */}
      <Section tone="page">
        <Reveal className="grid items-start gap-8 lg:grid-cols-2 lg:gap-14">
          {/* Photo */}
          <div className="relative aspect-[4/3] overflow-hidden bg-surface-muted">
            <Image
              src={service.image.src}
              alt={service.image.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>

          {/* Summary + meta */}
          <div>
            {service.tag ? (
              <span className="inline-block rounded-none border border-[color:var(--border-stone)] px-3.5 py-1.5 text-[0.75rem] font-medium uppercase tracking-[0.14em] text-action-deep">
                {service.tag}
              </span>
            ) : null}

            {service.subtitle ? (
              <p className="mt-5 text-[1.0625rem] font-semibold tracking-[-0.01em] text-fg">
                {service.subtitle}
              </p>
            ) : null}

            <p className="text-pretty mt-4 max-w-xl text-lg leading-relaxed text-fg-muted">
              {service.summary}
            </p>

            <dl className="mt-6 space-y-3 border-t border-[color:var(--border-stone)] pt-6 text-[0.9375rem]">
              {service.audience ? (
                <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
                  <dt className="shrink-0 text-[0.75rem] uppercase tracking-[0.14em] text-fg-muted sm:w-36 sm:pt-0.5">
                    Para quem
                  </dt>
                  <dd className="text-fg-secondary">{service.audience}</dd>
                </div>
              ) : null}
              {service.includes && service.includes.length > 0 ? (
                <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
                  <dt className="shrink-0 text-[0.75rem] uppercase tracking-[0.14em] text-fg-muted sm:w-36 sm:pt-0.5">
                    Inclui
                  </dt>
                  <dd className="text-fg-secondary">
                    {service.includes.join(" · ")}
                  </dd>
                </div>
              ) : null}
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              {ctas.map((cta) => (
                <ButtonLink
                  key={cta.label}
                  href={cta.href}
                  variant={cta.variant}
                  size="sm"
                >
                  {cta.label}
                </ButtonLink>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Introdução */}
      {service.intro && service.intro.length > 0 ? (
        <Section tone="surface" narrow>
          <Reveal>
            <Eyebrow className="mb-4">Introdução</Eyebrow>
            <div className="text-pretty space-y-5 text-lg leading-relaxed text-fg-muted">
              {service.intro.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </Section>
      ) : null}

      {/* O que vais ganhar */}
      {service.benefits && service.benefits.length > 0 ? (
        <Section tone="page">
          <Reveal>
            <Eyebrow className="mb-4">O que vais ganhar</Eyebrow>
            <h2 className="font-display max-w-2xl text-balance text-[clamp(2rem,4vw,3rem)] leading-[1.1]">
              Resultados que sentes dentro e fora de campo.
            </h2>
          </Reveal>

          <Reveal className="mt-10 grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {service.benefits.map((item) => (
              <div
                key={item.label ?? item.description}
                className="flex gap-3 border-t border-[color:var(--border-stone)] pt-4 text-[0.9375rem] leading-relaxed text-fg-secondary"
              >
                <span
                  aria-hidden
                  className="mt-[0.7em] h-px w-4 shrink-0 bg-action-deep"
                />
                <span className="text-pretty">
                  {item.label ? (
                    <strong className="font-semibold text-fg">
                      {item.label}:
                    </strong>
                  ) : null}{" "}
                  {item.description}
                </span>
              </div>
            ))}
          </Reveal>
        </Section>
      ) : null}

      {/* Como funciona */}
      {service.process && service.process.length > 0 ? (
        <Section tone="dark">
          <Reveal>
            <Eyebrow tone="dark" className="mb-4">
              Como funciona
            </Eyebrow>
            <h2 className="font-display max-w-2xl text-balance text-[clamp(2rem,4vw,3rem)] leading-[1.1]">
              Um caminho claro, do primeiro passo ao impacto.
            </h2>
          </Reveal>

          <div className="mt-14 space-y-12">
            {service.process.map((step, i) => (
              <Reveal key={step.title} delay={i * 80}>
                <div className="grid gap-6 border-t border-[color:var(--ink-line)] pt-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
                  <div className="flex gap-4">
                    <span
                      className="font-display text-2xl text-action"
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-xl font-semibold leading-snug tracking-[-0.01em] text-fg-inverse">
                      {step.title}
                    </h3>
                  </div>
                  <div>
                    {step.lead ? (
                      <p className="mb-2 font-semibold tracking-[-0.01em] text-fg-inverse">
                        {step.lead}
                      </p>
                    ) : null}
                    <p className="text-pretty leading-relaxed text-fg-inverse-muted">
                      {step.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      ) : null}

      {/* Final CTA */}
      <Section tone="ink">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <h2 className="font-display text-balance text-[clamp(2rem,4vw,3rem)] leading-[1.1]">
              {service.closing?.heading ?? "Vamos desenhar o teu plano de jogo?"}
            </h2>
            {service.closing?.lead ? (
              <p className="mt-4 text-lg font-semibold tracking-[-0.01em] text-fg-inverse">
                {service.closing.lead}
              </p>
            ) : null}
            <p className="text-pretty mt-4 max-w-xl text-lg leading-relaxed text-fg-inverse-muted">
              {service.closing?.body ??
                "Agenda uma conversa e definimos, juntos, o caminho ideal para ti, sem compromisso."}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-4">
            <ButtonLink href={primaryCta.href} variant="primary">
              {primaryCta.label}
            </ButtonLink>
          </div>
        </Reveal>
      </Section>

      {/* Back link */}
      <Section tone="page" narrow>
        <Link
          href="/servicos"
          className="inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-[0.06em] text-action-deep hover:text-action-hover"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M15 8H2M7 3L2 8l5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Ver todos os serviços
        </Link>
      </Section>
    </>
  );
}
