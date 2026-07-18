"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SiteLogo } from "@/components/site-logo";
import { navLinks, primaryCta } from "@/lib/site";

export function SiteHeader({ siteName = "Filipa Marques" }: { siteName?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Keep the overlay mounted through its exit animation before unmounting.
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Mount immediately on open; delay unmount so the exit animation can play.
  useEffect(() => {
    if (open) {
      setMounted(true);
      return;
    }
    if (!mounted) return;
    const t = setTimeout(() => setMounted(false), 600);
    return () => clearTimeout(t);
  }, [open, mounted]);

  // Lock body scroll and allow Escape to close while the overlay is open.
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled && !open
          ? "bg-ink/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[80rem] items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="block shrink-0" aria-label={siteName}>
          <SiteLogo variant="navbar" priority />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`font-body text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-fg-inverse transition-opacity hover:opacity-100 ${
                  active
                    ? "underline decoration-action decoration-2 underline-offset-[6px] opacity-100"
                    : "opacity-70"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href={primaryCta.href}
            className="inline-flex items-center rounded-none border-[1.5px] border-action bg-transparent px-5 py-2.5 font-body text-[0.8125rem] font-semibold uppercase tracking-[0.06em] text-action transition-[background-color,border-color,color] duration-200 hover:border-action hover:bg-action hover:text-fg-inverse"
          >
            {primaryCta.label}
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center text-fg-inverse lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-current transition-transform duration-300 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-0.5 w-6 bg-current transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-current transition-transform duration-300 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>
    </header>

      {/* Mobile fullscreen menu — sibling of <header> so no filtered ancestor
          clamps its fixed positioning; covers the full viewport. */}
      {mounted ? (
        <div
          id="mobile-menu"
          data-state={open ? "open" : "closed"}
          className="menu-overlay fixed inset-0 z-50 flex flex-col bg-ink lg:hidden"
        >
          {/* Top bar: logo + close */}
          <div className="mx-auto flex w-full max-w-[80rem] items-center justify-between px-5 py-4 sm:px-8">
            <Link
              href="/"
              className="block shrink-0"
              aria-label={siteName}
            >
              <SiteLogo variant="navbar" priority />
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="group flex items-center gap-3 text-fg-inverse-muted transition-colors hover:text-fg-inverse"
              aria-label="Fechar menu"
            >
              <span className="font-body text-sm font-medium uppercase tracking-[0.08em]">
                Fechar
              </span>
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                aria-hidden
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          {/* Centered items, revealed in sequence */}
          <nav
            className="flex flex-1 flex-col items-center justify-center gap-3 px-5"
            aria-label="Principal"
          >
            {navLinks.map((link, i) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  style={{ "--i": i } as CSSProperties}
                  className={`menu-item group relative flex items-center justify-center font-display text-4xl uppercase tracking-[-0.01em] transition-colors duration-200 sm:text-5xl ${
                    active
                      ? "text-fg-inverse"
                      : "text-fg-inverse-muted hover:text-fg-inverse"
                  }`}
                >
                  <span
                    className={`relative ${
                      active
                        ? "underline decoration-action decoration-2 underline-offset-[10px]"
                        : ""
                    }`}
                  >
                    {link.label}
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                      className="pointer-events-none absolute left-full top-1/2 ml-3 -translate-x-2 -translate-y-1/2 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                    >
                      <path d="M5 12h14" />
                      <path d="m13 6 6 6-6 6" />
                    </svg>
                  </span>
                </Link>
              );
            })}

            <Link
              href={primaryCta.href}
              style={{ "--i": navLinks.length } as CSSProperties}
              className="menu-item mt-8 inline-flex items-center rounded-none border-[1.5px] border-action bg-transparent px-7 py-3 font-body text-[0.8125rem] font-semibold uppercase tracking-[0.06em] text-action transition-colors duration-200 hover:bg-action hover:text-fg-inverse"
            >
              {primaryCta.label}
            </Link>
          </nav>
        </div>
      ) : null}
    </>
  );
}
