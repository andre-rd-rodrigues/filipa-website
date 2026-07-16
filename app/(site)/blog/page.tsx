import { Suspense } from "react";
import type { Metadata } from "next";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/page-hero";
import { ButtonLink } from "@/components/button";
import { BlogExplorer } from "@/components/blog-explorer";
import { getAllPosts, getAllCategories } from "@/lib/blog";
import { primaryCta } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artigos sobre coaching, PNL, inteligência emocional e comunicação no desporto. Ferramentas práticas para pensar, sentir e agir melhor.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog",
    description:
      "Artigos sobre coaching, PNL, inteligência emocional e comunicação no desporto. Ferramentas práticas para pensar, sentir e agir melhor.",
    type: "website",
  },
};

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
  ]);

  return (
    <>
      <PageHero title="Blog" />

      <Section tone="page">
        {posts.length > 0 ? (
          <Suspense fallback={null}>
            <BlogExplorer posts={posts} categories={categories} />
          </Suspense>
        ) : (
          <p className="text-fg-muted">Ainda não há artigos publicados.</p>
        )}
      </Section>

      {/* CTA */}
      <Section tone="ink">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <h2 className="font-display text-balance text-[clamp(2rem,4vw,3rem)] leading-[1.1]">
              Queres aplicar isto ao teu contexto?
            </h2>
            <p className="text-pretty mt-5 max-w-xl text-lg leading-relaxed text-fg-inverse-muted">
              Marca uma conversa e transformamos estas ideias em ferramentas para
              o teu treino, a tua equipa ou a tua carreira.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-4">
            <ButtonLink href={primaryCta.href} variant="primary">
              {primaryCta.label}
            </ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
