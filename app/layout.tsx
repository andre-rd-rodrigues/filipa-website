import type { Metadata } from "next";
import { Bodoni_Moda, Hanken_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Consent } from "@/components/consent";
import { site } from "@/lib/site";

/**
 * Fonts:
 * - Termina (--font-termina): display / titles, local .otf (Thin→Heavy).
 * - Hanken Grotesk (--font-hanken): body / UI, from Google.
 * - Bodoni Moda (--font-bodoni): the Didone brand wordmark ONLY (logo asset).
 */

const termina = localFont({
  variable: "--font-termina",
  display: "swap",
  src: [
    { path: "./fonts/TerminaTest-Thin.otf", weight: "100", style: "normal" },
    { path: "./fonts/TerminaTest-ExtraLight.otf", weight: "200", style: "normal" },
    { path: "./fonts/TerminaTest-Light.otf", weight: "300", style: "normal" },
    { path: "./fonts/TerminaTest-Regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/TerminaTest-Medium.otf", weight: "500", style: "normal" },
    { path: "./fonts/TerminaTest-Demi.otf", weight: "600", style: "normal" },
    { path: "./fonts/TerminaTest-Bold.otf", weight: "700", style: "normal" },
    { path: "./fonts/TerminaTest-Black.otf", weight: "800", style: "normal" },
    { path: "./fonts/TerminaTest-Heavy.otf", weight: "900", style: "normal" },
  ],
});

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
      className={`${termina.variable} ${bodoni.variable} ${hanken.variable} h-full antialiased`}
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
