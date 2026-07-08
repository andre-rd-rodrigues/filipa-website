import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/page-hero";
import { ButtonLink } from "@/components/button";
import { getAllPosts, formatPostDate, type BlogPost } from "@/lib/blog";
import { primaryCta } from "@/lib/site";

export const metadata = {
  title: "Blog",
  description:
    "Artigos sobre coaching, PNL, inteligência emocional e comunicação no desporto. Ferramentas práticas para pensar, sentir e agir melhor.",
};

function PostMeta({ post }: { post: BlogPost }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.8125rem] uppercase tracking-[0.12em] text-fg-muted">
      <span className="text-action-deep">{post.category}</span>
      <span aria-hidden className="h-3 w-px bg-[color:var(--border-stone)]" />
      <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
      <span aria-hidden className="h-3 w-px bg-[color:var(--border-stone)]" />
      <span>{post.readingMinutes} min de leitura</span>
    </div>
  );
}

export default async function BlogPage() {
  const posts = await getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHero title="Blog" />

      {featured ? (
        <Section tone="page">
          {/* Featured post — layered, image overlaps the copy panel */}
          <Reveal>
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-14"
            >
              <div className="relative order-1 aspect-[16/11] overflow-hidden bg-surface-muted lg:order-none">
                <Image
                  src={featured.coverImage.src}
                  alt={featured.coverImage.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                />
              </div>

              <div>
                <span className="eyebrow text-action-deep">Em destaque</span>
                <PostMeta post={featured} />
                <h2 className="font-display mt-4 text-balance text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1]">
                  {featured.title}
                </h2>
                <p className="text-pretty mt-4 max-w-xl text-lg leading-relaxed text-fg-muted">
                  {featured.excerpt}
                </p>
                <span className="mt-7 inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-[0.06em] text-action-deep">
                  Ler artigo
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  >
                    <path
                      d="M1 8h13M9 3l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          </Reveal>

          {/* Remaining posts — breakpoint-free responsive grid */}
          {rest.length > 0 ? (
            <div className="mt-20 grid gap-x-8 gap-y-12 [grid-template-columns:repeat(auto-fill,minmax(min(100%,20rem),1fr))]">
              {rest.map((post, i) => (
                <Reveal key={post.slug} as="article" delay={i * 80}>
                  <Link href={`/blog/${post.slug}`} className="group block">
                    <div className="relative aspect-[4/3] overflow-hidden bg-surface-muted">
                      <Image
                        src={post.coverImage.src}
                        alt={post.coverImage.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, 20rem"
                        className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="mt-5">
                      <PostMeta post={post} />
                      <h3 className="font-display mt-3 text-balance text-2xl leading-[1.15]">
                        {post.title}
                      </h3>
                      <p className="text-pretty mt-3 leading-relaxed text-fg-muted">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal className="mt-16 border-t border-[color:var(--border-stone)] pt-8">
              <p className="max-w-lg text-pretty text-fg-muted">
                Este é o primeiro de muitos. Novos artigos estão a caminho — se
                queres receber os próximos,{" "}
                <Link
                  href={primaryCta.href}
                  className="text-action-deep underline decoration-1 underline-offset-4 hover:text-action-hover"
                >
                  fala comigo
                </Link>
                .
              </p>
            </Reveal>
          )}
        </Section>
      ) : (
        <Section tone="page">
          <p className="text-fg-muted">Ainda não há artigos publicados.</p>
        </Section>
      )}

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
