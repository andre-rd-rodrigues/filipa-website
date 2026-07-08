"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { Eyebrow } from "@/components/eyebrow";
import { ButtonLink } from "@/components/button";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type ShowcaseImage = { src: string; alt: string };

type CTA = { label: string; href: string };

/**
 * A layered editorial block: two overlapping photo panels that drift at
 * different speeds on scroll (depth via parallax), paired with a copy column.
 * The overlap — one square panel sitting on top of the other, plus an offset
 * accent block — is the "on-top layers" move that replaces flat card grids.
 */
export function LayeredShowcase({
  eyebrow,
  title,
  paragraphs,
  cta,
  images,
  imageSide = "right",
}: {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  cta?: CTA;
  images: [ShowcaseImage, ShowcaseImage];
  imageSide?: "left" | "right";
}) {
  const root = useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx: { revert: () => void } | undefined;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context((self) => {
        const q = self.selector!;

        const scrollFor = (trigger: Element) => ({
          trigger,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        });

        // Entrance: a clip-path wipe with a gentle zoom-out and fade, staggered
        // back-then-front, plays once as the block scrolls into view. Animates
        // the inner images so it never conflicts with the parallax transform on
        // the panel wrappers.
        gsap.fromTo(
          q('[data-layer] img'),
          {
            clipPath: "inset(0 0 100% 0)",
            scale: 1.12,
            autoAlpha: 0,
          },
          {
            clipPath: "inset(0 0 0% 0)",
            scale: 1,
            autoAlpha: 1,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.18,
            scrollTrigger: {
              trigger: el,
              start: "top 78%",
              once: true,
            },
          },
        );

        // Subtle, equal-and-opposite counter-drift: the panels gently separate
        // then converge as the block passes through the viewport. Amplitudes are
        // small and mirrored so nothing ever leaves its inset bounds.
        gsap.fromTo(
          q('[data-layer="back"]'),
          { yPercent: -6 },
          { yPercent: 6, ease: "none", scrollTrigger: scrollFor(el) },
        );
        gsap.fromTo(
          q('[data-layer="front"]'),
          { yPercent: 6 },
          { yPercent: -6, ease: "none", scrollTrigger: scrollFor(el) },
        );
      }, el);
    })();

    return () => ctx?.revert();
  }, []);

  const imageFirst = imageSide === "left";

  return (
    <div
      ref={root}
      className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16"
    >
      {/* Copy */}
      <div className={imageFirst ? "lg:order-2" : ""}>
        <Eyebrow className="mb-4">{eyebrow}</Eyebrow>
        <h2 className="font-display text-balance text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1]">
          {title}
        </h2>
        <div className="mt-6 max-w-xl space-y-4 text-lg leading-relaxed text-fg-muted">
          {paragraphs.map((p) => (
            <p key={p} className="text-pretty">
              {p}
            </p>
          ))}
        </div>
        {cta ? (
          <div className="mt-9">
            <ButtonLink href={cta.href} variant="secondary">
              {cta.label}
            </ButtonLink>
          </div>
        ) : null}
      </div>

      {/* Overlapping image stack. Panels are inset from the edges so the scroll
          drift has room to move without ever leaving the frame. */}
      <div
        className={`relative mx-auto aspect-[4/5] w-full max-w-md ${imageFirst ? "lg:order-1" : ""}`}
      >
        {/* back panel */}
        <div
          data-layer="back"
          className="absolute left-0 top-[7%] aspect-[3/4] w-[62%] overflow-hidden bg-surface-muted shadow-[0_24px_60px_rgba(10,10,10,0.18)] will-change-transform"
        >
          <Image
            src={images[0].src}
            alt={images[0].alt}
            fill
            sizes="(max-width: 1024px) 55vw, 22vw"
            className="object-cover"
          />
        </div>

        {/* front panel — sits on top, offset to the bottom-right */}
        <div
          data-layer="front"
          className="absolute bottom-[7%] right-0 aspect-[3/4] w-[56%] overflow-hidden bg-surface-muted shadow-[0_24px_60px_rgba(10,10,10,0.28)] will-change-transform"
        >
          <Image
            src={images[1].src}
            alt={images[1].alt}
            fill
            sizes="(max-width: 1024px) 48vw, 19vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
