import Image from "next/image";

type SiteLogoProps = {
  className?: string;
  priority?: boolean;
  variant?: "default" | "navbar";
};

const logos = {
  default: { src: "/img/logo-fm.png", width: 2000, height: 2000 },
  navbar: { src: "/img/logo-test.png", width: 762, height: 725 },
} as const;

export function SiteLogo({
  className = "h-15 w-auto sm:h-17",
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
