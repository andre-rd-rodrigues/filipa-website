"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import Image from "next/image";
import { ButtonLink } from "@/components/button";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Home hero — centred, GSAP-choreographed.
 *
 * Composition: a cutout portrait sits centre-stage over a very large, low-
 * opacity "Desporto Coaching" wordmark that slides slowly and seamlessly behind
 * it. Name, subtitle and CTAs stack centred below the figure.
 *
 * Motion: a one-shot entrance timeline (clip-path wipe on the portrait, name
 * rise, staggered supporting content) plus a subtle scroll parallax on the
 * portrait. The backdrop word loops continuously. All motion is gated behind
 * JS + `prefers-reduced-motion: no-preference`; content stays fully visible if
 * the timeline never runs, and the backdrop word falls back to static.
 */
export function Hero() {
  const root = useRef<HTMLElement | null>(null);
  // Only mount the smoke video on tablet/desktop, so phones never download the
  // ~9.6 MB asset (CSS `hidden` would still fetch it).
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setShowVideo(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx: { revert: () => void } | undefined;

    // Hide the animated bits before paint so the portrait is never shown fully
    // before the clip-path wipe runs. On hard loads this class is already on
    // <html> (set by a blocking script in the document head, before first
    // paint). We set it here too so client-side navigations to this page are
    // covered. It's gated in globals.css, so no-JS / reduced-motion renders keep
    // the content fully visible.
    const docEl = document.documentElement;
    docEl.classList.add("gsap-ready");

    (async () => {
      let gsap: typeof import("gsap").gsap;
      try {
        const gsapMod = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap = gsapMod.gsap;
        gsap.registerPlugin(ScrollTrigger);
      } catch {
        // If GSAP can't load, don't leave the hero hidden forever.
        docEl.classList.remove("gsap-ready");
        return;
      }

      ctx = gsap.context((self) => {
        const q = self.selector!;

        // Initial states for the entrance.
        gsap.set(q('[data-anim="line"]'), { yPercent: 110 });
        gsap.set(q('[data-anim="fade"]'), { y: 24 });
        gsap.set(q('[data-anim="cover"]'), {
          scale: 1.06,
          transformOrigin: "50% 100%",
        });

        const tl = gsap.timeline({
          defaults: { ease: "power3.out", duration: 0.9 },
        });

        // Portrait: the clip-path wipe and the zoom-out settle together over a
        // longer, softer curve so the reveal glides instead of snapping.
        tl.to(q('[data-anim="cover"]'), {
          clipPath: "inset(0 0 0% 0)",
          scale: 1,
          duration: 1.5,
          ease: "power4.out",
          // Once revealed, drop the clip-path and will-change entirely. Leaving a
          // live clip on a composited parent forces the browser to re-clip the
          // large portrait every scroll-parallax frame, which flickers.
          onComplete: () =>
            gsap.set(q('[data-anim="cover"]'), {
              clipPath: "none",
              willChange: "auto",
            }),
        })
          .to(
            q('[data-anim="line"]'),
            { opacity: 1, yPercent: 0, stagger: 0.12, duration: 0.9 },
            "-=1.05",
          )
          .to(
            q('[data-anim="fade"]'),
            { opacity: 1, y: 0, stagger: 0.1, duration: 0.8 },
            "-=0.7",
          );

        // Scroll parallax: drift the portrait as the hero scrolls away. A
        // smoothed scrub (vs. 1:1) keeps the movement fluid and lag-free.
        // Promote the image to its own GPU layer so the continuous transform
        // doesn't re-rasterize the large portrait each frame (a flicker source).
        gsap.set(q('[data-anim="cover"] img'), {
          willChange: "transform",
          backfaceVisibility: "hidden",
        });
        gsap.to(q('[data-anim="cover"] img'), {
          yPercent: 8,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      }, el);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <section ref={root} className="relative overflow-hidden text-fg-inverse">
      {/* Smoke video backdrop — tablet/desktop only (never mounted on phones) */}
      {showVideo ? (
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
          <video
            className="h-full w-full object-cover opacity-100"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/videos/smoke.mp4" type="video/mp4" />
          </video>
          {/* Scrim: keep type legible and blend the smoke into the dark ground */}
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/50 to-ink" />
        </div>
      ) : null}

      <div className="relative z-[var(--z-raised)] mx-auto flex w-full max-w-[80rem] flex-col items-center px-5 pb-16 pt-32 text-center sm:px-8 sm:pb-24 sm:pt-40 lg:pb-28 lg:pt-44">
        {/* Figure + sliding backdrop word */}
        <div className="relative flex w-full items-center justify-center">
          {/* Oversized wordmark, sliding slowly behind the portrait */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
          >
            <div
              className="marquee-track flex w-max select-none font-display text-[clamp(4rem,17vw,15rem)] uppercase leading-none tracking-[-0.03em] text-white/[0.06]"
              style={
                {
                  fontWeight: 800,
                  "--marquee-duration": "120s",
                  "--marquee-direction": "normal",
                } as CSSProperties
              }
            >
              {[0, 1].map((group) => (
                <div key={group} className="flex shrink-0">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <span key={i} className="whitespace-nowrap pr-[0.4em]">
                      Desporto Coaching
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Cutout portrait — revealed with a clip-path wipe */}
          <div
            data-anim="cover"
            className="relative z-[var(--z-raised)] w-full max-w-[28rem] sm:max-w-[32rem] lg:max-w-[36rem]"
          >
            <Image
              src="/img/profile.png"
              alt="Filipa Marques sentada, a segurar uma bola de futebol"
              width={3000}
              height={3750}
              priority
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 32rem, 36rem"
              className="h-auto w-full"
            />
          </div>
        </div>

        {/* Name, subtitle, CTAs */}
        <div className="relative z-[var(--z-raised)] -mt-2 flex flex-col items-center">
          <h1 className="font-display text-[clamp(2.5rem,7vw,4.75rem)] leading-[0.98] tracking-[-0.02em]">
            <span className="block overflow-hidden">
              <span data-anim="line" className="block">
                Filipa Marques
              </span>
            </span>
          </h1>

          <p
            data-anim="fade"
            className="eyebrow mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-fg-inverse-muted"
          >
            <span>Coaching</span>
            <span aria-hidden className="size-1.5 shrink-0 bg-action" />
            <span>PNL</span>
            <span aria-hidden className="size-1.5 shrink-0 bg-action" />
            <span>Desporto</span>
          </p>

          <div
            data-anim="fade"
            className="mt-9 flex w-full max-w-sm flex-col gap-4 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center"
          >
            <ButtonLink href="/contactos" variant="primary" className="w-full sm:w-auto">
              Marcar conversa
            </ButtonLink>
            <ButtonLink href="/servicos" variant="secondary-dark" className="w-full sm:w-auto">
              Conhecer serviços
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
