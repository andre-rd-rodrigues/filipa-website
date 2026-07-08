import type { ReactNode } from "react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";

/**
 * Trust band — a dimmed, evenly spaced row of club "logos" (Brand-Logo Strip in
 * DESIGN.md). Used once, high on the homepage, on the soft-wave base.
 *
 * MOCK DATA: the emblems below are placeholder inline SVGs for fictional clubs,
 * ready to be swapped for the real club logos (drop SVGs into public/img/logos
 * and render them here as <Image> or inline <svg>).
 */

type MockLogo = { name: string; mark: ReactNode };

const logos: MockLogo[] = [
  {
    name: "FC Litoral",
    mark: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
        <path d="M12 2 2 7v6c0 5 4 8 10 9 6-1 10-4 10-9V7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Atlético Norte",
    mark: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    name: "Clube Mar",
    mark: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
        <path d="M3 14c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2M3 9c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "União Douro",
    mark: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
        <path d="M12 2 3 21h18L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Sporting Vale",
    mark: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
        <path d="M12 3 14.6 9.3 21 9.6l-4.9 4 1.6 6.4L12 16.5 6.3 20l1.6-6.4-4.9-4 6.4-.3L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function LogoStrip() {
  return (
    <section
      aria-label="Clubes e organizações que confiam no trabalho"
      className="border-y border-ink-line py-[clamp(2rem,4vw,3rem)]"
    >
      <Container>
        <Reveal>
          <p className="eyebrow text-center text-fg-muted">Confiam no trabalho</p>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14">
            {logos.map((logo) => (
              <li
                key={logo.name}
                className="flex items-center gap-2.5 text-mist opacity-70 transition-[opacity,color] duration-300 ease-out hover:text-fg-inverse hover:opacity-100"
              >
                {logo.mark}
                <span className="font-display text-lg uppercase tracking-[-0.01em]">
                  {logo.name}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
