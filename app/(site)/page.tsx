import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Section } from "@/components/section";
import { Eyebrow } from "@/components/eyebrow";
import { Reveal } from "@/components/reveal";
import { Hero } from "@/components/hero";
import { LayeredShowcase } from "@/components/layered-showcase";
import { MarqueeStrip } from "@/components/marquee-strip";
import { LogoStrip } from "@/components/logo-strip";
import { HighlightStrip, type HighlightItem } from "@/components/highlight-strip";
import { QuoteBand } from "@/components/quote-band";
import { StatsStrip, type Stat } from "@/components/stats-strip";
import { InstagramStrip } from "@/components/instagram-strip";
import { quotes, site } from "@/lib/site";
import { getLatestPosts, formatPostDate } from "@/lib/blog";
import { episodes } from "@/app/(site)/podcast/data";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    type: "website",
  },
};

const latestEpisodes = episodes.slice(0, 3);

// Placeholder figures — replace with Filipa's real numbers.
const stats: Stat[] = [
  {
    value: 150,
    suffix: "+",
    label: "Percursos transformados",
    description:
      "Apoio lado a lado para atletas que querem alinhar a mente com o corpo, da formação ao alto rendimento.",
    cta: { label: "Ver serviços", href: "/servicos" },
  },
  {
    value: 12,
    label: "Anos no terreno",
    description:
      "A ciência da psicologia unida à eficácia da PNL para construir consistência no desporto.",
    cta: { label: "Sobre mim", href: "/sobre" },
  },
  {
    value: 40,
    suffix: "+",
    label: "Formações de impacto",
    description:
      "Treinos mentais coletivos e palestras desenhadas para elevar a cultura competitiva de equipas e clubes.",
    cta: { label: "Marcar conversa", href: "/contactos" },
  },
];

const highlights: HighlightItem[] = [
  {
    label: "Coaching individual",
    body: "O teu plano de jogo focado em resultados.",
    href: "/servicos",
    image: {
      src: "https://images.unsplash.com/photo-1549476464-37392f717541?auto=format&fit=crop&w=1200&q=80",
      alt: "Momento de foco e respiração antes do esforço",
    },
  },
  {
    label: "Inteligência emocional",
    body: "Domínio mental e gestão sob pressão.",
    href: "/cursos",
    image: {
      src: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=1200&q=80",
      alt: "Atleta em momento de concentração e serenidade",
    },
  },
  {
    label: "Comunicação em campo",
    body: "PNL aplicada a líderes, treinadores e equipas.",
    href: "/cursos",
    image: {
      src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1200&q=80",
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

      {/* Trust band — dimmed club logos (mocked) */}
      <LogoStrip />

      {/* Layered editorial block — overlapping image panels on top of each other */}
      <Section tone="page">
        <LayeredShowcase
          eyebrow="Método"
          title="Mais do que treino mental: uma estratégia desenhada à tua medida para entrares em campo e dominares a pressão."
          paragraphs={[
            "Cruzamos a base clínica da Psicologia com a eficácia prática da PNL e da Inteligência Emocional. Sem discursos vazios ou fórmulas prontas: sais de cada sessão com ferramentas reais e um plano claro para saberes exatamente como agir quando o apito soar.",
          ]}
          cta={{ label: "Saber mais", href: "/sobre" }}
          images={[
            {
              src: "https://images.unsplash.com/photo-1595078475328-1ab05d0a6a0e?auto=format&fit=crop&w=1200&q=80",
              alt: "Momento de foco e respiração antes do esforço",
            },
            {
              src: "https://images.unsplash.com/photo-1550345332-09e3ac987658?auto=format&fit=crop&w=1200&q=80",
              alt: "Treino em grupo, energia e concentração partilhadas",
            },
          ]}
        />
      </Section>

      {/* What I do — asymmetric bento grid (one dark feature tile leads) */}
      <Section tone="surface">
        <Reveal>
          <Eyebrow className="mb-4">Serviços</Eyebrow>
          <h2 className="font-display max-w-2xl text-balance text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1]">
            Ferramentas para transformar potencial em resultados.
          </h2>
        </Reveal>

        <Reveal className="mt-12">
          <HighlightStrip items={highlights} />
        </Reveal>
      </Section>

      {/* Scrolling headline marquee */}
      <MarqueeStrip text="performance" separator="◆" reverse={false} outline />

      {/* Stats — numbers count up from zero on scroll */}
      <Section tone="dark">
        <StatsStrip items={stats} />
      </Section>

      {/* Podcast preview — latest 3 episodes */}
      <Section tone="surface">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <Eyebrow className="mb-4">Podcast</Eyebrow>
            <h2 className="font-display max-w-xl text-balance text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1]">
              Conversas para ouvir e aplicar.
            </h2>
          </Reveal>
          <Reveal className="hidden sm:block">
            <Link
              href="/podcast"
              className="font-body text-sm font-semibold uppercase tracking-[0.06em] text-action-deep underline-offset-4 hover:text-action-hover hover:underline"
            >
              Ver todos os episódios
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {latestEpisodes.map((episode, i) => (
            <Reveal key={episode.number} as="article" delay={i * 70}>
              <Link href="/podcast" className="group block">
                <div className="relative aspect-square overflow-hidden bg-surface-muted">
                  <Image
                    src={episode.coverImage.src}
                    alt={episode.coverImage.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.75rem] font-medium uppercase tracking-[0.14em] text-fg-muted">
                  <span className="text-action-deep">Episódio {episode.number}</span>
                  <span aria-hidden className="h-3 w-px bg-[color:var(--border-stone)]" />
                  <span>{episode.duration}</span>
                </div>
                <h3 className="font-body mt-2.5 text-balance text-[clamp(1.125rem,2vw,1.375rem)] font-semibold leading-[1.25] tracking-[-0.01em]">
                  {episode.title}
                </h3>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 sm:hidden">
          <Link
            href="/podcast"
            className="font-body text-sm font-semibold uppercase tracking-[0.06em] text-action-deep underline-offset-4 hover:text-action-hover hover:underline"
          >
            Ver todos os episódios
          </Link>
        </Reveal>
      </Section>

      {/* Quote band — dim copy with cursor spotlight reveal */}
      <Section tone="dark" size="lg">
        <Reveal>
          <QuoteBand
            eyebrow="O que me move"
            quote={quotes.home}
            name={site.name}
          />
        </Reveal>
      </Section>

      {/* Blog teaser — latest article */}
      {featured ? (
        <Section tone="page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <Eyebrow className="mb-4">Blog</Eyebrow>
              <h2 className="font-display max-w-xl text-balance text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1]">
                Estratégias mentais para levares contigo para o campo.
              </h2>
            </Reveal>
            <Reveal className="hidden sm:block">
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

          <Reveal className="mt-10 sm:hidden">
            <Link
              href="/blog"
              className="font-body text-sm font-semibold uppercase tracking-[0.06em] text-action-deep underline-offset-4 hover:text-action-hover hover:underline"
            >
              Ver todos os artigos
            </Link>
          </Reveal>
        </Section>
      ) : null}

      {/* Instagram — full-bleed follow strip with centred badge */}
      <InstagramStrip />
    </>
  );
}
