import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/section";
import { Eyebrow } from "@/components/eyebrow";
import { ButtonLink } from "@/components/button";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/page-hero";
import { getAllCourses, getCourseBySlug } from "@/lib/courses";
import { buildCourseSchema } from "@/lib/schema";
import { primaryCta } from "@/lib/site";

// All slugs are known at build time (mock today, Sanity later). Unknown slugs
// 404 rather than rendering on demand.
export const dynamicParams = false;

export async function generateStaticParams() {
  const courses = await getAllCourses();
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata(props: PageProps<"/cursos/[slug]">) {
  const { slug } = await props.params;
  const course = await getCourseBySlug(slug);
  if (!course) return { title: "Curso não encontrado" };

  return {
    title: course.title,
    description: course.summary,
    alternates: {
      canonical: `/cursos/${slug}`,
    },
    openGraph: {
      title: course.title,
      description: course.summary,
      type: "website",
      images: [{ url: course.image.src }],
    },
  };
}

/** Definition row for the practical-details list; renders nothing when empty. */
function MetaRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
      <dt className="shrink-0 text-[0.75rem] uppercase tracking-[0.14em] text-fg-muted sm:w-36 sm:pt-0.5">
        {label}
      </dt>
      <dd className="text-fg-secondary">{value}</dd>
    </div>
  );
}

export default async function CoursePage(props: PageProps<"/cursos/[slug]">) {
  const { slug } = await props.params;
  const course = await getCourseBySlug(slug);
  if (!course) notFound();

  const learn = course.objectives ?? course.outcomes;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildCourseSchema(course)),
        }}
      />

      <PageHero title={course.title} breadcrumb={course.title} />

      {/* Course intro — image + summary + practical details */}
      <Section tone="page">
        <Reveal className="grid items-start gap-8 lg:grid-cols-2 lg:gap-14">
          {/* Photo */}
          <div className="relative aspect-[4/3] overflow-hidden bg-surface-muted">
            <Image
              src={course.image.src}
              alt={course.image.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>

          {/* Summary + meta */}
          <div>
            <span className="inline-block rounded-none border border-[color:var(--border-stone)] px-3.5 py-1.5 text-[0.75rem] font-medium uppercase tracking-[0.14em] text-action-deep">
              {course.category}
            </span>

            {course.subtitle ? (
              <p className="mt-5 text-[1.0625rem] font-semibold tracking-[-0.01em] text-fg">
                {course.subtitle}
              </p>
            ) : null}

            <p className="text-pretty mt-4 max-w-xl text-lg leading-relaxed text-fg-muted">
              {course.summary}
            </p>

            <dl className="mt-6 space-y-3 border-t border-[color:var(--border-stone)] pt-6 text-[0.9375rem]">
              <MetaRow label="Para quem" value={course.audience} />
              <MetaRow label="Duração" value={course.duration} />
              <MetaRow label="Quando" value={course.schedule} />
              <MetaRow label="Formato" value={course.format} />
              {course.includes && course.includes.length > 0 ? (
                <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
                  <dt className="shrink-0 text-[0.75rem] uppercase tracking-[0.14em] text-fg-muted sm:w-36 sm:pt-0.5">
                    Inclui
                  </dt>
                  <dd className="text-fg-secondary">
                    {course.includes.join(" · ")}
                  </dd>
                </div>
              ) : null}
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              {course.ctas.map((cta) => (
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
      {course.intro && course.intro.length > 0 ? (
        <Section tone="surface" narrow>
          <Reveal>
            <Eyebrow className="mb-4">Introdução</Eyebrow>
            <div className="text-pretty space-y-5 text-lg leading-relaxed text-fg-muted">
              {course.intro.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </Section>
      ) : null}

      {/* O que vais aprender */}
      {learn.length > 0 ? (
        <Section tone="page">
          <Reveal>
            <Eyebrow className="mb-4">Objetivos</Eyebrow>
            <h2 className="font-display max-w-2xl text-balance text-[clamp(2rem,4vw,3rem)] leading-[1.1]">
              O que vais aprender.
            </h2>
          </Reveal>

          <Reveal className="mt-10 grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {learn.map((item) => (
              <div
                key={item}
                className="flex gap-3 border-t border-[color:var(--border-stone)] pt-4 text-[0.9375rem] leading-relaxed text-fg-secondary"
              >
                <span
                  aria-hidden
                  className="mt-[0.7em] h-px w-4 shrink-0 bg-action-deep"
                />
                <span className="text-pretty">{item}</span>
              </div>
            ))}
          </Reveal>
        </Section>
      ) : null}

      {/* Conteúdos programáticos */}
      {course.program && course.program.length > 0 ? (
        <Section tone="dark">
          <Reveal>
            <Eyebrow tone="dark" className="mb-4">
              Conteúdos programáticos
            </Eyebrow>
            <h2 className="font-display max-w-2xl text-balance text-[clamp(2rem,4vw,3rem)] leading-[1.1]">
              O programa, módulo a módulo.
            </h2>
          </Reveal>

          <div className="mt-14 space-y-12">
            {course.program.map((module, i) => (
              <Reveal key={module.title} delay={i * 80}>
                <div className="grid gap-6 border-t border-[color:var(--ink-line)] pt-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
                  <div className="flex gap-4">
                    <span
                      className="font-display text-2xl text-action"
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-xl font-semibold leading-snug tracking-[-0.01em] text-fg-inverse">
                      {module.title}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {module.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 leading-relaxed text-fg-inverse-muted"
                      >
                        <span
                          aria-hidden
                          className="mt-[0.7em] h-px w-4 shrink-0 bg-action"
                        />
                        <span className="text-pretty">{item}</span>
                      </li>
                    ))}
                  </ul>
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
              Queres garantir o teu lugar?
            </h2>
            <p className="text-pretty mt-5 max-w-xl text-lg leading-relaxed text-fg-inverse-muted">
              Marca uma conversa e confirmo contigo datas, formato e todos os
              detalhes antes de reservares — sem compromisso.
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
          href="/cursos"
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
          Ver todos os cursos
        </Link>
      </Section>
    </>
  );
}
