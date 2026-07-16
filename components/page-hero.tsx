import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";

/**
 * Minimal interior page title — centred heading with a Home breadcrumb
 * (orange square separator). Sits under the fixed header; no background image.
 * An optional round logo can sit above the title (e.g. a podcast cover).
 */
export function PageHero({
  title,
  breadcrumb,
  parent,
  logo,
}: {
  title: string;
  breadcrumb?: string;
  /** Parent breadcrumb crumb. Defaults to the site root ("Início"). */
  parent?: { label: string; href: string };
  /** Optional round logo shown above the title. */
  logo?: { src: string; alt: string };
}) {
  const current = breadcrumb ?? title;
  const root = parent ?? { label: "Início", href: "/" };

  return (
    <section className="text-center">
      <Container className="pb-[clamp(2.5rem,5vw,4rem)] pt-[clamp(7rem,14vw,9.5rem)]">
        {logo ? (
          <span className="mx-auto mb-6 block size-20 overflow-hidden rounded-full border border-[color:var(--border-stone)] shadow-sm sm:size-28">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={112}
              height={112}
              priority
              className="size-full object-cover"
            />
          </span>
        ) : null}
        <h1 className="font-display text-balance text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.02em]">
          {title}
        </h1>
        <nav
          aria-label="Breadcrumb"
          className="eyebrow mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-fg-muted"
        >
          <Link href={root.href} className="transition-colors hover:text-action">
            {root.label}
          </Link>
          <span aria-hidden className="inline-block size-2 shrink-0 bg-action" />
          <span className="text-fg-secondary" aria-current="page">
            {current}
          </span>
        </nav>
      </Container>
    </section>
  );
}
