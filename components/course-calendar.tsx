"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/button";
import { primaryCta } from "@/lib/site";
import type { CourseEdition, Course, UpcomingSession } from "@/lib/courses";

/**
 * Navigable 12-month calendar of upcoming course sessions.
 *
 * Client component: holds the visible month in state and lets the user page
 * month-by-month across a 12-month window starting at `baseMonth` (the current
 * month, passed from the server to keep SSR/CSR in sync). Two columns: a month
 * grid (session days highlighted) and an agenda for the visible month. All data
 * comes from `getUpcomingSessions()` (Sanity-ready); this component only renders.
 */

/** How many months the user can page through, starting at the current month. */
const MONTHS_AHEAD = 12;

const WEEKDAYS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

/** Parse an ISO `yyyy-mm-dd` into a local Date (no timezone drift). */
function parseISODate(iso: string): Date {
  return new Date(`${iso}T00:00:00`);
}

/** "19:30" -> "19h30". */
function formatTime(time?: string): string | null {
  return time ? time.replace(":", "h") : null;
}

/** Join day numbers as "7, 9, 14, 16, 21 e 23". */
function joinDays(days: number[]): string {
  if (days.length <= 1) return days.join("");
  return `${days.slice(0, -1).join(", ")} e ${days[days.length - 1]}`;
}

