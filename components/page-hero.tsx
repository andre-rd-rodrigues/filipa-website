import Link from "next/link";
import { Container } from "@/components/container";

/**
 * Minimal interior page title — centred heading with a Home breadcrumb
 * (orange square separator). Sits under the fixed header; no background image.
 */
export function PageHero({
  title,
  breadcrumb,
}: {
  title: string;
  breadcrumb?: string;
}) {
  const current = breadcrumb ?? title;

  return (
    <section className="text-center">
      <Container className="pb-[clamp(2.5rem,5vw,4rem)] pt-[clamp(7rem,14vw,9.5rem)]">
        <h1 className="font-display text-balance text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.02em]">
          {title}
        </h1>
        <nav
          aria-label="Breadcrumb"
          className="eyebrow mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-fg-muted"
        >
          <Link href="/" className="transition-colors hover:text-action">
            Início
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
