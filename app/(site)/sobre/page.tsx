import type { Metadata } from "next";
import { Section } from "@/components/section";
import { Eyebrow } from "@/components/eyebrow";
import { ButtonLink } from "@/components/button";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/page-hero";
import { EditorialImage } from "@/components/editorial-image";
import { primaryCta, quotes, site } from "@/lib/site";
import { buildPersonSchema } from "@/lib/schema";
import { approach, credentials } from "./data";

export const metadata: Metadata = {
  title: "Sobre mim",
  description:
    "Conhece a Filipa Marques: psicóloga do desporto e coach de PNL. Ajudo atletas, treinadores e profissionais a pensar, sentir e agir com foco.",
  alternates: {
    canonical: "/sobre",
  },
  openGraph: {
    title: "Sobre mim",
    description:
      "Conhece a Filipa Marques: psicóloga do desporto e coach de PNL. Ajudo atletas, treinadores e profissionais a pensar, sentir e agir com foco.",
    type: "profile",
    images: [{ url: "/img/profile-1.jpg" }],
  },
};

export default function SobrePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildPersonSchema()),
        }}
      />
      <PageHero title="Sobre mim" />

      {/* Bio — portrait placeholder + warm intro */}
      <Section tone="page">
        <Reveal className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <figure className="m-0">
            <EditorialImage
              src="/img/profile-1.jpg"
              alt="Retrato de Filipa Marques"
              priority
              sizes="(max-width: 1024px) 90vw, 38vw"
            />
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
                Chamo-me Filipa Marques e sou apaixonada pelo potencial humano —
                por tudo o que és capaz de alcançar quando a tua mente joga na tua
                equipa. Como psicóloga do desporto e mental coach, trabalho
                exatamente onde o talento puro já não chega sozinho: na gestão da
                pressão, na manutenção do foco e na forma como pensas quando cada
                segundo conta.
              </p>
              <p>
                Junto a psicologia ao coaching, à Programação Neurolinguística e à
                inteligência emocional para te dar ferramentas práticas: comunicar
                melhor com a equipa, gerir a ansiedade de competição e transformar
                pensamento em ação. Sem discursos vazios, com método.
              </p>
              <p>
                Trabalho com atletas, treinadores e equipas, no desporto e na vida,
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
            Os meus valores
          </Eyebrow>
          <h2 className="font-display text-balance text-[clamp(2rem,4vw,3rem)] leading-[1.1]">
            Três valores que guiam cada sessão.
          </h2>
        </Reveal>

        <Reveal className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {approach.map((item, i) => (
            <div key={item.title} className="flex flex-col">
              <span
                className="font-display text-2xl text-action"
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

      {/* Formação & certificações — heading + image, then bordered credential grid */}
      <Section tone="surface">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <Reveal className="max-w-2xl">
            <Eyebrow className="mb-4">Formação &amp; certificações</Eyebrow>
            <h2 className="font-display text-balance text-[clamp(2rem,4vw,3rem)] leading-[1.1]">
              A base que sustenta o trabalho.
            </h2>
            <p className="mt-5 max-w-lg text-pretty text-lg leading-relaxed text-fg-muted">
              Anos de estudo em psicologia, coaching e PNL ao serviço de uma coisa
              só: ajudar-te a pensar, sentir e agir com foco.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <EditorialImage
              src="/img/profile-3.jpg"
              alt="Filipa Marques em estúdio"
              sizes="(max-width: 1024px) 90vw, 38vw"
            />
          </Reveal>
        </div>

        <Reveal className="mt-14 lg:mt-16">
          <ul className="grid border-l border-t border-border-stone sm:grid-cols-2">
            {credentials.map((item, i) => (
              <li
                key={item.title}
                className="flex flex-col border-b border-r border-border-stone p-8 sm:p-10"
              >
                <span className="font-display text-3xl text-action" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-body text-lg font-semibold tracking-[-0.01em] text-fg">
                  {item.title}
                </h3>
                <p className="text-pretty mt-3 leading-relaxed text-fg-muted">
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
            &ldquo;{quotes.sobre}&rdquo;
          </p>
          <p className="eyebrow mt-6 text-action">
            {site.name}
          </p>
        </Reveal>
      </Section>

      {/* Final CTA */}
      <Section tone="page">
        <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <EditorialImage
              src="/img/profile-2.jpg"
              alt="Filipa Marques com uma bola de futebol"
              sizes="(max-width: 1024px) 90vw, 34vw"
            />
          </Reveal>

          <Reveal delay={80}>
            <h2 className="font-display text-balance text-[clamp(2rem,4vw,3rem)] leading-[1.1]">
              Vamos pôr a tua cabeça a jogar a teu favor?
            </h2>
            <p className="mt-5 max-w-lg text-pretty text-lg text-fg-muted">
              Dá o primeiro passo. Agenda uma conversa sem compromisso e vamos
              descobrir, juntos, como treinar a tua mente para jogares ao teu
              melhor nível — dentro e fora de campo.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
              <ButtonLink href="/servicos" variant="ghost">
                Ver serviços
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
