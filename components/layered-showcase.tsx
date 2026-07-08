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

        // Different scrub speeds create the layered depth.
        gsap.fromTo(
          q('[data-layer="back"]'),
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
        gsap.fromTo(
          q('[data-layer="front"]'),
          { yPercent: 12 },
          {
            yPercent: -12,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
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
        <h2 className="font-display text-balance text-[clamp(2rem,4.2vw,3.5rem)] leading-[1.05]">
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

      {/* Overlapping image stack */}
      <div
        className={`relative mx-auto aspect-[4/5] w-full max-w-lg ${imageFirst ? "lg:order-1" : ""}`}
      >
        {/* offset accent block, deepest layer */}
        <div
          aria-hidden
          className="absolute right-6 top-6 h-2/3 w-2/3 bg-action/12"
        />

        {/* back panel */}
        <div
          data-layer="back"
          className="absolute left-0 top-0 aspect-[3/4] w-[68%] overflow-hidden bg-surface-muted shadow-[0_24px_60px_rgba(10,10,10,0.18)]"
        >
          <Image
            src={images[0].src}
            alt={images[0].alt}
            fill
            sizes="(max-width: 1024px) 60vw, 24vw"
            className="object-cover"
          />
        </div>

        {/* front panel — sits on top, offset to the bottom-right */}
        <div
          data-layer="front"
          className="absolute bottom-0 right-0 aspect-[3/4] w-[58%] overflow-hidden bg-surface-muted shadow-[0_24px_60px_rgba(10,10,10,0.28)] ring-8 ring-page"
        >
          <Image
            src={images[1].src}
            alt={images[1].alt}
            fill
            sizes="(max-width: 1024px) 50vw, 20vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
