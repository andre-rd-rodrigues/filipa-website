import Link from "next/link";
import { Container } from "@/components/container";
import { SiteLogo } from "@/components/site-logo";
import { NewsletterForm } from "@/components/newsletter-form";
import { contact, legalLinks, navLinks, site, siteCredit, socials } from "@/lib/site";
import { CookieSettingsButton } from "@/components/consent";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-fg-inverse-muted">
      <Container className="py-16 sm:py-20">
        <NewsletterForm
          variant="dark"
          fullWidth
          title="Newsletter"
          description="Ideias, artigos e novidades sobre coaching, PNL e desporto — directamente na tua caixa de entrada."
        />

        <div className="mt-14 grid gap-12 border-t border-white/10 pt-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand + quote */}
          <div>
            <Link href="/" className="inline-block" aria-label={site.fullName}>
              <SiteLogo className="h-28 w-auto sm:h-32" />
            </Link>
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
                    className="text-[0.9375rem] transition-colors hover:text-action"
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
                <a href={contact.phoneHref} className="transition-colors hover:text-action">
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={contact.emailHref}
                  className="break-all transition-colors hover:text-action"
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
                    className="transition-colors hover:text-action"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-[0.8125rem] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <p>
              © {year} {site.name} — {site.tagline}. Todos os direitos reservados.
            </p>
            <p>
              Site por{" "}
              <a
                href={siteCredit.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-action"
              >
                {siteCredit.name}
              </a>
            </p>
          </div>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-action">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <CookieSettingsButton className="transition-colors hover:text-action">
                Definições de cookies
              </CookieSettingsButton>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
