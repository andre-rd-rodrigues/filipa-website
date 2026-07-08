import Image from "next/image";
import { Section } from "@/components/section";
import { Eyebrow } from "@/components/eyebrow";
import { ButtonLink } from "@/components/button";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/page-hero";
import { primaryCta } from "@/lib/site";
import { episodes, platforms, type Episode } from "./data";

export const metadata = {
  title: "Podcast",
  description:
    "Conversas curtas sobre PNL, inteligência emocional e a mente de quem compete. Episódios práticos de coaching desportivo, em pt-PT, para atletas e treinadores.",
};

const [featured, ...rest] = episodes;

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
            className={`inline-flex items-center rounded-none border px-3.5 py-1.5 text-[0.75rem] font-medium uppercase tracking-[0.12em] transition-colors duration-200 ${cls}`}
          >
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
            Subscrever
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
                  className="inline-flex items-center rounded-none border-[1.5px] border-white/25 px-6 py-3 text-sm font-medium uppercase tracking-[0.06em] text-fg-inverse transition-colors duration-200 hover:border-action hover:text-action"
                >
                  {platform.name}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* Final CTA */}
      <Section tone="ink">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <h2 className="font-display text-balance text-[clamp(2rem,4vw,3rem)] leading-[1.1]">
              Queres levar isto para o teu contexto?
            </h2>
            <p className="text-pretty mt-5 max-w-xl text-lg leading-relaxed text-fg-inverse-muted">
              O que ouves aqui aplica-se ao teu treino, à tua equipa e à tua
              cabeça. Marca uma conversa e trabalhamos o que é teu — sem
              compromisso.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-4">
            <ButtonLink href={primaryCta.href} variant="primary">
              {primaryCta.label}
            </ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
