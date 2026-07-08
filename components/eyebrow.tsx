import type { ReactNode } from "react";

/**
 * Uppercase tracked label. One per section at most (One Kicker Rule).
 * `tone="dark"` uses the primary action colour for use on dark backgrounds.
 */
export function Eyebrow({
  tone = "light",
  className = "",
  children,
}: {
  tone?: "light" | "dark";
  className?: string;
  children: ReactNode;
}) {
  const color = tone === "dark" ? "text-action" : "text-action-deep";
  return (
    <span
      className={`eyebrow inline-block ${color} ${className}`}
    >
      {children}
    </span>
  );
}
