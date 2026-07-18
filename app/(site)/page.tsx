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
import { HighlightStrip } from "@/components/highlight-strip";
import { QuoteBand } from "@/components/quote-band";
import { StatsStrip } from "@/components/stats-strip";
import { InstagramStrip } from "@/components/instagram-strip";
import { getSiteSettings } from "@/lib/settings";
import { getHomePage } from "@/lib/pages";
import { getLatestPosts, formatPostDate } from "@/lib/blog";
import { getLatestEpisodes } from "@/lib/podcast";

export async function generateMetadata(): Promise<Metadata> {
  const [site, home] = await Promise.all([getSiteSettings(), getHomePage()]);
  return {
    alternates: { canonical: "/" },
    openGraph: {
      title: home.seo?.metaTitle ?? `${site.name} | ${site.tagline}`,
      description: home.seo?.metaDescription ?? site.description,
      type: "website",
    },
  };
}

export default async function Home() {
  const [site, home, latest, latestEpisodes] = await Promise.all([
    getSiteSettings(),
    getHomePage(),
    getLatestPosts(1),
    getLatestEpisodes(3),
  ]);
  const featured = latest[0];
  const instagram = site.socials.find((s) => s.label === "Instagram");

  return (
    <>
      <Hero
        backdropWord={home.heroBackdropWord}
        eyebrow={home.heroEyebrow}
        ctas={home.heroCtas}
      />

      {/* Trust band — dimmed club logos (mocked) */}
      <LogoStrip />

      {/* Layered editorial block — overlapping image panels on top of each other */}
      <Section tone="page">
        <LayeredShowcase
          eyebrow={home.methodEyebrow ?? ""}
          title={home.methodTitle ?? ""}
          paragraphs={home.methodParagraphs ?? []}
          cta={home.methodCta ? { label: home.methodCta.label, href: home.methodCta.href } : undefined}
          images={
            (home.methodImages ?? []).slice(0, 2) as [
              { src: string; alt: string },
              { src: string; alt: string },
            ]
          }
        />
      </Section>

      {/* What I do — asymmetric bento grid (one dark feature tile leads) */}
      <Section tone="surface">
        <Reveal>
          <Eyebrow className="mb-4">{home.servicesEyebrow}</Eyebrow>
          <h2 className="font-display max-w-2xl text-balance text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1]">
            {home.servicesTitle}
          </h2>
        </Reveal>

        <Reveal className="mt-12">
          <HighlightStrip items={home.highlights ?? []} />
        </Reveal>
      </Section>

      {/* Scrolling headline marquee */}
      <MarqueeStrip text={home.marqueeText ?? "performance"} separator="◆" reverse={false} outline />

      {/* Stats — numbers count up from zero on scroll */}
      <Section tone="dark">
        <StatsStrip items={home.stats ?? []} />
      </Section>

      {/* Podcast preview — latest 3 episodes */}
      <Section tone="surface">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <Eyebrow className="mb-4">{home.podcastEyebrow}</Eyebrow>
            <h2 className="font-display max-w-xl text-balance text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1]">
              {home.podcastTitle}
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
                <div className="relative aspect-video w-full overflow-hidden bg-surface-muted">
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
            eyebrow={home.quoteEyebrow ?? ""}
            quote={site.quotes.home}
            name={site.name}
          />
        </Reveal>
      </Section>

      {/* Blog teaser — latest article */}
      {featured ? (
        <Section tone="page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <Eyebrow className="mb-4">{home.blogEyebrow}</Eyebrow>
              <h2 className="font-display max-w-xl text-balance text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1]">
                {home.blogTitle}
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
      {instagram ? (
        <InstagramStrip
          images={home.instagramImages ?? []}
          href={instagram.href}
          handle={instagram.handle}
        />
      ) : null}
    </>
  );
}
