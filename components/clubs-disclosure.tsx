"use client";

import { useEffect, useId, useState } from "react";
import { Eyebrow } from "@/components/eyebrow";

const PREVIEW_COUNT = 5;

const nameClass =
  "text-mist opacity-70 transition-[opacity,color] duration-300 ease-out hover:text-fg-inverse hover:opacity-100";
const listClass =
  "flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14";

/**
 * Clubs list on the /sobre page.
 *
 * Always shows the first few clubs; a modern arrow toggle reveals the rest with
 * an animated expand/collapse. Height animates via the grid-template-rows
 * 0fr -> 1fr trick (no JS measuring). Auto-opens when the page is reached with
 * the #clubes hash (e.g. from the homepage "Ver todos" link).
 */
export function ClubsDisclosure({ clubs }: { clubs: string[] }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  const preview = clubs.slice(0, PREVIEW_COUNT);
  const rest = clubs.slice(PREVIEW_COUNT);
  const hasMore = rest.length > 0;

  useEffect(() => {
    if (hasMore && window.location.hash === "#clubes") {
      setOpen(true);
    }
  }, [hasMore]);

  return (
    <div>
      <div>
        <Eyebrow className="mb-4">Clubes</Eyebrow>
        <h2 className="font-display text-balance text-[clamp(2rem,4vw,3rem)] leading-[1.1]">
          Clubes dos atletas que acompanho
        </h2>
      </div>

      <ul className={`mt-10 ${listClass}`}>
        {preview.map((name) => (
          <li key={name} className={nameClass}>
            <span className="font-display text-lg uppercase tracking-[-0.01em]">
              {name}
            </span>
          </li>
        ))}
      </ul>

      {hasMore ? (
        <>
          <div
            id={panelId}
            className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
              open
                ? "mt-6 grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <ul className={listClass}>
                {rest.map((name) => (
                  <li key={name} className={nameClass}>
                    <span className="font-display text-lg uppercase tracking-[-0.01em]">
                      {name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls={panelId}
              aria-label={open ? "Ver menos clubes" : "Ver todos os clubes"}
              className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-action"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
                className={`h-8 w-8 text-action transition-transform duration-300 ease-out motion-reduce:transition-none ${
                  open ? "rotate-180" : ""
                }`}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}
