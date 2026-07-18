import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-pretty text-[1.125rem] leading-[1.8] text-fg-secondary">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="font-display mt-12 text-balance text-[clamp(1.5rem,3vw,2rem)] leading-[1.15]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-body mt-8 text-xl font-semibold tracking-[-0.01em] text-fg">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-2 border-action pl-5 text-pretty text-[1.125rem] leading-[1.7] text-fg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="ml-5 list-disc space-y-2 text-[1.125rem] leading-[1.8] text-fg-secondary">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="ml-5 list-decimal space-y-2 text-[1.125rem] leading-[1.8] text-fg-secondary">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-fg">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    link: ({ children, value }) => (
      <a
        href={(value as { href?: string })?.href ?? "#"}
        className="text-action-deep underline decoration-1 underline-offset-2 hover:text-action-hover"
        {...(String((value as { href?: string })?.href ?? "").startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    ),
  },
  types: {
    calloutQuote: ({ value }) => {
      const v = value as { text?: string; cite?: string };
      return (
        <blockquote className="my-10 border border-ink-line bg-ink-raised p-8 sm:p-10">
          <p className="text-pretty text-[clamp(1.25rem,2.4vw,1.6rem)] leading-[1.45] text-fg">
            {v.text}
          </p>
          {v.cite ? (
            <footer className="mt-6 flex items-center gap-4">
              <span aria-hidden className="h-0.5 w-10 shrink-0 bg-action" />
              <cite className="font-body text-base font-semibold not-italic text-fg">
                {v.cite}
              </cite>
            </footer>
          ) : null}
        </blockquote>
      );
    },
  },
};

/** Renders a blog article's Portable Text body. */
export function ArticleBody({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="article-prose space-y-6">
      <PortableText value={value} components={components} />
    </div>
  );
}
