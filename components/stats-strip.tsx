"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";

// Run before paint on the client, fall back to useEffect on the server.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export type Stat = {
  value: number;
  suffix?: string;
  label: string;
  description: string;
  cta: { label: string; href: string };
};

function Arrow() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-focus-visible:translate-x-1"
    >
      <path
        d="M1 8h13M9 3l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * A single metric that counts up from zero the first time it scrolls into view.
 * The final value is rendered by default (SSR / no-JS / reduced motion); the
 * count-up only runs as a progressive enhancement, and starts from zero before
 * paint so there is no flash of the final number.
 */
function StatNumber({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(value);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Reset to zero before the browser paints, so the animation has somewhere
    // to travel from without the final value flashing first.
    setDisplay(0);

    let raf = 0;
    let start = 0;
    const duration = 1600;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          io.unobserve(entry.target);
          const tick = (now: number) => {
            if (!start) start = now;
            const t = Math.min((now - start) / duration, 1);
            // ease-out-expo: fast start, gentle settle
            const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
            setDisplay(Math.round(eased * value));
            if (t < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <span
      ref={ref}
      className="font-display block text-[clamp(3rem,6vw,4.5rem)] leading-[0.95] text-action [font-variant-numeric:tabular-nums]"
    >
      {display}
      {suffix}
    </span>
  );
}

/**
 * Stats band — three editorial metrics separated by hairlines (not a card
 * grid). Oversized Termina numbers in Action Orange count up on scroll; each metric
 * carries its own action link. Sits on a dark section band.
 */
export function StatsStrip({ items }: { items: Stat[] }) {
  return (
    <dl className="grid border-t border-ink-line sm:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex flex-col gap-4 border-b border-ink-line py-10 last:border-b-0 sm:border-b-0 sm:border-l sm:px-8 sm:py-2 sm:first:border-l-0 sm:first:pl-0 lg:px-12"
        >
          <dt>
            <StatNumber value={item.value} suffix={item.suffix} />
            <span className="mt-3 block font-body text-lg font-semibold tracking-[-0.01em] text-fg-inverse">
              {item.label}
            </span>
          </dt>
          <dd className="m-0 flex flex-1 flex-col">
            <p className="text-pretty max-w-xs leading-relaxed text-fg-inverse-muted">
              {item.description}
            </p>
            <Link
              href={item.cta.href}
              className="group mt-6 inline-flex items-center gap-2 self-start font-body text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-action-deep underline-offset-4 hover:text-action-hover hover:underline"
            >
              {item.cta.label}
              <Arrow />
            </Link>
          </dd>
        </div>
      ))}
    </dl>
  );
}
