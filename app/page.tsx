import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/section";
import { Eyebrow } from "@/components/eyebrow";
import { ButtonLink } from "@/components/button";
import { Reveal } from "@/components/reveal";
import { Hero } from "@/components/hero";
import { LayeredShowcase } from "@/components/layered-showcase";
import { MarqueeStrip } from "@/components/marquee-strip";
import { HighlightStrip, type HighlightItem } from "@/components/highlight-strip";
import { navLinks, primaryCta, site } from "@/lib/site";
import { getLatestPosts, formatPostDate } from "@/lib/blog";

const highlights: HighlightItem[] = [
  {
    label: "Coaching individual",
    body: "Acompanhamento um-para-um para clarificar objectivos e agir com foco.",
    href: "/servicos",
    image: {
      src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80",
      alt: "Momento de foco e respiração antes do esforço",
    },
  },
  {
    label: "Inteligência emocional",
    body: "Reconhecer e gerir emoções — em ti e na tua equipa.",
    href: "/cursos",
    image: {
      src: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1200&q=80",
      alt: "Atleta em momento de concentração e serenidade",
    },
  },
  {
    label: "Comunicação em campo",
    body: "PNL aplicada ao desporto para treinadores e profissionais.",
    href: "/cursos",
    image: {
      src: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1200&q=80",
      alt: "Treinador a falar com a equipa em campo",
    },
  },
];

export default async function Home() {
  const latest = await getLatestPosts(1);
  const featured = latest[0];

  return (
    <>
      <Hero />

      {/* Layered editorial block — overlapping image panels on top of each other */}
      <Section tone="page">
        <LayeredShowcase
          eyebrow="Uma abordagem que confias"
          title="Mais do que treino mental — um método para agir."
          paragraphs={[
            "O trabalho junta psicologia, PNL e inteligência emocional e traduz tudo em ferramentas concretas. Nada de teoria a mais: sais de cada sessão a saber o que fazer a seguir.",
            "Presencial ou online, com atletas, treinadores e profissionais que preferem resultados a promessas.",
          ]}
          cta={{ label: "Conhecer a Filipa", href: "/sobre" }}
          images={[
            {
              src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80",
              alt: "Momento de foco e respiração antes do esforço",
            },
            {
              src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80",
              alt: "Treino em grupo, energia e concentração partilhadas",
            },
          ]}
        />
      </Section>

      {/* What I do — asymmetric bento grid (one dark feature tile leads) */}
      <Section tone="surface">
        <Reveal>
          <Eyebrow className="mb-4">O que faço</Eyebrow>
          <h2 className="font-display max-w-2xl text-balance text-[clamp(2rem,4vw,3.25rem)] leading-[1.1]">
            Ferramentas concretas para pensar, sentir e agir melhor.
          </h2>
        </Reveal>

        <Reveal className="mt-12">
          <HighlightStrip items={highlights} />
        </Reveal>
      </Section>

      {/* Scrolling headline marquee */}
      <MarqueeStrip text="Coaching & PNL" separator="◆" />

      {/* Quote band */}
      <Section tone="dark" size="lg" narrow className="text-center">
        <Reveal>
          <p className="font-display text-balance text-[clamp(1.75rem,4vw,3rem)] leading-[1.15]">
            “{site.quote}”
          </p>
          <p className="eyebrow mt-6 text-apricot">
            {site.name} — {site.tagline}
          </p>
        </Reveal>
      </Section>

      {/* Blog teaser — latest article */}
      {featured ? (
        <Section tone="page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <Eyebrow className="mb-4">Do blog</Eyebrow>
              <h2 className="font-display max-w-xl text-balance text-[clamp(2rem,4vw,3rem)] leading-[1.1]">
                Ideias para levar contigo.
              </h2>
            </Reveal>
            <Reveal>
              <Link
                href="/blog"
                className="font-body text-sm font-semibold uppercase tracking-[0.06em] text-action-deep underline-offset-4 hover:text-action-hover hover:underline"
              >
                Ver todos os artigos
              </Link>
            </Reveal>
          </div>

          <Reveal className="mt-10">
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid items-center gap-8 border-t border-[color:var(--border-stone)] pt-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-surface-muted">
                <Image
                  src={featured.coverImage.src}
                  alt={featured.coverImage.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.8125rem] uppercase tracking-[0.12em] text-fg-muted">
                  <span className="text-action-deep">{featured.category}</span>
                  <span aria-hidden className="h-3 w-px bg-[color:var(--border-stone)]" />
                  <time dateTime={featured.publishedAt}>
                    {formatPostDate(featured.publishedAt)}
                  </time>
                  <span aria-hidden className="h-3 w-px bg-[color:var(--border-stone)]" />
                  <span>{featured.readingMinutes} min</span>
                </div>
                <h3 className="font-display mt-4 text-balance text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.12]">
                  {featured.title}
                </h3>
                <p className="text-pretty mt-4 max-w-xl leading-relaxed text-fg-muted">
                  {featured.excerpt}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-[0.06em] text-action-deep">
                  Ler artigo
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  >
                    <path
                      d="M1 8h13M9 3l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          </Reveal>
        </Section>
      ) : null}

      {/* CTA */}
      <Section tone="surface" className="text-center">
        <Reveal>
          <h2 className="font-display text-balance text-[clamp(2rem,4vw,3rem)] leading-[1.1]">
            Vamos falar?
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-pretty text-lg text-fg-muted">
            Marca uma conversa e percebe como o coaching e a PNL podem ajudar-te a
            chegar mais longe.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
            <ButtonLink href="/sobre" variant="secondary">
              Conhecer a Filipa
            </ButtonLink>
          </div>
          <nav
            className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[0.9375rem]"
            aria-label="Atalhos"
          >
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-fg-muted underline-offset-4 hover:text-action-deep hover:underline"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </Reveal>
      </Section>
    </>
  );
}
