import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Link from "next/link";

type Variant = "primary" | "secondary" | "secondary-dark" | "ghost";
type Size = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-none font-body font-semibold uppercase tracking-[0.06em] transition-[background-color,transform,box-shadow,border-color,color] duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] active:scale-[0.97] active:duration-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action disabled:pointer-events-none disabled:opacity-60";

const sizes: Record<Size, string> = {
  md: "px-[36px] py-4 text-sm",
  sm: "px-[26px] py-3 text-[0.8125rem]",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-action text-fg-inverse hover:bg-action-hover hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(216,113,30,0.22)] active:translate-y-0",
  // On light backgrounds — orange outline + label, fill on hover
  secondary:
    "border border-action bg-transparent text-action hover:border-action hover:bg-action hover:text-fg-inverse",
  // Outlined on dark hero — same outline treatment, 1.5px border weight
  "secondary-dark":
    "border-[1.5px] border-action bg-transparent text-action hover:border-action hover:bg-action hover:text-fg-inverse focus-visible:outline-action",
  ghost:
    "px-0 text-action-deep underline decoration-1 underline-offset-4 hover:text-action-hover active:scale-100",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: CommonProps & ComponentPropsWithoutRef<"button">) {
  const cls = `${base} ${variant === "ghost" ? "" : sizes[size]} ${variants[variant]} ${className}`;
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  href,
  children,
  ...rest
}: CommonProps & ComponentPropsWithoutRef<typeof Link>) {
  const cls = `${base} ${variant === "ghost" ? "" : sizes[size]} ${variants[variant]} ${className}`;
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}
