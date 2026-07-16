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
    "Conhece a Filipa Marques: mental coach e coach de PNL, especializada em Psicologia do Desporto. Ajudo atletas, treinadores e profissionais a pensar, sentir e agir com foco.",
  alternates: {
    canonical: "/sobre",
  },
  openGraph: {
    title: "Sobre mim",
    description:
      "Conhece a Filipa Marques: mental coach e coach de PNL, especializada em Psicologia do Desporto. Ajudo atletas, treinadores e profissionais a pensar, sentir e agir com foco.",
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
              Trabalho a mente de quem vive o desporto.
            </h2>
            <div className="text-pretty mt-6 space-y-5 text-lg leading-relaxed text-fg-muted">
              <p>
                Chamo-me Filipa Marques e sou apaixonada pelo potencial humano,
                por tudo o que és capaz de alcançar quando a tua mente joga na tua
                equipa. Como mental coach especializada em desporto,
                trabalho exatamente onde o talento puro já não chega sozinho: na gestão da
                pressão, na manutenção do foco e na forma como pensas quando cada
                segundo conta.
              </p>
              <p>
                Junto a Psicologia ao coaching, à Programação Neurolinguística e à
                inteligência emocional para te dar ferramentas práticas: comunicar
                melhor com a equipa, gerir a ansiedade de competição e transformar
                pensamento em ação.
              </p>
              <p>
                Trabalho com atletas, treinadores, dirigentes desportivos e equipas,
                no desporto e na vida, presencialmente e online. Se sentes que podes
                ir mais longe do que aquilo que os resultados mostram.
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
              Anos de estudo em Psicologia do Desporto, coaching e PNL ao serviço
              de uma coisa só: ajudar-te a pensar, sentir e agir com foco.
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
                <div className="flex items-center justify-between">
                  <CredentialIcon type={item.type} />
                  <span className="font-display text-sm text-fg-muted/40" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
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
              Vamos pôr a tua mente a jogar a teu favor?
            </h2>
            <p className="mt-5 max-w-lg text-pretty text-lg text-fg-muted">
              Dá o primeiro passo. Agenda uma conversa sem compromisso e vamos
              descobrir, juntos, como te posso ajudar a treinar a tua mente para
              jogares ao teu melhor nível, dentro e fora de campo.
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

function CredentialIcon({ type }: { type: "licenciatura" | "pos-graduacao" | "certificacao" }) {
  if (type === "licenciatura") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-8 w-8 text-action"
        aria-hidden
      >
        <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
        <path d="M22 10v6" />
        <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
      </svg>
    );
  }

  if (type === "pos-graduacao") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-8 w-8 text-action"
        aria-hidden
      >
        <path d="M12 7v14" />
        <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-8 w-8 text-action"
      aria-hidden
    >
      <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
      <circle cx="12" cy="8" r="6" />
    </svg>
  );
}
