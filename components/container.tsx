import type { ElementType, ReactNode } from "react";

export function Container({
  as: Tag = "div",
  narrow = false,
  className = "",
  children,
}: {
  as?: ElementType;
  narrow?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={`mx-auto w-full px-5 sm:px-8 ${narrow ? "max-w-[46rem]" : "max-w-[80rem]"} ${className}`}
    >
      {children}
    </Tag>
  );
}
