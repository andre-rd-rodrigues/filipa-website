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
});
