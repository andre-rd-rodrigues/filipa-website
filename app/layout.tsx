import type { Metadata } from "next";
import { Bodoni_Moda, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Consent } from "@/components/consent";
import { site } from "@/lib/site";

/**
 * Fonts:
 * - Hanken Grotesk (--font-hanken): body / UI, from Google.
 * - Bodoni Moda (--font-bodoni): the Didone brand wordmark ONLY (logo asset).
 * - Termina (--font-termina): the wide geometric title face (self-hosted).
 *
 * ── ACTIVATE TERMINA ──────────────────────────────────────────────────────
 * Termina is a commercial Nootype face (no Google build). To turn it on:
 *   1. Drop your licensed .woff2 files in `app/fonts/` with these exact names:
 *        Termina-Medium.woff2  (500)
 *        Termina-Demi.woff2    (600)
 *        Termina-Bold.woff2    (700)
 *   2. Uncomment the `localFont` import above and the `termina` block below.
 *   3. Add `termina.variable` to the <html> className list.
 * `--font-display` in globals.css already lists `--font-termina` first, so it
 * takes over automatically; until then titles fall back to Hanken. See
 * `app/fonts/README.md`.
 */
// import localFont from "next/font/local";
//
// const termina = localFont({
//   variable: "--font-termina",
//   display: "swap",
//   src: [
//     { path: "./fonts/Termina-Medium.woff2", weight: "500", style: "normal" },
//     { path: "./fonts/Termina-Demi.woff2", weight: "600", style: "normal" },
//     { path: "./fonts/Termina-Bold.woff2", weight: "700", style: "normal" },
//   ],
// });

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline} para Desporto`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    url: site.url,
    siteName: site.fullName,
    locale: "pt_PT",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-PT"
      // Add `${termina.variable}` here once the Termina block above is active.
      className={`${bodoni.variable} ${hanken.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <Consent />
      </body>
    </html>
  );
}
