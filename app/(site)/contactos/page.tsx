import type { Metadata } from "next";
import { Section } from "@/components/section";
import { Eyebrow } from "@/components/eyebrow";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/page-hero";
import { ButtonLink } from "@/components/button";
import { FaqAccordion } from "@/components/faq-accordion";
import { EditorialImage } from "@/components/editorial-image";
import { getSiteSettings } from "@/lib/settings";
import { getContactPage } from "@/lib/pages";
import { ContactForm } from "./contact-form";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContactPage();
  const description =
    page.seo?.metaDescription ??
    "Marca uma conversa com a Filipa Marques. Coaching, PNL e inteligência emocional para o desporto: por telefone, email ou formulário. Respondo em breve.";
  return {
    title: page.seo?.metaTitle ?? "Contactos",
    description,
    alternates: { canonical: "/contactos" },
    openGraph: {
      title: page.seo?.metaTitle ?? "Contactos",
      description,
      type: "website",
    },
  };
}

export default async function ContactosPage() {
  const [site, page] = await Promise.all([getSiteSettings(), getContactPage()]);
  const { contact, socials } = site;

  return (
    <>
      <PageHero title={page.heroTitle ?? "Contactos"} />

      <Section tone="page" id="form">
        <div className="grid gap-x-14 gap-y-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          {/* LEFT — the form */}
          <Reveal>
            <Eyebrow className="mb-4">{page.formEyebrow}</Eyebrow>
            <h2 className="font-display text-balance text-[clamp(2rem,4vw,3rem)] leading-[1.1]">
              {page.formTitle}
            </h2>
            <p className="text-pretty mt-4 max-w-lg text-lg leading-relaxed text-fg-muted">
              {page.formBody}
            </p>
            <div className="mt-10">
              <ContactForm />
            </div>
          </Reveal>

          {/* RIGHT — profile image + direct contact details */}
          <Reveal delay={80}>
            <div className="lg:pl-2">
              {page.directImage ? (
                <EditorialImage
                  src={page.directImage.src}
                  alt={page.directImage.alt}
                  ornament="hatch"
                  sizes="(max-width: 1024px) 90vw, 38vw"
                  className="mb-10"
                />
              ) : null}

              <h3 className="eyebrow text-fg-muted">{page.directTitle}</h3>

              <dl className="mt-6 space-y-6">
                <div className="border-t border-[color:var(--border-stone)] pt-5">
                  <dt className="text-sm font-medium text-fg-secondary">Telefone</dt>
                  <dd className="mt-1">
                    <a
                      href={contact.phoneHref}
                      className="text-[1.0625rem] text-fg transition-colors hover:text-action-deep"
                    >
                      {contact.phone}
                    </a>
                  </dd>
                </div>

                <div className="border-t border-[color:var(--border-stone)] pt-5">
                  <dt className="text-sm font-medium text-fg-secondary">Email</dt>
                  <dd className="mt-1">
                    <a
                      href={contact.emailHref}
                      className="break-words text-[1.0625rem] text-fg transition-colors hover:text-action-deep"
                    >
                      {contact.email}
                    </a>
                  </dd>
                </div>

                <div className="border-t border-[color:var(--border-stone)] pt-5">
                  <dt className="text-sm font-medium text-fg-secondary">Onde</dt>
                  <dd className="mt-1 text-[1.0625rem] text-fg">{contact.location}</dd>
                </div>
              </dl>

              {page.directNote ? (
                <p className="text-pretty mt-8 max-w-sm text-[0.9375rem] leading-relaxed text-fg-muted">
                  {page.directNote}
                </p>
              ) : null}

              <div className="mt-10 border-t border-[color:var(--border-stone)] pt-6">
                <h3 className="eyebrow text-fg-muted">{page.socialTitle}</h3>
                <ul className="mt-4 space-y-3">
                  {socials.map((social) => (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-baseline gap-2 text-[1.0625rem] text-fg transition-colors hover:text-action-deep"
                      >
                        <span className="font-medium">{social.label}</span>
                        <span className="text-[0.9375rem] text-fg-muted transition-colors group-hover:text-action-deep">
                          {social.handle}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* FAQ — accordion over dark band */}
      <Section tone="dark">
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          {/* LEFT — intro + CTA */}
          <Reveal>
            <Eyebrow tone="dark" className="mb-4">
              {page.faqEyebrow}
            </Eyebrow>
            <h2 className="font-display text-balance text-[clamp(2rem,4vw,3rem)] leading-[1.1] text-fg-inverse">
              {page.faqTitle}
            </h2>
            <p className="text-pretty mt-4 max-w-md text-lg leading-relaxed text-fg-inverse-muted">
              {page.faqBody}
            </p>
            {page.faqCtaLabel ? (
              <ButtonLink href="#form" className="mt-8">
                {page.faqCtaLabel}
              </ButtonLink>
            ) : null}
          </Reveal>

          {/* RIGHT — accordion */}
          <Reveal delay={80}>
            <FaqAccordion items={page.faqs ?? []} name="contact-faq" />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
