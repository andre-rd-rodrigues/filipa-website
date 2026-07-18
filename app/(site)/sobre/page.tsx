import type { Metadata } from "next";
import { Section } from "@/components/section";
import { Eyebrow } from "@/components/eyebrow";
import { ButtonLink } from "@/components/button";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/page-hero";
import { EditorialImage } from "@/components/editorial-image";
import { getSiteSettings } from "@/lib/settings";
import { getAboutPage } from "@/lib/pages";
import { buildPersonSchema } from "@/lib/schema";

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAboutPage();
  const description =
    about.seo?.metaDescription ??
    "Conhece a Filipa Marques: mental coach e coach de PNL, especializada em Psicologia do Desporto. Ajudo atletas, treinadores e profissionais a pensar, sentir e agir com foco.";
  return {
    title: about.seo?.metaTitle ?? "Sobre mim",
    description,
    alternates: { canonical: "/sobre" },
    openGraph: {
      title: about.seo?.metaTitle ?? "Sobre mim",
      description,
      type: "profile",
      images: [{ url: about.portrait?.src ?? "/img/profile-1.jpg" }],
    },
  };
}

export default async function SobrePage() {
  const [site, about] = await Promise.all([getSiteSettings(), getAboutPage()]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildPersonSchema(site)),
        }}
      />
      <PageHero title={about.heroTitle ?? "Sobre mim"} />

      {/* Bio — portrait + warm intro */}
      <Section tone="page">
        <Reveal className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          {about.portrait ? (
            <figure className="m-0">
              <EditorialImage
                src={about.portrait.src}
                alt={about.portrait.alt}
                priority
                sizes="(max-width: 1024px) 90vw, 38vw"
              />
              {about.portraitCaption ? (
                <figcaption className="mt-3 text-[0.8125rem] text-fg-muted">
                  {about.portraitCaption}
                </figcaption>
              ) : null}
            </figure>
          ) : (
            <div />
          )}

          <div className="max-w-[60ch]">
            <h2 className="font-display text-balance text-[clamp(2rem,4vw,3rem)] leading-[1.1]">
              {about.bioTitle}
            </h2>
            <div className="text-pretty mt-6 space-y-5 text-lg leading-relaxed text-fg-muted">
              {(about.bioParagraphs ?? []).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Valores — three editorial principles on dark */}
      <Section tone="dark">
        <Reveal className="max-w-2xl">
          <Eyebrow tone="dark" className="mb-4">
            {about.valuesEyebrow}
          </Eyebrow>
          <h2 className="font-display text-balance text-[clamp(2rem,4vw,3rem)] leading-[1.1]">
            {about.valuesTitle}
          </h2>
        </Reveal>

        <Reveal className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {(about.values ?? []).map((item, i) => (
            <div key={item.title} className="flex flex-col">
              <span className="font-display text-2xl text-action" aria-hidden>
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

      {/* Formação & certificações */}
      <Section tone="surface">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <Reveal className="max-w-2xl">
            <Eyebrow className="mb-4">{about.credentialsEyebrow}</Eyebrow>
            <h2 className="font-display text-balance text-[clamp(2rem,4vw,3rem)] leading-[1.1]">
              {about.credentialsTitle}
            </h2>
            {about.credentialsIntro ? (
              <p className="mt-5 max-w-lg text-pretty text-lg leading-relaxed text-fg-muted">
                {about.credentialsIntro}
              </p>
            ) : null}
          </Reveal>

          {about.credentialsImage ? (
            <Reveal delay={80}>
              <EditorialImage
                src={about.credentialsImage.src}
                alt={about.credentialsImage.alt}
                sizes="(max-width: 1024px) 90vw, 38vw"
              />
            </Reveal>
          ) : null}
        </div>

        <Reveal className="mt-14 lg:mt-16">
          <ul className="grid border-l border-t border-border-stone sm:grid-cols-2">
            {(about.credentials ?? []).map((item, i) => (
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
            &ldquo;{site.quotes.sobre}&rdquo;
          </p>
          <p className="eyebrow mt-6 text-action">{site.name}</p>
        </Reveal>
      </Section>

      {/* Final CTA */}
      <Section tone="page">
        <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {about.ctaImage ? (
            <Reveal>
              <EditorialImage
                src={about.ctaImage.src}
                alt={about.ctaImage.alt}
                sizes="(max-width: 1024px) 90vw, 34vw"
              />
            </Reveal>
          ) : (
            <div />
          )}

          <Reveal delay={80}>
            <h2 className="font-display text-balance text-[clamp(2rem,4vw,3rem)] leading-[1.1]">
              {about.ctaTitle}
            </h2>
            {about.ctaBody ? (
              <p className="mt-5 max-w-lg text-pretty text-lg text-fg-muted">
                {about.ctaBody}
              </p>
            ) : null}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              {(about.ctas ?? []).map((cta) => (
                <ButtonLink
                  key={cta.label}
                  href={cta.href}
                  variant={cta.variant === "primary" ? "primary" : "ghost"}
                >
                  {cta.label}
                </ButtonLink>
              ))}
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
