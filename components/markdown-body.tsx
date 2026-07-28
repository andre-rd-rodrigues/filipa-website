import type { Components } from "react-markdown";
import Markdown from "react-markdown";

const components: Components = {
  p: ({ children }) => <p className="text-pretty">{children}</p>,
  strong: ({ children }) => (
    <strong className="font-semibold text-fg">{children}</strong>
  ),
  em: ({ children }) => <em>{children}</em>,
  a: ({ children, href }) => (
    <a
      href={href ?? "#"}
      className="text-action-deep underline decoration-1 underline-offset-2 hover:text-action-hover"
      {...(String(href ?? "").startsWith("http")
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {children}
    </a>
  ),
};

/** Renders simple markdown prose (paragraphs + inline marks) with site typography. */
export function MarkdownBody({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  if (!children.trim()) return null;

  return (
    <div className={className}>
      <Markdown components={components}>{children}</Markdown>
    </div>
  );
}
