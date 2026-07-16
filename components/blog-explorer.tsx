"use client";

import { useCallback, useEffect, useId, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Reveal } from "@/components/reveal";
import {
  formatPostDate,
  categorySlug,
  categoryFromSlug,
  type BlogPost,
} from "@/lib/blog";

type SortKey = "recentes" | "antigos" | "leitura";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "recentes", label: "Mais recentes" },
  { value: "antigos", label: "Mais antigos" },
  { value: "leitura", label: "Tempo de leitura" },
];

const DEFAULT_SORT: SortKey = "recentes";

/** Shorter label for the filter chips — drops the redundant "no/do Desporto"
 * tail (the whole blog is about sport). Display only; the underlying category
 * value is kept intact for filtering, slugs, card meta and schema. */
function chipLabel(category: string): string {
  return category.replace(/\s+(no|do)\s+Desporto$/i, "").trim();
}

/** Strip accents + lowercase for forgiving, diacritics-insensitive search. */
function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function SearchIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function ClearIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

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

/** Grid card meta with the category rendered as a filter button (stretched
 * link keeps the whole card navigable while the chip stays clickable). */
function PostCardMeta({
  post,
  onCategory,
}: {
  post: BlogPost;
  onCategory: (category: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.8125rem] uppercase tracking-[0.12em] text-fg-muted">
      <button
        type="button"
        onClick={() => onCategory(post.category)}
        className="relative z-10 text-action-deep transition-colors hover:text-action-hover"
      >
        {post.category}
      </button>
      <span aria-hidden className="h-3 w-px bg-[color:var(--border-stone)]" />
      <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
      <span aria-hidden className="h-3 w-px bg-[color:var(--border-stone)]" />
      <span>{post.readingMinutes} min de leitura</span>
    </div>
  );
}

function FeaturedCard({ post }: { post: BlogPost }) {
  return (
    <Reveal>
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
            className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
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
  );
}

