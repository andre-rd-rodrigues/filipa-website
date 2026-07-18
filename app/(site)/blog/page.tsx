import { Suspense } from "react";
import type { Metadata } from "next";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/page-hero";
import { ButtonLink } from "@/components/button";
import { BlogExplorer } from "@/components/blog-explorer";
import { getAllPosts, getAllCategories } from "@/lib/blog";
import { getBlogPage } from "@/lib/pages";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getBlogPage();
  const description =
    page.seo?.metaDescription ??
    "Artigos sobre coaching, PNL, inteligência emocional e comunicação no desporto. Ferramentas práticas para pensar, sentir e agir melhor.";
  return {
    title: page.seo?.metaTitle ?? "Blog",
    description,
    alternates: { canonical: "/blog" },
    openGraph: {
      title: page.seo?.metaTitle ?? "Blog",
      description,
      type: "website",
    },
  };
}

export default async function BlogPage() {
  const [page, posts, categories] = await Promise.all([
    getBlogPage(),
    getAllPosts(),
    getAllCategories(),
  ]);

  return (
    <>
      <PageHero title={page.heroTitle ?? "Blog"} />

      <Section tone="page">
        {posts.length > 0 ? (
          <Suspense fallback={null}>
            <BlogExplorer posts={posts} categories={categories} />
          </Suspense>
        ) : (
          <p className="text-fg-muted">
            {page.emptyState ?? "Ainda não há artigos publicados."}
          </p>
        )}
      </Section>

      {/* CTA */}
      <Section tone="ink">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <h2 className="font-display text-balance text-[clamp(2rem,4vw,3rem)] leading-[1.1]">
              {page.ctaTitle}
            </h2>
            <p className="text-pretty mt-5 max-w-xl text-lg leading-relaxed text-fg-inverse-muted">
              {page.ctaBody}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-4">
            {(page.ctas ?? []).map((cta) => (
              <ButtonLink key={cta.label} href={cta.href} variant="primary">
                {cta.label}
              </ButtonLink>
            ))}
          </div>
        </Reveal>
      </Section>
    </>
  );
}
