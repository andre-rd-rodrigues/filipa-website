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
    getLegalPage("termos"),
  ]);
  const title = page?.seo?.metaTitle ?? page?.title ?? "Termos e Condições";
  const description =
    page?.seo?.metaDescription ??
    "Termos e condições de utilização do site da Filipa Marques — Coaching & PNL: objeto, propriedade intelectual, isenção de responsabilidade e lei aplicável.";
  return {
    title,
    description,
    alternates: { canonical: "/termos" },
    openGraph: buildOpenGraph({
      title,
      description,
      url: "/termos",
      siteName: site.fullName,
      images: resolveOgImages(page?.seo?.ogImage?.src),
    }),
  };
}

export default async function TermosPage() {
  const page = await getLegalPage("termos");
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
