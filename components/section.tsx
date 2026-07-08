import type { ReactNode } from "react";
import { Container } from "@/components/container";

type Tone = "page" | "surface" | "muted" | "dark" | "ink";

/**
 * Always-dark bands over ONE continuous soft-wave background (see the Soft-Wave
 * Rule in DESIGN.md). Base bands are transparent so the wave flows seamlessly
 * through the whole page; the others use translucent tints (never flat solid
 * blocks) so the wave still reads underneath and there are no seams.
 */
const toneClasses: Record<Tone, string> = {
  page: "text-fg",
  surface: "text-fg",
  muted: "bg-white/[0.02] text-fg",
  dark: "bg-black/40 text-fg-inverse",
  ink: "bg-white/[0.03] text-fg-inverse",
};
export function Section({
  tone = "page",
  size = "default",
  container = true,
  narrow = false,
  id,
  className = "",
  children,
}: {
  tone?: Tone;
  size?: "default" | "lg" | "none";
  container?: boolean;
  narrow?: boolean;
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  const pad =
    size === "lg"
      ? "py-[clamp(5.5rem,12vw,9rem)]"
      : size === "none"
        ? ""
        : "py-[clamp(4rem,9vw,6.5rem)]";

  return (
    <section id={id} className={`${toneClasses[tone]} ${pad} ${className}`}>
      {container ? <Container narrow={narrow}>{children}</Container> : children}
    </section>
  );
}
