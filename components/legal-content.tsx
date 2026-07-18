import type { ReactNode } from "react";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { CookieSettingsButton } from "@/components/consent";
import type { CookieRow } from "@/lib/legal";

function LinkMark({
  children,
  value,
}: {
  children: ReactNode;
  value?: { href?: string };
}) {
  const href = value?.href ?? "#";
  if (href.startsWith("/")) {
    return (
      <Link
        href={href}
        className="text-action-deep underline underline-offset-2 hover:text-action-hover"
      >
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-action-deep underline underline-offset-2 hover:text-action-hover"
    >
      {children}
    </a>
  );
}

function CookieTable({ cookies }: { cookies: CookieRow[] }) {
  if (!cookies.length) return null;
  return (
    <div className="mb-4 overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-[color:var(--border-stone)]">
            <th className="py-3 pr-4 font-semibold text-fg">Cookie</th>
            <th className="py-3 pr-4 font-semibold text-fg">Fornecedor</th>
            <th className="py-3 pr-4 font-semibold text-fg">Finalidade</th>
            <th className="py-3 pr-4 font-semibold text-fg">Duração</th>
          </tr>
        </thead>
        <tbody>
          {cookies.map((cookie) => (
            <tr
              key={cookie.name}
              className="border-b border-[color:var(--border-stone)]"
            >
              <td className="py-3 pr-4 font-mono text-fg">{cookie.name}</td>
              <td className="py-3 pr-4 text-fg-muted">{cookie.provider}</td>
              <td className="py-3 pr-4 text-fg-muted">{cookie.purpose}</td>
              <td className="py-3 pr-4 text-fg-muted">{cookie.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Renders a legal page's Portable Text body, including cookie-specific blocks. */
export function LegalContent({
  value,
  cookies = [],
}: {
  value: PortableTextBlock[];
  cookies?: CookieRow[];
}) {
  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => (
        <p className="text-pretty mb-4 leading-relaxed text-fg-muted">{children}</p>
      ),
      h2: ({ children }) => (
        <h2 className="font-display mb-4 mt-12 text-[clamp(1.5rem,3vw,2rem)]">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="mb-3 mt-8 text-lg font-semibold">{children}</h3>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="mb-4 list-disc space-y-2 pl-5 text-fg-muted">{children}</ul>
      ),
    },
    marks: {
      strong: ({ children }) => (
        <strong className="text-fg">{children}</strong>
      ),
      em: ({ children }) => <em>{children}</em>,
      link: LinkMark,
    },
    types: {
      cookieTableBlock: () => <CookieTable cookies={cookies} />,
      cookieSettingsButtonBlock: ({ value: v }) => (
        <div className="mb-4">
          <CookieSettingsButton className="inline-flex items-center rounded-none border border-action bg-transparent px-6 py-3 text-sm font-semibold uppercase tracking-[0.06em] text-action transition-colors hover:border-action hover:bg-action hover:text-fg-inverse">
            {(v as { label?: string })?.label ?? "Alterar preferências de cookies"}
          </CookieSettingsButton>
        </div>
      ),
    },
  };

  return <PortableText value={value} components={components} />;
}
