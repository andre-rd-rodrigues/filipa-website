import Image from "next/image";

type SiteLogoProps = {
  className?: string;
  priority?: boolean;
};

export function SiteLogo({
  className = "h-12 w-auto sm:h-14",
  priority = false,
}: SiteLogoProps) {
  return (
    <Image
      src="/img/logo-fm.png"
      alt=""
      width={2000}
      height={2000}
      priority={priority}
      className={className}
    />
  );
}
