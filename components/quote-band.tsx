"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const SPOTLIGHT_RADIUS = "11rem";

/**
 * Editorial quote band with a cursor spotlight: dim copy by default, bright
 * white text revealed in a radial mask on hover. Falls back to static bright
 * text when reduced motion is preferred or the pointer is coarse (touch).
 */
export function QuoteBand({
  eyebrow,
  quote,
  name,
  title,
}: {
  eyebrow?: string;
  quote: string;
  name: string;
  title?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState({ x: 0, y: 0, active: false });
  const [staticBright, setStaticBright] = useState(true);

  useIsomorphicLayoutEffect(() => {
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqPointer = window.matchMedia("(pointer: coarse)");
    const apply = () => setStaticBright(mqMotion.matches || mqPointer.matches);
    apply();
    mqMotion.addEventListener("change", apply);
    mqPointer.addEventListener("change", apply);
    return () => {
      mqMotion.removeEventListener("change", apply);
      mqPointer.removeEventListener("change", apply);
    };
  }, []);

  const handleMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setSpot({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        active: true,
      });
    },
    [],
  );

  const handleLeave = useCallback(() => {
    setSpot((current) => ({ ...current, active: false }));
  }, []);

  const quoteClass =
    "font-body text-balance text-[clamp(2.25rem,6vw,5rem)] font-semibold leading-[1.05] tracking-[-0.02em]";

  // Keep the radial mask anchored at the last cursor position at all times and
  // toggle only opacity. Removing the mask on leave would momentarily reveal
  // the full white quote, causing a flicker as it faded out.
  const mask = `radial-gradient(circle ${SPOTLIGHT_RADIUS} at ${spot.x}px ${spot.y}px, black 0%, transparent 72%)`;
  const maskStyle = {
    maskImage: mask,
    WebkitMaskImage: mask,
    opacity: spot.active && !staticBright ? 1 : 0,
  };

  return (
    <figure>
      {eyebrow ? (
        <p className="eyebrow mb-8 text-fg-inverse-muted">{eyebrow}</p>
      ) : null}

      <blockquote className="m-0 border-0 p-0">
        {staticBright ? (
          <p className={`${quoteClass} text-fg-inverse`}>&ldquo;{quote}&rdquo;</p>
        ) : (
          <>
            <p className="sr-only">&ldquo;{quote}&rdquo;</p>
            <div
              ref={containerRef}
              aria-hidden
              className="relative cursor-default"
              onMouseMove={handleMove}
              onMouseLeave={handleLeave}
            >
              <p className={`${quoteClass} text-fg-inverse/20`}>&ldquo;{quote}&rdquo;</p>
              <p
                className={`pointer-events-none absolute inset-0 ${quoteClass} text-fg-inverse transition-opacity duration-200`}
                style={maskStyle}
              >
                &ldquo;{quote}&rdquo;
              </p>
            </div>
          </>
        )}
      </blockquote>

      <figcaption className="mt-10">
        <p className="font-body text-lg font-semibold text-fg-inverse">{name}</p>
        {title ? <p className="mt-1 text-fg-inverse-muted">{title}</p> : null}
      </figcaption>
    </figure>
  );
}
