"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { GoogleAnalytics } from "@next/third-parties/google";

const STORAGE_KEY = "fm-cookie-consent";
const OPEN_EVENT = "fm:open-cookie-settings";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

type ConsentValue = "granted" | "denied";

/**
 * Cookie consent banner that gates Google Analytics. GA scripts are only
 * injected after the visitor explicitly accepts (GDPR / pt-PT).
 * Reopen from anywhere via <CookieSettingsButton /> (footer, cookies page).
 */
export function Consent() {
  const [consent, setConsent] = useState<ConsentValue | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as ConsentValue | null;
    setConsent(stored);
    setReady(true);

    const reopen = () => setConsent(null);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  const choose = (value: ConsentValue) => {
    window.localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
  };

  const showBanner = ready && consent === null;

  return (
    <>
      {consent === "granted" && GA_ID ? <GoogleAnalytics gaId={GA_ID} /> : null}

      {showBanner ? (
        <div
          role="dialog"
          aria-label="Consentimento de cookies"
          aria-live="polite"
          className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-ink/95 backdrop-blur-md"
        >
          <div className="mx-auto flex w-full max-w-[80rem] flex-col gap-5 px-5 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
            <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-fg-inverse-muted">
              Usamos cookies para analisar o tráfego do site com o Google Analytics e
              melhorar a tua experiência. Podes aceitar ou recusar. Sabe mais na{" "}
              <Link href="/cookies" className="text-action underline underline-offset-2">
                Política de Cookies
              </Link>
              .
            </p>
            <div className="flex shrink-0 gap-3">
              <button
                type="button"
                onClick={() => choose("denied")}
                className="rounded-none border-[1.5px] border-action bg-transparent px-6 py-2.5 font-body text-[0.8125rem] font-semibold uppercase tracking-[0.06em] text-action transition-[background-color,border-color,color] duration-200 hover:border-action hover:bg-action hover:text-fg-inverse"
              >
                Recusar
              </button>
              <button
                type="button"
                onClick={() => choose("granted")}
                className="rounded-none bg-action px-6 py-2.5 font-body text-[0.8125rem] font-semibold uppercase tracking-[0.06em] text-fg-inverse transition-colors hover:bg-action-hover"
              >
                Aceitar
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

/** Reopens the consent banner. Use in the footer or the cookies page. */
export function CookieSettingsButton({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
      className={className}
    >
      {children}
    </button>
  );
}
