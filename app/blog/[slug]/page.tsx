import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/section";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/button";
import {
  getAllPosts,
  getPostBySlug,
  formatPostDate,
  type BodyBlock,
} from "@/lib/blog";
import { primaryCta } from "@/lib/site";

// All slugs are known at build time (mock today, Sanity later). Unknown slugs
// 404 rather than rendering on demand.
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Artigo não encontrado" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      images: [{ url: post.coverImage.src }],
    },
  };
}

function BodyContent({ blocks }: { blocks: BodyBlock[] }) {
  return (
    <div className="article-prose space-y-6">
      {blocks.map((block, i) => {
        if (block.type === "heading") {
          return (
            <h2
              key={i}
              className="font-display mt-12 text-balance text-[clamp(1.5rem,3vw,2rem)] leading-[1.15]"
            >
              {block.text}
            </h2>
          );
        }
        if (block.type === "quote") {
          // Pull-quote: raised charcoal panel, orange-dash attribution.
          return (
            <blockquote
              key={i}
              className="my-10 border border-ink-line bg-ink-raised p-8 sm:p-10"
            >
              <p className="text-pretty text-[clamp(1.25rem,2.4vw,1.6rem)] leading-[1.45] text-fg">
                {block.text}
              </p>
              {block.cite ? (
                <footer className="mt-6 flex items-center gap-4">
                  <span aria-hidden className="h-0.5 w-10 shrink-0 bg-action" />
                  <cite className="font-body text-base font-semibold not-italic text-fg">
                    {block.cite}
                  </cite>
                </footer>
              ) : null}
            </blockquote>
          );
        }
        return (
          <p
            key={i}
            className="text-pretty text-[1.125rem] leading-[1.8] text-fg-secondary"
          >
            {block.text}
          </p>
        );
      })}
    </div>
  );
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <PageHero title={post.title} />

      <Section tone="page" narrow>
        <Reveal>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center text-[0.8125rem] uppercase tracking-[0.12em] text-fg-muted">
            <span className="text-action-deep">{post.category}</span>
            <span aria-hidden className="h-3 w-px bg-[color:var(--border-stone)]" />
            <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
            <span aria-hidden className="h-3 w-px bg-[color:var(--border-stone)]" />
            <span>{post.readingMinutes} min de leitura</span>
            <span aria-hidden className="h-3 w-px bg-[color:var(--border-stone)]" />
            <span>{post.author}</span>
          </div>
        </Reveal>

        <Reveal className="mt-10">
          <BodyContent blocks={post.body} />
        </Reveal>

        <Reveal className="mt-16 border-t border-[color:var(--border-stone)] pt-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-2xl leading-tight">
                Vamos passar à ação?
              </p>
              <p className="mt-2 max-w-md text-pretty text-fg-muted">
                Marca uma conversa e adaptamos estas ideias ao teu contexto.
              </p>
            </div>
            <ButtonLink href={primaryCta.href} variant="primary">
              {primaryCta.label}
            </ButtonLink>
          </div>
        </Reveal>

        <div className="mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-[0.06em] text-action-deep hover:text-action-hover"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M15 8H2M7 3L2 8l5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Ver todos os artigos
          </Link>
        </div>
      </Section>
    </>
  );
}
