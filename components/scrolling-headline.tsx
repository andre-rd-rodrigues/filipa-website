"use client";

import { useEffect, useRef, useState } from "react";

type Tone = "dark" | "light";

/**
 * Oversized outlined headline that scrolls horizontally in a continuous,
 * seamless marquee and ACCELERATES with scroll velocity — the behaviour from
 * FitFlex's "Training portfolio" bg-text (ThemeREX trx_addons marquee): a slow
 * baseline drift that surges while the visitor scrolls, revealing more words.
 *
 * Accessible + progressive:
 * - The phrase is exposed once via the section's aria-label; the visual copies
 *   are aria-hidden.
 * - With reduced motion (or before hydration) it renders a single static,
 *   wrapping, centered phrase — no horizontal motion.
 * - The rAF loop only runs while the band is in view.
 */
export function ScrollingHeadline({
  text,
  eyebrow,
  tone = "dark",
  reverse = false,
  separator = "·",
  accent = false,
  baseSpeed = 45,
}: {
  text: string;
  eyebrow?: string;
  tone?: Tone;
  /** Marquee direction: false = right→left, true = left→right. */
  reverse?: boolean;
  /** Glyph shown between repeats (rendered in the accent colour). */
  separator?: string;
  /** Fill the text with the accent colour instead of outlining it. */
  accent?: boolean;
  /** Baseline drift in px/second. */
  baseSpeed?: number;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const groupRef = useRef<HTMLDivElement | null>(null);
  const unitRef = useRef<HTMLSpanElement | null>(null);

  const [reduced, setReduced] = useState(false);
  const [copies, setCopies] = useState(4);

  // Track the reduced-motion preference.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // How many copies fill one group so it always exceeds the viewport width.
  useEffect(() => {
    if (reduced) return;
    const measure = () => {
      const section = sectionRef.current;
      const unit = unitRef.current;
      if (!section || !unit) return;
      const uw = unit.getBoundingClientRect().width;
      const cw = section.clientWidth;
      if (uw > 0) setCopies(Math.max(2, Math.ceil(cw / uw) + 1));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [reduced, text]);

  // The marquee loop: baseline drift + scroll-velocity boost, in-view only.
  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    const group = groupRef.current;
    if (!section || !track || !group) return;

    const dir = reverse ? -1 : 1;
    let offset = 0;
    let boost = 0;
    let lastScrollY = window.scrollY;
    let last = performance.now();
    let raf = 0;
    let running = false;

    const onScroll = () => {
      const y = window.scrollY;
      boost += Math.abs(y - lastScrollY);
      lastScrollY = y;
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      const g = group.scrollWidth;
      const velocity = Math.min(baseSpeed + boost * 8, 4000); // px/s
      boost *= 0.9;
      if (boost < 0.01) boost = 0;

      offset += velocity * dt;
      if (g > 0) offset = ((offset % g) + g) % g;
      const x = dir < 0 ? offset - g : -offset;
      track.style.transform = `translate3d(${x}px, 0, 0)`;

      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { rootMargin: "100px" },
    );
    io.observe(section);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      stop();
    };
  }, [reduced, reverse, baseSpeed, copies]);

  const isDark = tone === "dark";
  const strokeColor = isDark ? "rgba(250,250,250,0.32)" : "rgba(23,23,23,0.24)";
  const textStyle = accent
    ? { color: "var(--action)" }
    : { color: "transparent", WebkitTextStroke: `1.5px ${strokeColor}` };
  const accentColor = "var(--action)";

  const wordClass =
    "font-body text-[clamp(3.5rem,17vw,15rem)] font-semibold leading-[0.95] tracking-[-0.03em] select-none";

  const Unit = ({ innerRef }: { innerRef?: (el: HTMLSpanElement | null) => void }) => (
    <span ref={innerRef} className="inline-flex shrink-0 items-baseline">
      <span style={textStyle}>{text}</span>
      <span
        aria-hidden
        className="px-[0.35em]"
        style={{ color: accentColor }}
      >
        {separator}
      </span>
    </span>
  );

  return (
    <section
      ref={sectionRef}
      aria-label={text}
      className={`relative overflow-hidden py-[clamp(3rem,9vw,7rem)] ${
        isDark ? "bg-ink text-fg-inverse" : "bg-page text-fg"
      }`}
    >
      {eyebrow ? (
        <div className="mx-auto mb-8 w-full max-w-[80rem] px-5 sm:px-8">
          <span className={`eyebrow ${isDark ? "text-action" : "text-action-deep"}`}>
            {eyebrow}
          </span>
        </div>
      ) : null}

      {reduced ? (
        // Static, readable fallback — no horizontal motion.
        <div className={`mx-auto max-w-[80rem] px-5 text-balance text-center sm:px-8 ${wordClass}`}>
          <span style={textStyle}>{text}</span>
        </div>
      ) : (
        <div ref={trackRef} className={`flex w-max will-change-transform ${wordClass}`} aria-hidden>
          <div ref={groupRef} className="flex shrink-0">
            {Array.from({ length: copies }).map((_, i) => (
              <Unit key={`a-${i}`} innerRef={i === 0 ? (el) => (unitRef.current = el) : undefined} />
            ))}
          </div>
          <div className="flex shrink-0">
            {Array.from({ length: copies }).map((_, i) => (
              <Unit key={`b-${i}`} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
