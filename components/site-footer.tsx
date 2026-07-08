import Link from "next/link";
import { Container } from "@/components/container";
import { contact, legalLinks, navLinks, site, socials } from "@/lib/site";
import { CookieSettingsButton } from "@/components/consent";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-fg-inverse-muted">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand + quote */}
          <div>
            <p className="font-logo text-2xl font-semibold uppercase tracking-[0.04em] text-action">
              {site.name}
            </p>
            <p className="eyebrow mt-1 text-fg-inverse-muted">{site.tagline}</p>
            <p className="mt-6 max-w-xs text-pretty text-[0.9375rem] leading-relaxed">
              “{site.quote}”
            </p>
          </div>

          {/* Navigate */}
          <nav aria-label="Rodapé — navegação">
            <p className="eyebrow text-fg-inverse">Navegar</p>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.9375rem] transition-colors hover:text-apricot"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="eyebrow text-fg-inverse">Contactos</p>
            <ul className="mt-5 space-y-3 text-[0.9375rem]">
              <li>
                <a href={contact.phoneHref} className="transition-colors hover:text-apricot">
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={contact.emailHref}
                  className="break-all transition-colors hover:text-apricot"
                >
                  {contact.email}
                </a>
              </li>
              <li className="text-fg-inverse-muted">{contact.location}</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="eyebrow text-fg-inverse">Segue</p>
            <ul className="mt-5 space-y-3 text-[0.9375rem]">
              {socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-apricot"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-[0.8125rem] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name} — {site.tagline}. Todos os direitos reservados.
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-apricot">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <CookieSettingsButton className="transition-colors hover:text-apricot">
                Definições de cookies
              </CookieSettingsButton>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
