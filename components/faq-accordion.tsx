export type FaqItem = { question: string; answer: string };

/**
 * Accordion FAQ built on native <details>/<summary> — no JS required.
 * Smooth open/close comes from the `.faq-item` rules in globals.css
 * (::details-content height animation + fade-up for the answer).
 *
 * Pass `name` so only one item stays open at a time (native exclusive
 * accordion via shared name), and mark the first item `defaultOpen`.
 */
export function FaqAccordion({
  items,
  name = "faq",
}: {
  items: FaqItem[];
  name?: string;
}) {
  return (
    <div className="border-t border-[color:var(--border-stone)]">
      {items.map((item, i) => (
        <details
          key={item.question}
          name={name}
          open={i === 0}
          className="faq-item group border-b border-[color:var(--border-stone)]"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
            <span className="font-body text-[clamp(1.0625rem,1.6vw,1.25rem)] font-semibold leading-snug tracking-[-0.01em] text-fg-inverse transition-colors group-hover:text-action group-open:text-action">
              {item.question}
            </span>
            <span
              aria-hidden
              className="grid h-8 w-8 shrink-0 place-items-center border border-[color:var(--border-stone)] text-action transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-open:rotate-180"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </summary>
          <p className="text-pretty max-w-prose pb-6 pr-10 text-[1.0625rem] leading-relaxed text-fg-inverse-muted">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
