import Image from "next/image";

type SiteLogoProps = {
  className?: string;
  priority?: boolean;
  variant?: "default" | "navbar";
};

const logos = {
  // Footer: the complete lockup — monogram + wordmark, in orange.
  default: { src: "/img/logo-text-icon-orange.webp", width: 1468, height: 996 },
  // Navbar: the simple white monogram.
  navbar: { src: "/img/logo-icon-w.webp", width: 1600, height: 1504 },
} as const;

export function SiteLogo({
  className = "h-10 w-auto sm:h-11",
  priority = false,
  variant = "default",
}: SiteLogoProps) {
  const logo = logos[variant];

  return (
    <Image
      src={logo.src}
      alt=""
      width={logo.width}
      height={logo.height}
      priority={priority}
      className={className}
    />
  );
}
