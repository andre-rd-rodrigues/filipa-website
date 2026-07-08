import Link from "next/link";
import Image from "next/image";

export type HighlightItem = {
  label: string;
  body: string;
  href: string;
  image: { src: string; alt: string };
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
 * Horizontal strip of equal-width cards. Each card shows a number (top) and
 * title / subtext / "Saber mais" (bottom). Hovering (or focusing) a card fades
 * in a background photo and lifts the content — a CSS-only reveal, so it works
 * without JS. On touch / small screens the image is shown by default, since
 * there is no hover to trigger it.
 */
export function HighlightStrip({ items }: { items: HighlightItem[] }) {
  return (
    <div className="grid border-l border-t border-ink-line sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <Link
          key={item.label}
          href={item.href}
          className="group relative isolate flex min-h-[22rem] flex-col justify-between overflow-hidden border-b border-r border-ink-line bg-ink p-8 transition-colors duration-300 sm:min-h-[26rem] sm:p-10"
        >
          {/* Background photo — revealed on hover / focus (always shown on touch) */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 opacity-100 transition-opacity duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] lg:opacity-60 lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100"
          >
            <Image
              src={item.image.src}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="scale-105 object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/55" />
          </div>

          {/* Number */}
          <span className="font-display text-4xl text-action-deep sm:text-5xl">
            {String(i + 1).padStart(2, "0")}
          </span>

          {/* Title / subtext / CTA */}
          <div className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1">
            <h3 className="font-body text-2xl font-semibold tracking-[-0.01em] text-fg-inverse">
              {item.label}
            </h3>
            <p className="text-pretty mt-3 max-w-xs leading-relaxed text-fg-inverse-muted">
              {item.body}
            </p>
            <span className="mt-6 inline-flex items-center gap-2 font-body text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-action-deep">
              Saber mais
              <Arrow />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