/** Uppercase only the first letter (pt-PT month names come lowercased). */
function capitalizeFirst(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

const monthYearFormatter = new Intl.DateTimeFormat("pt-PT", {
  month: "long",
  year: "numeric",
});
const monthNameFormatter = new Intl.DateTimeFormat("pt-PT", { month: "long" });
const fullDateFormatter = new Intl.DateTimeFormat("pt-PT", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

type EditionGroup = {
  key: string;
  course: Pick<Course, "slug" | "title" | "category" | "image">;
  edition: CourseEdition;
  sessions: UpcomingSession["session"][];
};

/** Group sessions by course + edition, preserving date order. */
function groupByEdition(sessions: UpcomingSession[]): EditionGroup[] {
  const map = new Map<string, EditionGroup>();
  for (const item of sessions) {
    const key = `${item.course.slug}::${item.edition.label}`;
    const existing = map.get(key);
    if (existing) {
      existing.sessions.push(item.session);
    } else {
      map.set(key, {
        key,
        course: item.course,
        edition: item.edition,
        sessions: [item.session],
      });
    }
  }
  return [...map.values()];
}

function EmptyState() {
  return (
    <div className="border-t border-[color:var(--border-stone)] pt-8">
      <p className="text-pretty max-w-md text-lg leading-relaxed text-fg-muted">
        Não há datas agendadas de momento. Fala comigo e encontramos a próxima
        turma — ou uma sessão à tua medida.
      </p>
      <ButtonLink href={primaryCta.href} variant="secondary" size="sm" className="mt-6">
        {primaryCta.label}
      </ButtonLink>
    </div>
  );
}

function AgendaCard({ group }: { group: EditionGroup }) {
  const days = group.sessions.map((s) => parseISODate(s.date).getDate());
  const monthName = monthNameFormatter.format(parseISODate(group.sessions[0].date));
  const time = formatTime(group.sessions[0].start);
  const endTime = formatTime(group.sessions[0].end);
  return (
    <li className="grid gap-5 border-t border-[color:var(--border-stone)] py-6 first:border-t-0 first:pt-0 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] sm:gap-6">
      <Link
        href={`/cursos/${group.course.slug}`}
        className="group relative block aspect-[4/3] overflow-hidden bg-surface-muted sm:aspect-auto sm:h-full sm:min-h-[11rem]"
      >
        <Image
          src={group.course.image.src}
          alt={group.course.image.alt}
          fill
          sizes="(max-width: 640px) 100vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </Link>
      <div>
        <span className="eyebrow block text-action-deep">{group.course.category}</span>
        <h3 className="font-display mt-2 text-balance text-[clamp(1.375rem,2.5vw,1.75rem)] leading-[1.15]">
          <Link
            href={`/cursos/${group.course.slug}`}
            className="transition-colors hover:text-action-deep"
          >
            {group.course.title}
          </Link>
        </h3>
        <dl className="mt-4 space-y-2 text-[0.9375rem]">
          <div className="flex gap-3">
            <dt className="w-20 shrink-0 text-[0.75rem] uppercase tracking-[0.12em] text-fg-muted">
              Datas
            </dt>
            <dd className="text-fg-secondary">
              <span>
                {joinDays(days)} de {monthName}
              </span>
              {time ? (
                <span className="text-fg-muted">
                  {" · "}
                  {time}
                  {endTime ? `–${endTime}` : ""}
                </span>
              ) : null}
            </dd>
          </div>
          {group.edition.format ? (
            <div className="flex gap-3">
              <dt className="w-20 shrink-0 text-[0.75rem] uppercase tracking-[0.12em] text-fg-muted">
                Formato
              </dt>
              <dd className="text-fg-secondary">{group.edition.format}</dd>
            </div>
          ) : null}
        </dl>
        <div className="mt-5 flex flex-wrap gap-3">
          <ButtonLink href={`/cursos/${group.course.slug}`} variant="secondary" size="sm">
            Saber mais
          </ButtonLink>
          <ButtonLink href={primaryCta.href} variant="primary" size="sm">
            Inscrição
          </ButtonLink>
        </div>
      </div>
    </li>
  );
}

export function CourseCalendar({
  sessions,
  baseMonth,
}: {
  sessions: UpcomingSession[];
  baseMonth: { year: number; month: number };
}) {
  const [offset, setOffset] = useState(0);

  if (sessions.length === 0) return <EmptyState />;

  // Visible month, derived from the base month + offset (Date normalises the
  // year rollover, e.g. month 13 -> January of the next year).
  const visible = new Date(baseMonth.year, baseMonth.month + offset, 1);
  const year = visible.getFullYear();
  const month = visible.getMonth();
  const monthStart = visible;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leadingBlanks = (monthStart.getDay() + 6) % 7; // Monday-first

  // Distinct courses per day-of-month, for the visible month (grid dots + a11y).
  const coursesByDay = new Map<number, string[]>();
  for (const item of sessions) {
    const d = parseISODate(item.session.date);
    if (d.getFullYear() === year && d.getMonth() === month) {
      const day = d.getDate();
      const list = coursesByDay.get(day) ?? [];
      if (!list.includes(item.course.title)) list.push(item.course.title);
      coursesByDay.set(day, list);
    }
  }

  // Build padded cells then chunk into weeks for the table rows.
  const trailingBlanks = (7 - ((leadingBlanks + daysInMonth) % 7)) % 7;
  const cells: (number | null)[] = [
    ...Array<null>(leadingBlanks).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ...Array<null>(trailingBlanks).fill(null),
  ];
  const weeks: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  const monthLabel = capitalizeFirst(monthYearFormatter.format(visible));

  // Sessions in the visible month, grouped for the agenda.
  const monthSessions = sessions.filter((item) => {
    const d = parseISODate(item.session.date);
    return d.getFullYear() === year && d.getMonth() === month;
  });
  const groups = groupByEdition(monthSessions);

  // For an empty month: point to the next session from this month onward.
  const nextFromHere = sessions.find(
    (item) => parseISODate(item.session.date) >= monthStart,
  );
  const nextOffset = nextFromHere
    ? (parseISODate(nextFromHere.session.date).getFullYear() - baseMonth.year) * 12 +
      (parseISODate(nextFromHere.session.date).getMonth() - baseMonth.month)
    : -1;
  const canJumpToNext = nextOffset >= 0 && nextOffset <= MONTHS_AHEAD - 1;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
      {/* Month grid */}
      <div>
        <div className="flex items-center justify-between gap-4">
          <p
            className="font-display text-xl leading-none tracking-[-0.01em]"
            aria-live="polite"
          >
            {monthLabel}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setOffset((o) => Math.max(0, o - 1))}
              disabled={offset === 0}
              aria-label="Mês anterior"
              className="grid h-9 w-9 place-items-center rounded-none border border-[color:var(--border-stone)] text-fg transition-colors hover:border-action hover:text-action disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M9 1 3 7l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setOffset((o) => Math.min(MONTHS_AHEAD - 1, o + 1))}
              disabled={offset === MONTHS_AHEAD - 1}
              aria-label="Mês seguinte"
              className="grid h-9 w-9 place-items-center rounded-none border border-[color:var(--border-stone)] text-fg transition-colors hover:border-action hover:text-action disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="m5 1 6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <table className="mt-6 w-full border-collapse text-sm">
          <caption className="sr-only">Sessões de {monthLabel}</caption>
          <thead>
            <tr>
              {WEEKDAYS.map((label) => (
                <th
                  key={label}
                  scope="col"
                  className="border border-[color:var(--border-stone)] bg-surface py-2 text-center text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-fg-muted"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weeks.map((week, wi) => (
              <tr key={wi}>
                {week.map((day, di) => {
                  if (day === null) {
                    return (
                      <td
                        key={`b-${wi}-${di}`}
                        className="h-14 border border-[color:var(--border-stone)] bg-surface sm:h-16"
                      />
                    );
                  }
                  const dayCourses = coursesByDay.get(day) ?? [];
                  const hasSession = dayCourses.length > 0;
                  return (
                    <td
                      key={day}
                      aria-current={hasSession ? "date" : undefined}
                      className={`h-14 border border-[color:var(--border-stone)] text-center align-middle sm:h-16 ${
                        hasSession
                          ? "bg-action font-semibold text-fg-inverse"
                          : "bg-surface text-fg-muted"
                      }`}
                    >
                      <span className="flex flex-col items-center justify-center gap-1">
                        <span>{day}</span>
                        {hasSession ? (
                          <>
                            <span className="flex gap-0.5" aria-hidden>
                              {dayCourses.map((_, dot) => (
                                <span key={dot} className="h-1 w-1 rounded-full bg-fg-inverse" />
                              ))}
                            </span>
                            <span className="sr-only">: {dayCourses.join(", ")}</span>
                          </>
                        ) : null}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Agenda for the visible month */}
      <div>
        {groups.length > 0 ? (
          <ul className="flex flex-col">
            {groups.map((group) => (
              <AgendaCard key={group.key} group={group} />
            ))}
          </ul>
        ) : (
          <div className="border-t border-[color:var(--border-stone)] pt-6">
            <p className="text-pretty text-lg leading-relaxed text-fg-muted">
              Sem sessões em {monthNameFormatter.format(visible)}.
            </p>
            {nextFromHere ? (
              <p className="mt-3 text-[0.9375rem] text-fg-secondary">
                Próxima data:{" "}
                <Link
                  href={`/cursos/${nextFromHere.course.slug}`}
                  className="text-action-deep underline decoration-1 underline-offset-4 hover:text-action-hover"
                >
                  {nextFromHere.course.title}
                </Link>
                , {fullDateFormatter.format(parseISODate(nextFromHere.session.date))}.
              </p>
            ) : (
              <p className="mt-3 text-[0.9375rem] text-fg-secondary">
                Não há mais sessões agendadas neste período.
              </p>
            )}
            {nextFromHere && canJumpToNext ? (
              <button
                type="button"
                onClick={() => setOffset(nextOffset)}
                className="mt-5 inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-[0.06em] text-action-deep hover:text-action-hover"
              >
                Ir para {capitalizeFirst(monthNameFormatter.format(parseISODate(nextFromHere.session.date)))}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ) : (
              <ButtonLink href={primaryCta.href} variant="secondary" size="sm" className="mt-5">
                {primaryCta.label}
              </ButtonLink>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
