import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/section";
import { PageHero } from "@/components/page-hero";
import { LegalContent } from "@/components/legal-content";
import { getLegalPage } from "@/lib/legal";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLegalPage("privacidade");
  const description =
    page?.seo?.metaDescription ??
    "Como a Filipa Marques — Coaching & PNL trata os teus dados pessoais: formulário de contacto, Google Analytics, base legal, direitos RGPD e contactos.";
  return pageMetadata({
    title: page?.seo?.metaTitle ?? page?.title ?? "Política de Privacidade",
    description,
    path: "/privacidade",
    ogImageSrc: page?.seo?.ogImage?.src,
  });
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
