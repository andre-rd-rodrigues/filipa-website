import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/section";
import { PageHero } from "@/components/page-hero";
import { LegalContent } from "@/components/legal-content";
import { getLegalPage } from "@/lib/legal";
import { getSiteSettings } from "@/lib/settings";
import { buildOpenGraph, resolveOgImages } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const [site, page] = await Promise.all([
    getSiteSettings(),
    getLegalPage("privacidade"),
  ]);
  const title =
    page?.seo?.metaTitle ?? page?.title ?? "Política de Privacidade";
  const description =
    page?.seo?.metaDescription ??
    "Como a Filipa Marques — Coaching & PNL trata os teus dados pessoais: formulário de contacto, Google Analytics, base legal, direitos RGPD e contactos.";
  return {
    title,
    description,
    alternates: { canonical: "/privacidade" },
    openGraph: buildOpenGraph({
      title,
      description,
      url: "/privacidade",
      siteName: site.fullName,
      images: resolveOgImages(page?.seo?.ogImage?.src),
    }),
  };
}

export default async function PrivacidadePage() {
  const page = await getLegalPage("privacidade");
  if (!page) notFound();

  return (
    <>
      <PageHero title={page.title} />

      <Section tone="page" narrow>
        {page.lastUpdated ? (
          <p className="eyebrow text-fg-muted">
            Última atualização: {page.lastUpdated}
          </p>
        ) : null}
        <LegalContent value={page.body} cookies={page.cookies} />
      </Section>
    </>
  );
}
