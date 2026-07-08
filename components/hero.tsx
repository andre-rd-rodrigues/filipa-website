"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { Eyebrow } from "@/components/eyebrow";
import { ButtonLink } from "@/components/button";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Home hero — layered, cinematic, GSAP-choreographed.
 *
 * Composition: an editorial photo panel is stacked *under* the headline with
 * an offset apricot accent block, so type, colour and image overlap instead of
 * sitting in tidy columns. Corners are square per the design system.
 *
 * Motion: a one-shot entrance timeline (clip-path wipe on the photo, line-by-
 * line headline rise, staggered supporting content) plus a subtle scroll
 * parallax on the photo. All of it is gated behind JS + `prefers-reduced-
 * motion: no-preference`; content is fully visible if the timeline never runs.
 */
export function Hero() {
  const root = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx: { revert: () => void } | undefined;

    // Load gsap + ScrollTrigger on the client only.
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      // Only now hide the animated bits (class-gated in globals.css) so the
      // hero is never blank for no-JS / headless renders.
      el.classList.add("gsap-ready");

      ctx = gsap.context((self) => {
        const q = self.selector!;

        const tl = gsap.timeline({
          defaults: { ease: "power4.out", duration: 0.9 },
        });

        tl.to(
          q('[data-anim="cover"]'),
          { clipPath: "inset(0 0 0% 0)", duration: 1.1, ease: "expo.out" },
        )
          .from(
            q('[data-anim="accent"]'),
            { scaleY: 0, transformOrigin: "bottom", duration: 0.8, ease: "expo.out" },
            "-=0.8",
          )
          .to(
            q('[data-anim="line"]'),
            { opacity: 1, yPercent: 0, stagger: 0.12, duration: 0.8 },
            "-=0.7",
          )
          .to(
            q('[data-anim="fade"]'),
            { opacity: 1, y: 0, stagger: 0.1, duration: 0.7 },
            "-=0.5",
          );

        // Set the pre-animation state for line/fade elements (data-anim hides
        // them via CSS; give them a transform to travel from).
        gsap.set(q('[data-anim="line"]'), { yPercent: 110 });
        gsap.set(q('[data-anim="fade"]'), { y: 24 });

        // Scroll parallax: drift the photo as the hero scrolls away.
        gsap.to(q('[data-anim="cover"] img'), {
          yPercent: 14,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }, el);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative overflow-hidden text-fg-inverse"
    >
      <div className="mx-auto grid w-full max-w-[80rem] gap-y-10 px-5 pb-16 pt-32 sm:px-8 sm:pb-24 sm:pt-40 lg:grid-cols-12 lg:gap-x-8 lg:pb-28 lg:pt-44">
        {/* Copy — sits on top, spanning into the image column for overlap */}
        <div className="relative z-[var(--z-raised)] lg:col-span-7 lg:pt-8">
          <div data-anim="fade">
            <Eyebrow tone="dark">Psicóloga · Coaching &amp; PNL · Desporto</Eyebrow>
          </div>

          <h1 className="mt-6 font-display text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.98] tracking-[-0.02em]">
            <span className="block overflow-hidden">
              <span data-anim="line" className="block">
                Ação liga os
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-anim="line" className="block">
                teus pensamentos
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-anim="line" className="block">
                aos teus <span className="text-apricot">resultados</span>.
              </span>
            </span>
          </h1>

          <p
            data-anim="fade"
            className="text-pretty mt-7 max-w-xl text-lg leading-relaxed text-fg-inverse-muted"
          >
            Coaching, inteligência emocional e comunicação para atletas,
            treinadores e profissionais do desporto. Direto ao que interessa:
            agir e alcançar.
          </p>

          <div data-anim="fade" className="mt-9 flex flex-wrap gap-4">
            <ButtonLink href="/contactos" variant="primary">
              Marcar conversa
            </ButtonLink>
            <ButtonLink href="/servicos" variant="secondary-dark">
              Conhecer serviços
            </ButtonLink>
          </div>
        </div>

        {/* Layered image stack — overlaps the copy column on large screens */}
        <div className="relative lg:col-span-5 lg:-ml-16 lg:self-stretch">
          <div className="relative ml-auto aspect-[3/4] w-full max-w-md lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:max-w-none lg:w-[38vw]">
            {/* apricot accent block behind, offset */}
            <div
              data-anim="accent"
              aria-hidden
              className="absolute -left-4 -top-4 h-24 w-24 bg-apricot sm:h-32 sm:w-32 lg:-left-6 lg:-top-6"
            />
            {/* photo with clip-path wipe reveal */}
            <div
              data-anim="cover"
              className="absolute inset-0 overflow-hidden bg-ink-raised"
            >
              <Image
                src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80"
                alt="Atleta em movimento durante o treino, foco e intensidade"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 38vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
