import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Section } from "@/components/section";
import { Eyebrow } from "@/components/eyebrow";
import { ButtonLink } from "@/components/button";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/page-hero";
import { getAllCourses, getUpcomingSessions } from "@/lib/courses";
import { getCoursesPage } from "@/lib/pages";
import { CourseCalendar } from "@/components/course-calendar";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCoursesPage();
  const description =
    page.seo?.metaDescription ??
    "Cursos de PNL, inteligência emocional e comunicação aplicados ao desporto. Formação prática para atletas, treinadores e profissionais que querem agir.";
  return {
    title: page.seo?.metaTitle ?? "Cursos",
    description,
    alternates: { canonical: "/cursos" },
    openGraph: {
      title: page.seo?.metaTitle ?? "Cursos",
      description,
      type: "website",
    },
  };
}

// Decorative icons for the "Como funcionam" pillars, applied by position.
const howIcons: ReactNode[] = [
  <path key="a" d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />,
  <g key="b">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </g>,
  <path key="c" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />,
];

export default async function CursosPage() {
  const [page, courses, upcomingSessions] = await Promise.all([
    getCoursesPage(),
    getAllCourses(),
    getUpcomingSessions(),
  ]);

  // Base month for the calendar window, computed server-side so SSR and client
  // hydration agree (avoids a `new Date()` mismatch across a month boundary).
  const now = new Date();
  const baseMonth = { year: now.getFullYear(), month: now.getMonth() };

  return (
    <>
      <PageHero title={page.heroTitle ?? "Cursos"} />

      {/* Upcoming dates — month grid + agenda */}
      <Section tone="page" id="datas">
        <Reveal>
          <Eyebrow className="mb-4">{page.datesEyebrow}</Eyebrow>
        </Reveal>

        <Reveal className="mt-12 sm:mt-14">
          <CourseCalendar sessions={upcomingSessions} baseMonth={baseMonth} />
        </Reveal>
      </Section>

      {/* Course listing — full-width editorial blocks, alternating image side */}
      <Section tone="surface" id="lista">
        <Reveal>
          <Eyebrow className="mb-4">{page.listEyebrow}</Eyebrow>
        </Reveal>

        <div className="mt-10 space-y-16 sm:mt-12 sm:space-y-24">
          {courses.map((course, i) => {
            const imageRight = i % 2 === 1;
            return (
              <Reveal
                key={course.slug}
                as="article"
                className="grid items-center gap-8 border-t border-[color:var(--border-stone)] pt-12 first:border-t-0 first:pt-0 lg:grid-cols-2 lg:gap-14"
              >
                {/* Course photo */}
                <div
                  className={`${imageRight ? "lg:order-2" : ""} relative aspect-[4/3] overflow-hidden rounded-none bg-surface-muted`}
                >
                  <Image
                    src={course.image.src}
                    alt={course.image.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className={imageRight ? "lg:order-1" : ""}>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-block rounded-none border border-[color:var(--border-stone)] px-3.5 py-1.5 text-[0.75rem] font-medium uppercase tracking-[0.14em] text-action-deep">
                      {course.category}
                    </span>
                  </div>

                  <h3 className="font-display mt-5 text-balance text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.12]">
                    <Link
                      href={`/cursos/${course.slug}`}
                      className="transition-colors hover:text-action-deep"
                    >
                      {course.title}
                    </Link>
                  </h3>

                  <p className="text-pretty mt-4 max-w-xl text-lg leading-relaxed text-fg-muted">
                    {course.summary}
                  </p>

                  <dl className="mt-6 space-y-3 border-t border-[color:var(--border-stone)] pt-6 text-[0.9375rem]">
                    <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
                      <dt className="shrink-0 uppercase tracking-[0.14em] text-[0.75rem] text-fg-muted sm:w-36 sm:pt-0.5">
                        Para quem
                      </dt>
                      <dd className="text-fg-secondary">{course.audience}</dd>
                    </div>
                    <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
                      <dt className="shrink-0 uppercase tracking-[0.14em] text-[0.75rem] text-fg-muted sm:w-36 sm:pt-0.5">
                        Quando
                      </dt>
                      <dd className="text-fg-secondary">{course.schedule}</dd>
                    </div>
                  </dl>

                  <ul className="mt-6 space-y-2.5">
                    {course.outcomes.map((outcome) => (
                      <li key={outcome} className="flex gap-3 text-[0.9375rem] leading-relaxed text-fg-secondary">
                        <span
                          aria-hidden
                          className="mt-[0.7em] h-px w-4 shrink-0 bg-action-deep"
                        />
                        <span className="text-pretty">{outcome}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <ButtonLink
                      href={`/cursos/${course.slug}`}
                      variant="secondary"
                      size="sm"
                    >
                      Saber mais
                    </ButtonLink>
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
            );
          })}
        </div>
      </Section>

      {/* How the courses work — dark band, plain columns (not a sequence) */}
      <Section tone="dark">
        <Reveal>
          <Eyebrow tone="dark" className="mb-4">
            {page.howEyebrow}
          </Eyebrow>
          <h2 className="font-display max-w-2xl text-balance text-[clamp(2rem,4vw,3.25rem)] leading-[1.1]">
            {page.howTitle}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-3">
          {(page.howItWorks ?? []).map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <div className="border-t border-[color:var(--ink-line)] pt-6">
                <span
                  aria-hidden
                  className="mb-5 flex h-11 w-11 items-center justify-center rounded-none border border-[color:var(--ink-line)] text-fg-inverse"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {howIcons[i % howIcons.length]}
                  </svg>
                </span>
                <h3 className="text-xl font-semibold tracking-[-0.01em] text-fg-inverse">
                  {item.title}
                </h3>
                <p className="text-pretty mt-3 leading-relaxed text-fg-inverse-muted">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* FAQ — light band, native details/summary (no JS) */}
      <Section tone="page" narrow>
        <Reveal>
          <h2 className="font-display text-balance text-[clamp(2rem,4vw,3rem)] leading-[1.1]">
            {page.faqTitle}
          </h2>
        </Reveal>

        <Reveal className="mt-10 divide-y divide-[color:var(--border-stone)] border-y border-[color:var(--border-stone)]">
          {(page.faqs ?? []).map((faq) => (
            <details key={faq.question} className="faq-item group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold tracking-[-0.01em] text-fg [&::-webkit-details-marker]:hidden">
                {faq.question}
                <span
                  aria-hidden
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-none border border-[color:var(--border-stone)] text-action-deep transition-transform duration-200 group-open:rotate-45"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <p className="text-pretty mt-3 max-w-2xl leading-relaxed text-fg-muted">
                {faq.answer}
              </p>
            </details>
          ))}
        </Reveal>
      </Section>

      {/* Final CTA */}
      <Section tone="ink">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <h2 className="font-display text-balance text-[clamp(2rem,4vw,3rem)] leading-[1.1]">
              {page.ctaTitle}
            </h2>
            <p className="text-pretty mt-5 max-w-xl text-lg leading-relaxed text-fg-inverse-muted">
              {page.ctaBody}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-4">
            {(page.ctas ?? []).map((cta) => (
              <ButtonLink key={cta.label} href={cta.href} variant="primary">
                {cta.label}
              </ButtonLink>
            ))}
          </div>
        </Reveal>
      </Section>
    </>
  );
}
