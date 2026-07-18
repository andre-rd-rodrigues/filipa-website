import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Consent } from "@/components/consent";
import { getSiteSettings } from "@/lib/settings";

/**
 * Marketing site chrome (header, footer, cookie consent + gated GA). Lives in
 * the (site) route group so the embedded Sanity Studio at /studio renders bare,
 * without the public header/footer.
 */
export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <>
      <SiteHeader siteName={settings.fullName} />
      <main className="flex-1">{children}</main>
      <SiteFooter settings={settings} />
      <Consent />
    </>
  );
}
