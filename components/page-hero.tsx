import type { ReactNode } from "react";
import { Container } from "@/components/container";
import { Eyebrow } from "@/components/eyebrow";

/**
 * Dark editorial hero for interior pages. Sits under the fixed header
 * (transparent over this dark band). Display title in Bodoni Moda.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="text-fg-inverse">
      <Container className="pb-[clamp(3.5rem,7vw,5.5rem)] pt-[clamp(8rem,16vw,11rem)]">
        <div className="max-w-3xl">
          {eyebrow ? (
            <Eyebrow tone="dark" className="mb-5">
              {eyebrow}
            </Eyebrow>
          ) : null}
          <h1 className="font-display text-balance text-[clamp(2.75rem,7vw,5rem)] leading-[1.02] tracking-[-0.01em]">
            {title}
          </h1>
          {description ? (
            <p className="text-pretty mt-6 max-w-2xl text-lg leading-relaxed text-fg-inverse-muted">
              {description}
            </p>
          ) : null}
          {children ? <div className="mt-9 flex flex-wrap gap-4">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}
