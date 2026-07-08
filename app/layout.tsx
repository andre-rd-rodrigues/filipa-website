import type { Metadata } from "next";
import { Bodoni_Moda, Hanken_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/lib/site";

/**
 * Fonts:
 * - Termina (--font-termina): display / titles, licensed local Bold .otf.
 *   Only the Bold cut is licensed; it's declared across the full weight range
 *   so every display weight (all uses are 700/800) renders in real Termina —
 *   including accented glyphs (é, ç, ã…) that the old trial cut lacked.
 * - Hanken Grotesk (--font-hanken): body / UI, from Google.
 * - Bodoni Moda (--font-bodoni): the Didone brand wordmark ONLY (logo asset).
 */

const termina = localFont({
  variable: "--font-termina",
  display: "swap",
  src: [
    { path: "./fonts/Termina-Bold.otf", weight: "100 900", style: "normal" },
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
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
