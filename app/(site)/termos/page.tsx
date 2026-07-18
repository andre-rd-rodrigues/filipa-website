import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/section";
import { PageHero } from "@/components/page-hero";
import { LegalContent } from "@/components/legal-content";
import { getLegalPage } from "@/lib/legal";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLegalPage("termos");
  const description =
    page?.seo?.metaDescription ??
    "Termos e condições de utilização do site da Filipa Marques — Coaching & PNL: objeto, propriedade intelectual, isenção de responsabilidade e lei aplicável.";
  return {
    title: page?.seo?.metaTitle ?? page?.title ?? "Termos e Condições",
    description,
    alternates: { canonical: "/termos" },
    openGraph: {
      title: page?.seo?.metaTitle ?? page?.title ?? "Termos e Condições",
      description,
      type: "website",
    },
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
