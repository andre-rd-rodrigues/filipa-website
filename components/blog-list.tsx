import Link from "next/link";
import Image from "next/image";
import { formatPostDate, type BlogPost } from "@/lib/blog";

/**
 * Server-rendered list of blog posts. Used as the Suspense fallback for the
 * client-only BlogExplorer so that every post link is present in the SSR HTML
 * (crawlability). Users with JS get the interactive explorer after hydration.
 */
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

function FeaturedCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-14"
    >
      <div className="relative order-1 aspect-[16/11] overflow-hidden bg-surface-muted lg:order-none">
        <Image
          src={post.coverImage.src}
          alt={post.coverImage.alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover"
        />
      </div>
      <div>
        <PostMeta post={post} />
        <h2 className="font-display mt-4 text-balance text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1]">
          {post.title}
        </h2>
        <p className="text-pretty mt-4 max-w-xl text-lg leading-relaxed text-fg-muted">
          {post.excerpt}
        </p>
        <span className="mt-7 inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-[0.06em] text-action-deep">
          Ler artigo
        </span>
      </div>
    </Link>
  );
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <article className="group relative">
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-muted">
        <Image
          src={post.coverImage.src}
          alt={post.coverImage.alt}
          fill
          sizes="(max-width: 640px) 100vw, 20rem"
          className="object-cover"
        />
      </div>
      <div className="mt-5">
        <PostMeta post={post} />
        <h3 className="font-display mt-3 text-balance text-2xl leading-[1.15]">
          <Link
            href={`/blog/${post.slug}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {post.title}
          </Link>
        </h3>
        <p className="text-pretty mt-3 leading-relaxed text-fg-muted">
          {post.excerpt}
        </p>
      </div>
    </article>
  );
}

export function BlogList({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;
  const [featured, ...rest] = posts;
  return (
    <div>
      <FeaturedCard post={featured} />
      {rest.length > 0 ? (
        <div className="mt-20 grid gap-x-8 gap-y-12 [grid-template-columns:repeat(auto-fill,minmax(min(100%,20rem),1fr))]">
          {rest.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