function PostCard({
  post,
  index,
  onCategory,
}: {
  post: BlogPost;
  index: number;
  onCategory: (category: string) => void;
}) {
  return (
    <Reveal as="article" delay={index * 80}>
      <div className="group relative">
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
          <PostCardMeta post={post} onCategory={onCategory} />
          <h3 className="font-display mt-3 text-balance text-2xl leading-[1.15]">
            <Link
              href={`/blog/${post.slug}`}
              className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action"
            >
              {post.title}
            </Link>
          </h3>
          <p className="text-pretty mt-3 leading-relaxed text-fg-muted">
            {post.excerpt}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

export function BlogExplorer({
  posts,
  categories,
}: {
  posts: BlogPost[];
  categories: string[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const uid = useId();

  const q = searchParams.get("q") ?? "";
  const categoriaSlug = searchParams.get("categoria") ?? "";
  const ordemParam = searchParams.get("ordem");
  const ordem: SortKey = SORT_OPTIONS.some((o) => o.value === ordemParam)
    ? (ordemParam as SortKey)
    : DEFAULT_SORT;

  const activeCategory = categoryFromSlug(categoriaSlug, categories);

  // Local, instant search value; the URL is updated (debounced) behind it.
  const [search, setSearch] = useState(q);

  // Reflect external URL changes (back/forward, category chip on a card).
  useEffect(() => {
    setSearch(q);
  }, [q]);

  const updateParams = useCallback(
    (next: Record<string, string | null>) => {
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      for (const [key, value] of Object.entries(next)) {
        if (value === null || value === "") params.delete(key);
        else params.set(key, value);
      }
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  // Debounce writing the search term to the URL.
  useEffect(() => {
    if (search === q) return;
    const handle = setTimeout(() => {
      updateParams({ q: search.trim() || null });
    }, 250);
    return () => clearTimeout(handle);
  }, [search, q, updateParams]);

  const setCategory = useCallback(
    (category: string | null) => {
      updateParams({ categoria: category ? categorySlug(category) : null });
    },
    [updateParams],
  );

  const setOrdem = useCallback(
    (value: SortKey) => {
      updateParams({ ordem: value === DEFAULT_SORT ? null : value });
    },
    [updateParams],
  );

  const clearAll = useCallback(() => {
    setSearch("");
    router.replace(pathname, { scroll: false });
  }, [router, pathname]);

  const trimmedSearch = search.trim();

  const filtered = useMemo(() => {
    let list = posts;
    if (activeCategory) {
      list = list.filter((p) => p.category === activeCategory);
    }
    const nq = normalize(trimmedSearch);
    if (nq) {
      list = list.filter(
        (p) =>
          normalize(p.title).includes(nq) || normalize(p.excerpt).includes(nq),
      );
    }
    const sorted = [...list];
    sorted.sort((a, b) => {
      if (ordem === "antigos") {
        return +new Date(a.publishedAt) - +new Date(b.publishedAt);
      }
      if (ordem === "leitura") {
        return (
          a.readingMinutes - b.readingMinutes ||
          +new Date(b.publishedAt) - +new Date(a.publishedAt)
        );
      }
      return +new Date(b.publishedAt) - +new Date(a.publishedAt);
    });
    return sorted;
  }, [posts, activeCategory, trimmedSearch, ordem]);

  const isDefaultView =
    !activeCategory && !trimmedSearch && ordem === DEFAULT_SORT;
  const hasFilters = Boolean(activeCategory) || Boolean(trimmedSearch);

  const searchId = `${uid}-search`;
  const sortId = `${uid}-sort`;

  return (
    <div>
      {/* Filter bar */}
      <search className="flex flex-col gap-8">
        {/* Search + sort row */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="w-full sm:max-w-sm">
            <label htmlFor={searchId} className="sr-only">
              Pesquisar artigos
            </label>
            <div className="flex items-center gap-3 border-b border-[color:var(--border-stone)] pb-3 transition-colors duration-200 focus-within:border-action">
              <span aria-hidden className="shrink-0 text-fg-muted">
                <SearchIcon />
              </span>
              <input
                id={searchId}
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Pesquisar artigos"
                className="min-w-0 flex-1 bg-transparent font-body text-[1.0625rem] text-fg placeholder:text-fg-muted focus:outline-none [&::-webkit-search-cancel-button]:appearance-none"
              />
              {search ? (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Limpar pesquisa"
                  className="shrink-0 text-fg-muted transition-colors hover:text-action"
                >
                  <ClearIcon />
                </button>
              ) : null}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label
              htmlFor={sortId}
              className="shrink-0 font-body text-[0.8125rem] uppercase tracking-[0.12em] text-fg-muted"
            >
              Ordenar
            </label>
            <select
              id={sortId}
              value={ordem}
              onChange={(e) => setOrdem(e.target.value as SortKey)}
              className="cursor-pointer rounded-none border border-[color:var(--border-stone)] bg-transparent px-4 py-2.5 font-body text-[0.9375rem] text-fg transition-colors hover:border-action focus:border-action focus:outline-none"
            >
              {SORT_OPTIONS.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className="bg-surface text-fg"
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap items-center gap-2.5">
          <CategoryChip
            active={!activeCategory}
            onClick={() => setCategory(null)}
          >
            Todos
          </CategoryChip>
          {categories.map((category) => (
            <CategoryChip
              key={category}
              active={activeCategory === category}
              onClick={() => setCategory(category)}
            >
              {chipLabel(category)}
            </CategoryChip>
          ))}
        </div>
      </search>

      {/* Results count (announced) */}
      <p
        aria-live="polite"
        className="mt-8 font-body text-[0.8125rem] uppercase tracking-[0.12em] text-fg-muted"
      >
        {filtered.length} {filtered.length === 1 ? "artigo" : "artigos"}
      </p>

      {/* Results */}
      {filtered.length === 0 ? (
        <Reveal className="mt-10 border-t border-[color:var(--border-stone)] pt-12 text-center">
          <p className="font-display text-2xl leading-tight">
            Não encontrámos artigos para esta pesquisa.
          </p>
          <p className="text-pretty mx-auto mt-3 max-w-md text-fg-muted">
            Experimenta outra palavra-chave ou limpa os filtros para ver todos
            os artigos.
          </p>
          <button
            type="button"
            onClick={clearAll}
            className="mt-6 inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-[0.06em] text-action-deep transition-colors hover:text-action-hover"
          >
            Limpar filtros
          </button>
        </Reveal>
      ) : isDefaultView ? (
        <div className="mt-6">
          <FeaturedCard post={filtered[0]} />
          {filtered.length > 1 ? (
            <div className="mt-20 grid gap-x-8 gap-y-12 [grid-template-columns:repeat(auto-fill,minmax(min(100%,20rem),1fr))]">
              {filtered.slice(1).map((post, i) => (
                <PostCard
                  key={post.slug}
                  post={post}
                  index={i}
                  onCategory={setCategory}
                />
              ))}
            </div>
          ) : null}
        </div>
      ) : (
        <div className="mt-10 grid gap-x-8 gap-y-12 [grid-template-columns:repeat(auto-fill,minmax(min(100%,20rem),1fr))]">
          {filtered.map((post, i) => (
            <PostCard
              key={post.slug}
              post={post}
              index={i}
              onCategory={setCategory}
            />
          ))}
        </div>
      )}

      {hasFilters && filtered.length > 0 ? (
        <div className="mt-12">
          <button
            type="button"
            onClick={clearAll}
            className="inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-[0.06em] text-action-deep transition-colors hover:text-action-hover"
          >
            Limpar filtros
          </button>
        </div>
      ) : null}
    </div>
  );
}

function CategoryChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-none border px-4 py-2 font-body text-[0.8125rem] font-semibold uppercase tracking-[0.08em] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action ${
        active
          ? "border-action bg-action text-fg-inverse"
          : "border-[color:var(--border-stone)] text-fg-muted hover:border-action hover:text-action"
      }`}
    >
      {children}
    </button>
  );
}
