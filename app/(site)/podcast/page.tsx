import type { ReactNode } from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { Section } from "@/components/section";
import { Eyebrow } from "@/components/eyebrow";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/page-hero";
import { episodes, platforms, type Episode } from "./data";

export const metadata: Metadata = {
  title: "Podcast",
  description:
    "Conversas curtas sobre PNL, inteligência emocional e a mente de quem compete. Episódios práticos de coaching desportivo, em pt-PT, para atletas e treinadores.",
  alternates: {
    canonical: "/podcast",
  },
  openGraph: {
    title: "Podcast",
    description:
      "Conversas curtas sobre PNL, inteligência emocional e a mente de quem compete. Episódios práticos de coaching desportivo, em pt-PT, para atletas e treinadores.",
    type: "website",
  },
};

const [featured, ...rest] = episodes.slice(0, 10);

const platformIcons: Record<string, ReactNode> = {
  Spotify: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-4 w-4 shrink-0">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.623.623 0 0 1-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.622.622 0 1 1-.277-1.215c3.809-.87 7.077-.496 9.712 1.115a.623.623 0 0 1 .207.857zm1.223-2.722a.78.78 0 0 1-1.072.257c-2.687-1.652-6.785-2.131-9.965-1.166a.78.78 0 1 1-.452-1.494c3.632-1.101 8.147-.568 11.232 1.328a.78.78 0 0 1 .257 1.075zm.105-2.835c-3.223-1.914-8.54-2.09-11.618-1.156a.936.936 0 1 1-.542-1.79c3.532-1.072 9.404-.865 13.115 1.338a.936.936 0 0 1-.955 1.608z" />
    </svg>
  ),
  YouTube: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-4 w-4 shrink-0">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.016 3.016 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
};

function PlatformLinks({
  links,
  tone = "light",
}: {
  links: Episode["links"];
  tone?: "light" | "dark";
}) {
  const cls =
    tone === "dark"
      ? "border-white/25 text-fg-inverse hover:border-action hover:text-action"
      : "border-[color:var(--border-stone)] text-fg-secondary hover:border-ink hover:text-fg";
  return (
    <ul className="flex flex-wrap items-center gap-2">
      {links.map((link) => (
        <li key={link.platform}>
          <a
            href={link.href}
            className={`inline-flex items-center gap-2 rounded-none border px-3.5 py-1.5 text-[0.75rem] font-medium uppercase tracking-[0.12em] transition-colors duration-200 ${cls}`}
          >
            {platformIcons[link.platform]}
            {link.platform}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function PodcastPage() {
  return (
    <>
      <PageHero title="Podcast" />

      {/* Featured / latest episode */}
      <Section tone="page">
        <Reveal>
          <Eyebrow className="mb-4">Último episódio</Eyebrow>
        </Reveal>

        <Reveal
          as="article"
          className="grid items-center gap-8 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-14"
        >
          {/* Cover art */}
          <div className="relative aspect-square overflow-hidden rounded-none bg-surface-muted">
            <Image
              src={featured.coverImage.src}
              alt={featured.coverImage.alt}
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 22rem"
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.75rem] font-medium uppercase tracking-[0.14em] text-fg-muted">
              <span className="text-action-deep">Episódio {featured.number}</span>
              <span aria-hidden>·</span>
              <span>{featured.date}</span>
              <span aria-hidden>·</span>
              <span>{featured.duration}</span>
            </div>

            <h2 className="font-display mt-4 text-balance text-[clamp(1.9rem,4vw,3rem)] leading-[1.1]">
              {featured.title}
            </h2>

            <p className="text-pretty mt-4 max-w-xl text-lg leading-relaxed text-fg-muted">
              {featured.description}
            </p>

            <div className="mt-7">
              <PlatformLinks links={featured.links} />
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Episode list */}
      <Section tone="surface" id="episodios">
        <Reveal>
          <Eyebrow className="mb-4">Todos os episódios</Eyebrow>
          <h2 className="font-display max-w-2xl text-balance text-[clamp(2rem,4vw,3.25rem)] leading-[1.1]">
            Ferramentas para pensar, sentir e competir melhor.
          </h2>
        </Reveal>

        <div className="mt-14 border-t border-[color:var(--border-stone)]">
          {rest.map((episode, i) => (
            <Reveal
              key={episode.number}
              as="article"
              delay={i * 70}
              className="grid gap-5 border-b border-[color:var(--border-stone)] py-8 sm:grid-cols-[5rem_1fr] sm:gap-8 sm:py-10"
            >
              {/* Thumbnail */}
              <div className="relative aspect-square w-20 overflow-hidden rounded-none bg-surface-muted">
                <Image
                  src={episode.coverImage.src}
                  alt={episode.coverImage.alt}
                  fill
                  sizes="5rem"
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.75rem] font-medium uppercase tracking-[0.14em] text-fg-muted">
                  <span className="text-action-deep">Episódio {episode.number}</span>
                  <span aria-hidden>·</span>
                  <span>{episode.date}</span>
                  <span aria-hidden>·</span>
                  <span>{episode.duration}</span>
                </div>

                <h3 className="mt-2.5 text-[clamp(1.25rem,2vw,1.5rem)] font-semibold leading-[1.3] tracking-[-0.01em] text-fg">
                  {episode.title}
                </h3>

                <p className="text-pretty mt-3 max-w-2xl leading-relaxed text-fg-muted">
                  {episode.description}
                </p>

                <div className="mt-5">
                  <PlatformLinks links={episode.links} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Subscribe band */}
      <Section tone="dark">
        <Reveal>
          <Eyebrow tone="dark" className="mb-4">
            Ver todos os episódios
          </Eyebrow>
          <h2 className="font-display max-w-2xl text-balance text-[clamp(2rem,4vw,3.25rem)] leading-[1.1]">
            Ouve onde preferes.
          </h2>
          <p className="text-pretty mt-5 max-w-xl text-lg leading-relaxed text-fg-inverse-muted">
            Novos episódios todas as semanas. Segue o podcast na tua plataforma
            e não perdes nenhuma conversa.
          </p>
        </Reveal>

        <Reveal className="mt-9">
          <ul className="flex flex-wrap gap-3">
            {platforms.map((platform) => (
              <li key={platform.name}>
                <a
                  href={platform.href}
                  className="inline-flex items-center gap-2.5 rounded-none border-[1.5px] border-white/25 px-6 py-3 text-sm font-medium uppercase tracking-[0.06em] text-fg-inverse transition-colors duration-200 hover:border-action hover:text-action"
                >
                  {platformIcons[platform.name]}
                  {platform.name}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>
    </>
  );
}
