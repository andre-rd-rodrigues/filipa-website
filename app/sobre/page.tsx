import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/section";
import { Eyebrow } from "@/components/eyebrow";
import { ButtonLink } from "@/components/button";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/page-hero";
import { primaryCta, site } from "@/lib/site";
import { approach, credentials } from "./data";

export const metadata: Metadata = {
  title: "Sobre mim",
  description:
    "Conhece a Filipa Marques: psicóloga e coach de PNL para o desporto. Ajudo atletas, treinadores e profissionais a pensar, sentir e agir com foco.",
};

export default function SobrePage() {
  return (
    <>
      <PageHero
        eyebrow="Sobre mim"
        title="Olá, sou a Filipa."
        description="Psicóloga e coach de PNL. Ajudo atletas, treinadores e profissionais do desporto a pensar melhor, sentir com clareza e agir com foco."
      >
        <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
      </PageHero>

      {/* Bio — portrait placeholder + warm intro */}
      <Section tone="page">
        <Reveal className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <figure className="m-0">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-none bg-surface-muted">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80"
                alt="Retrato de Filipa Marques"
                fill
                sizes="(max-width: 1024px) 90vw, 38vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-[0.8125rem] text-fg-muted">
              Foto: Filipa Marques
            </figcaption>
          </figure>

          <div className="max-w-[60ch]">
            <h2 className="font-display text-balance text-[clamp(2rem,4vw,3rem)] leading-[1.1]">
              Trabalho a cabeça de quem vive o desporto.
            </h2>
            <div className="text-pretty mt-6 space-y-5 text-lg leading-relaxed text-fg-muted">
              <p>
                Sou psicóloga e passei os últimos anos a perceber uma coisa
                simples: o talento chega a um ponto — depois é a mente que decide
                o resto. É aí que entro, ao teu lado, para transformar pressão em
                clareza e vontade em ação.
              </p>
              <p>
                Junto a psicologia à Programação Neurolinguística e à inteligência
                emocional para te dar ferramentas práticas: comunicar melhor com a
                equipa, gerir a ansiedade de competição e manter o foco quando o
                resultado aperta. Sem discursos vazios, com método.
              </p>
              <p>
                Trabalho com atletas, treinadores e profissionais do desporto,
                presencialmente e online. Se sentes que podes ir mais longe do que
                aquilo que os resultados mostram, provavelmente temos conversa.
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* A minha abordagem — three editorial principles on dark */}
      <Section tone="dark">
        <Reveal className="max-w-2xl">
          <Eyebrow tone="dark" className="mb-4">
            A minha abordagem
          </Eyebrow>
          <h2 className="font-display text-balance text-[clamp(2rem,4vw,3rem)] leading-[1.1]">
            Três princípios que guiam cada sessão.
          </h2>
        </Reveal>

        <Reveal className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {approach.map((item, i) => (
            <div key={item.title} className="flex flex-col">
              <span
                className="font-display text-2xl text-apricot"
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-body text-xl font-semibold tracking-[-0.01em] text-fg-inverse">
                {item.title}
              </h3>
              <p className="text-pretty mt-3 leading-relaxed text-fg-inverse-muted">
                {item.body}
              </p>
            </div>
          ))}
        </Reveal>
      </Section>

      {/* Percurso & formação — clean editorial list */}
      <Section tone="surface">
        <Reveal className="max-w-2xl">
          <Eyebrow className="mb-4">Percurso &amp; formação</Eyebrow>
          <h2 className="font-display text-balance text-[clamp(2rem,4vw,3rem)] leading-[1.1]">
            A base que sustenta o trabalho.
          </h2>
        </Reveal>

        <Reveal className="mt-12">
          <ul className="max-w-3xl border-t border-[color:var(--border-stone)]">
            {credentials.map((item) => (
              <li
                key={item.title}
                className="grid gap-1.5 border-b border-[color:var(--border-stone)] py-6 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:gap-8"
              >
                <h3 className="font-body text-lg font-semibold tracking-[-0.01em] text-fg">
                  {item.title}
                </h3>
                <p className="text-pretty leading-relaxed text-fg-muted">
                  {item.detail}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* Quote band */}
      <Section tone="dark" size="lg" narrow className="text-center">
        <Reveal>
          <p className="font-display text-balance text-[clamp(1.75rem,4vw,3rem)] leading-[1.15]">
            &ldquo;{site.quote}&rdquo;
          </p>
          <p className="eyebrow mt-6 text-apricot">
            {site.name} — {site.tagline}
          </p>
        </Reveal>
      </Section>

      {/* Final CTA */}
      <Section tone="page" className="text-center">
        <Reveal>
          <h2 className="font-display text-balance text-[clamp(2rem,4vw,3rem)] leading-[1.1]">
            Vamos pôr a tua cabeça a jogar a teu favor?
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-pretty text-lg text-fg-muted">
            Marca uma conversa e vê como o coaching e a PNL te podem ajudar a
            chegar mais longe — dentro e fora de campo.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
            <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
            <ButtonLink href="/servicos" variant="ghost">
              Ver serviços
            </ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
