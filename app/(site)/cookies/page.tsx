import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/section";
import { PageHero } from "@/components/page-hero";
import { LegalContent } from "@/components/legal-content";
import { getLegalPage } from "@/lib/legal";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLegalPage("cookies");
  const description =
    page?.seo?.metaDescription ??
    "O que são cookies, como este site usa cookies do Google Analytics apenas após consentimento, os tipos utilizados e como gerir a tua preferência.";
  return pageMetadata({
    title: page?.seo?.metaTitle ?? page?.title ?? "Política de Cookies",
    description,
    path: "/cookies",
    ogImageSrc: page?.seo?.ogImage?.src,
  });
}

export default async function CookiesPage() {
  const page = await getLegalPage("cookies");
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
