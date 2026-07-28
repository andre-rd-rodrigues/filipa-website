import Link from "next/link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { allClubs } from "@/lib/clubs";

/**
 * Trust band — a dimmed, evenly spaced row of club names (Brand-Logo Strip in
 * DESIGN.md). Used once, high on the homepage, on the soft-wave base.
 *
 * Names only (no marks). Shows a subset of the clubs; the full list lives on the
 * /sobre page, reachable via the "Ver todos" link below.
 */

const featured = allClubs.slice(0, 5);

export function LogoStrip() {
  return (
    <section
      aria-label="Clubes dos atletas que acompanho"
      className="border-y border-ink-line py-[clamp(2rem,4vw,3rem)]"
    >
      <Container>
        <Reveal>
          <p className="eyebrow text-center text-fg-muted">
            Clubes dos atletas que acompanho
          </p>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14">
            {featured.map((name) => (
              <li
                key={name}
                className="text-mist opacity-70 transition-[opacity,color] duration-300 ease-out hover:text-fg-inverse hover:opacity-100"
              >
                <span className="font-display text-lg uppercase tracking-[-0.01em]">
                  {name}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-8 text-center">
            <Link
              href="/sobre#clubes"
              className="font-body text-sm font-semibold uppercase tracking-[0.06em] text-action-deep underline-offset-4 hover:text-action-hover hover:underline"
            >
              Ver todos
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
