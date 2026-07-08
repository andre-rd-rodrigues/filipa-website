import Image from "next/image";
import type { ReactNode } from "react";

type Ornament =
  | "offset-block"
  | "corner-brackets"
  | "floodlight"
  | "rule"
  | "index"
  | "dot-square"
  | "hatch";

type EditorialImageProps = {
  src: string;
  alt: string;
  /** Decorative frame treatment — stays behind / beside the photo. */
  ornament?: Ornament | Ornament[];
  /** For `index` ornament — e.g. "01". */
  index?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  aspect?: string;
};

function CornerBrackets() {
  const corner =
    "pointer-events-none absolute h-8 w-8 border-action opacity-80";
  return (
    <>
      <span
        aria-hidden
        className={`${corner} left-0 top-0 border-l-[1.5px] border-t-[1.5px]`}
      />
      <span
        aria-hidden
        className={`${corner} bottom-0 right-0 border-b-[1.5px] border-r-[1.5px]`}
      />
    </>
  );
}

function OffsetBlock() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute -bottom-4 -left-4 z-0 h-[72%] w-[58%] bg-ink-raised"
    />
  );
}

function Floodlight() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute -right-6 -top-6 z-0 h-40 w-40 bg-[radial-gradient(circle_at_center,rgba(255,95,0,0.22)_0%,rgba(255,95,0,0)_70%)]"
    />
  );
}

function Rule() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute -right-10 top-1/2 z-0 hidden h-px w-16 -translate-y-1/2 bg-action/60 lg:block"
    />
  );
}

function IndexMark({ value }: { value: string }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute -left-2 bottom-6 z-0 font-display text-[clamp(4rem,12vw,7rem)] leading-none text-action/[0.08] select-none"
    >
      {value}
    </span>
  );
}

/** Square perimeter traced with evenly spaced white dots — editorial / technical. */
function DotSquare() {
  const size = 96;
  const count = 10;
  const step = size / (count - 1);
  const r = 1.15;

  const points: { x: number; y: number }[] = [];
  for (let i = 0; i < count; i++) {
    const p = i * step;
    points.push({ x: p, y: 0 });
    if (i > 0 && i < count - 1) points.push({ x: size, y: p });
    points.push({ x: size - p, y: size });
    if (i > 0 && i < count - 1) points.push({ x: 0, y: size - p });
  }

  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${size} ${size}`}
      className="pointer-events-none absolute -left-5 -top-5 z-0 h-24 w-24 text-fg-inverse opacity-[0.32] sm:h-28 sm:w-28"
    >
      {points.map((pt, i) => (
        <circle key={i} cx={pt.x} cy={pt.y} r={r} fill="currentColor" />
      ))}
    </svg>
  );
}

/** Diagonal hatch square — thin parallel lines, offset on the bottom-right corner. */
function HatchSquare() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute -bottom-5 -right-5 z-0 h-[46%] w-[46%] opacity-70 sm:-bottom-6 sm:-right-6 sm:h-[50%] sm:w-[50%] [background-image:repeating-linear-gradient(-45deg,rgba(255,255,255,0.35)_0,rgba(255,255,255,0.35)_1px,transparent_1px,transparent_7px)]"
    />
  );
}

/**
 * Editorial photo frame with optional subtle ornaments.
 * Ornaments sit behind or beside the image — never on top of the subject.
 */
export function EditorialImage({
  src,
  alt,
  ornament = "hatch",
  index,
  priority,
  sizes = "(max-width: 1024px) 90vw, 42vw",
  className = "",
  aspect = "aspect-[4/5]",
}: EditorialImageProps) {
  const ornaments = Array.isArray(ornament) ? ornament : [ornament];

  const layers: ReactNode[] = [];
  for (const o of ornaments) {
    if (o === "offset-block") layers.push(<OffsetBlock key="offset-block" />);
    if (o === "corner-brackets")
      layers.push(<CornerBrackets key="corner-brackets" />);
    if (o === "floodlight") layers.push(<Floodlight key="floodlight" />);
    if (o === "rule") layers.push(<Rule key="rule" />);
    if (o === "index" && index)
      layers.push(<IndexMark key="index" value={index} />);
    if (o === "dot-square") layers.push(<DotSquare key="dot-square" />);
    if (o === "hatch") layers.push(<HatchSquare key="hatch" />);
  }

  return (
    <div className={`relative ${className}`}>
      {layers}
      <div
        className={`relative z-[1] w-full overflow-hidden bg-surface-muted ${aspect}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      </div>
    </div>
  );
}
