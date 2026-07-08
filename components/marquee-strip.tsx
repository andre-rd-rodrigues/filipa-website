"use client";

import { useEffect, useState, type CSSProperties } from "react";

/**
 * Full-bleed marquee strip — an oversized, solid uppercase headline that scrolls
 * horizontally in a seamless, continuous loop on the dark ground. Two identical
 * groups sit side by side and the track translates by exactly -50%, so the loop
 * is gap-free at any width. The rare orange separator is the only accent (see
 * the Floodlight Rule in DESIGN.md).
 *
 * Accessible + progressive:
 * - The phrase is exposed once via the section's aria-label; visual copies are
 *   aria-hidden.
 * - Under `prefers-reduced-motion: reduce` it collapses to a single static,
 *   centered phrase with no horizontal motion.
 * - Hovering pauses the scroll.
 */
export function MarqueeStrip({
  text,
  separator = "◆",
  reverse = true,
  durationSec = 26,
  repeat = 6,
}: {
  /** The phrase to repeat across the strip. */
  text: string;
  /** Glyph shown between repeats, rendered in the accent colour. */
  separator?: string;
  /** Scroll direction: true = left→right, false = right→left. */
  reverse?: boolean;
  /** Seconds for one full loop; lower is faster. */
  durationSec?: number;
  /** Phrase copies per group (both groups are identical). */
  repeat?: number;
}) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const wordClass =
    "font-display text-[clamp(3rem,13vw,11rem)] font-semibold uppercase leading-none tracking-[-0.02em] text-fg-inverse select-none";

  const Unit = () => (
    <span className="flex shrink-0 items-center">
      <span>{text}</span>
      <span aria-hidden className="px-[0.4em] text-action">
        {separator}
      </span>
    </span>
  );

  return (
    <section
      aria-label={text}
      className="relative overflow-hidden border-y border-ink-line bg-ink py-[clamp(2rem,6vw,4.5rem)]"
    >
      {reduced ? (
        <div
          className={`mx-auto max-w-[80rem] text-balance px-5 text-center sm:px-8 ${wordClass}`}
        >
          {text}
        </div>
      ) : (
        <div
          className={`marquee-track flex w-max ${wordClass}`}
          style={
            {
              "--marquee-duration": `${durationSec}s`,
              "--marquee-direction": reverse ? "reverse" : "normal",
            } as CSSProperties
          }
          aria-hidden
        >
          <div className="flex shrink-0">
            {Array.from({ length: repeat }).map((_, i) => (
              <Unit key={`a-${i}`} />
            ))}
          </div>
          <div className="flex shrink-0">
            {Array.from({ length: repeat }).map((_, i) => (
              <Unit key={`b-${i}`} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
