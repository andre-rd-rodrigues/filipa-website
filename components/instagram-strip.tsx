import Image from "next/image";
import { socials } from "@/lib/site";

export type InstaImage = { src: string; alt: string };

const instagram = socials.find((s) => s.label === "Instagram")!;

/**
 * Full-bleed Instagram gallery strip — an edge-to-edge, gapless row of square
 * photos with a white circular Instagram badge floating dead-centre over the
 * grid (see the provided reference). The whole strip links out to the profile.
 *
 * Responsive: 3 columns (two rows) on phones, a single row of 6 from `sm` up.
 * The badge stays centred over the grid at every breakpoint. Photo tiles are
 * decorative (aria-hidden); the one real, labelled link is the badge.
 */
// Placeholder tiles — a stand-in Instagram grid. These stay as raw placeholders
// until the strip is wired to real posts from @filipamarques.coaching.pnl.
const defaultImages: InstaImage[] = [
  {
    src: "https://images.unsplash.com/photo-1533681904393-9ab6eee7e408?auto=format&fit=crop&w=800&q=80",
    alt: "Treino de força em grupo",
  },
  {
    src: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80",
    alt: "Atleta a treinar com halteres",
  },
  {
    src: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=800&q=80",
    alt: "Sessão de treino intensa",
  },
  {
    src: "https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?auto=format&fit=crop&w=800&q=80",
    alt: "Momento de foco antes do esforço",
  },
  {
    src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
    alt: "Corrida e cardio",
  },
  {
    src: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=800&q=80",
    alt: "Equipa a partilhar energia no treino",
  },
];

function InstagramGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-[42%] w-[42%]" fill="none" aria-hidden>
      <rect
        x="2.5"
        y="2.5"
        width="19"
        height="19"
        rx="5.2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.4" cy="6.6" r="1.15" fill="currentColor" />
    </svg>
  );
}

export function InstagramStrip({
  images = defaultImages,
  href = instagram.href,
  handle = instagram.handle,
}: {
  images?: InstaImage[];
  href?: string;
  handle?: string;
}) {
  return (
    <section
      aria-label={`Instagram ${handle}`}
      className="relative isolate border-y border-ink-line"
    >
      <ul className="grid grid-cols-3 sm:grid-cols-6">
        {images.map((img) => (
          <li
            key={img.src}
            className="group relative aspect-square overflow-hidden bg-ink"
          >
            <a href={href} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden>
              <Image
                src={img.src}
                alt=""
                fill
                sizes="(max-width: 640px) 33vw, 16vw"
                className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/40" />
            </a>
          </li>
        ))}
      </ul>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="insta-badge group absolute left-1/2 top-1/2 z-[var(--z-raised)] flex aspect-square w-[clamp(3.75rem,9vw,5.75rem)] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-fg-inverse text-ink shadow-[0_10px_40px_rgba(0,0,0,0.45)] ring-0 ring-action transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[calc(50%+2px)] hover:ring-2 focus-visible:outline-none focus-visible:ring-2"
      >
        <InstagramGlyph />
        <span className="sr-only">Segue no Instagram {handle}</span>
      </a>
    </section>
  );
}
