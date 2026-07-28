import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CourseCalendar } from "@/components/course-calendar";
import { makeUpcomingSession } from "@/test/fixtures";

// October 2026, two sessions in the same edition.
const baseMonth = { year: 2026, month: 9 };
const sessions = [
  makeUpcomingSession({ session: { date: "2026-10-07", start: "19:30", end: "22:30" } }),
  makeUpcomingSession({ session: { date: "2026-10-09" } }),
];

describe("CourseCalendar", () => {
  it("shows the empty state when there are no sessions", () => {
    render(<CourseCalendar sessions={[]} baseMonth={baseMonth} />);
    expect(
      screen.getByText(/Não há datas agendadas de momento/),
    ).toBeInTheDocument();
  });

  it("renders the base month and marks the days that have sessions", () => {
    const { container } = render(
      <CourseCalendar sessions={sessions} baseMonth={baseMonth} />,
    );

    expect(screen.getByText("Outubro de 2026")).toBeInTheDocument();
    // One calendar cell per distinct session day (7th and 9th).
    expect(container.querySelectorAll('td[aria-current="date"]')).toHaveLength(2);
  });

  it("disables the previous button on the first month", () => {
    render(<CourseCalendar sessions={sessions} baseMonth={baseMonth} />);
    expect(screen.getByRole("button", { name: "Mês anterior" })).toBeDisabled();
  });

  it("advances to the next month when paging forward", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <CourseCalendar sessions={sessions} baseMonth={baseMonth} />,
    );

    await user.click(screen.getByRole("button", { name: "Mês seguinte" }));

    expect(screen.getByText("Novembro de 2026")).toBeInTheDocument();
    // No sessions in November, so no marked days.
    expect(container.querySelectorAll('td[aria-current="date"]')).toHaveLength(0);
    expect(screen.getByText(/Sem sessões em novembro/)).toBeInTheDocument();
  });

  it("rolls December forward into January of the next year", async () => {
    const user = userEvent.setup();
    render(
      <CourseCalendar
        sessions={[
          makeUpcomingSession({ session: { date: "2027-01-08" } }),
        ]}
        baseMonth={{ year: 2026, month: 11 }}
      />,
    );

    expect(screen.getByText("Dezembro de 2026")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Mês seguinte" }));
    expect(screen.getByText("Janeiro de 2027")).toBeInTheDocument();
  });

  it("stops navigation at the end of the twelve-month window", async () => {
    const user = userEvent.setup();
    render(<CourseCalendar sessions={sessions} baseMonth={baseMonth} />);
    const next = screen.getByRole("button", { name: "Mês seguinte" });

    for (let month = 0; month < 11; month += 1) {
      await user.click(next);
    }

    expect(screen.getByText("Setembro de 2027")).toBeInTheDocument();
    expect(next).toBeDisabled();
  });

  it("offers and performs a jump to the next month with a session", async () => {
    const user = userEvent.setup();
    render(
      <CourseCalendar
        sessions={[
          makeUpcomingSession({
            course: { title: "Curso de dezembro" },
            session: { date: "2026-12-03" },
          }),
        ]}
        baseMonth={{ year: 2026, month: 10 }}
      />,
    );

    expect(screen.getByText(/Próxima data:/)).toHaveTextContent(
      "Curso de dezembro, 3 de dezembro de 2026.",
    );
    await user.click(screen.getByRole("button", { name: "Ir para Dezembro" }));

    expect(screen.getByText("Dezembro de 2026")).toBeInTheDocument();
    expect(screen.getByText("Curso de dezembro")).toBeInTheDocument();
  });

  it("reports when there are no later sessions in the window", () => {
    render(
      <CourseCalendar
        sessions={[
          makeUpcomingSession({ session: { date: "2026-10-07" } }),
        ]}
        baseMonth={{ year: 2026, month: 10 }}
      />,
    );

    expect(
      screen.getByText("Não há mais sessões agendadas neste período."),
    ).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /^Ir para/ })).not.toBeInTheDocument();
  });

  it("groups an edition's days and formats its time range", () => {
    render(<CourseCalendar sessions={sessions} baseMonth={baseMonth} />);

    expect(screen.getByText(/7 e 9 de outubro/)).toBeInTheDocument();
    expect(screen.getByText(/19h30–22h30/)).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: "Curso de teste" }),
    ).toHaveLength(1);
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
  });

  it("announces every distinct course scheduled on the same day", () => {
    const sameDay = [
      makeUpcomingSession({
        course: { slug: "curso-a", title: "Curso A" },
        edition: { label: "Edição A" },
        session: { date: "2026-10-07" },
      }),
      makeUpcomingSession({
        course: { slug: "curso-b", title: "Curso B" },
        edition: { label: "Edição B" },
        session: { date: "2026-10-07" },
      }),
    ];
    const { container } = render(
      <CourseCalendar sessions={sameDay} baseMonth={baseMonth} />,
    );

    const markedDay = container.querySelector('td[aria-current="date"]');
    expect(markedDay).toHaveTextContent("7");
    expect(markedDay).toHaveTextContent("Curso A, Curso B");
  });
});
