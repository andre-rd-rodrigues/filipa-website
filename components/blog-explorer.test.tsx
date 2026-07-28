import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { makeBlogPost } from "@/test/fixtures";

const navigation = vi.hoisted(() => ({
  replace: vi.fn(),
  params: new URLSearchParams(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: navigation.replace }),
  usePathname: () => "/blog",
  useSearchParams: () => navigation.params,
}));

vi.mock("@/sanity/lib/client", () => ({
  sanityFetch: vi.fn(),
}));

import { BlogExplorer } from "@/components/blog-explorer";

const posts = [
  makeBlogPost({
    slug: "foco-confianca",
    title: "Foco e confiança",
    excerpt: "Estratégias para competir sem ansiedade.",
    category: "Ansiedade no Desporto",
    publishedAt: "2026-03-10",
    readingMinutes: 8,
  }),
  makeBlogPost({
    slug: "rotinas-mentais",
    title: "Rotinas mentais",
    excerpt: "Preparação consistente para competir.",
    category: "PNL do Desporto",
    publishedAt: "2026-02-15",
    readingMinutes: 3,
  }),
  makeBlogPost({
    slug: "respiracao",
    title: "Respiração consciente",
    excerpt: "Técnicas simples para recuperar o foco.",
    category: "Ansiedade no Desporto",
    publishedAt: "2026-01-05",
    readingMinutes: 3,
  }),
];

const categories = ["Ansiedade no Desporto", "PNL do Desporto"];

function renderExplorer(query = "") {
  navigation.params = new URLSearchParams(query);
  return render(<BlogExplorer posts={posts} categories={categories} />);
}

function renderedTitles(): string[] {
  return screen
    .getAllByRole("heading")
    .map((heading) => heading.textContent ?? "");
}

describe("BlogExplorer", () => {
  beforeEach(() => {
    navigation.replace.mockReset();
    navigation.params = new URLSearchParams();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the default view newest first with shortened category chips", () => {
    renderExplorer();

    expect(renderedTitles()).toEqual([
      "Foco e confiança",
      "Rotinas mentais",
      "Respiração consciente",
    ]);
    expect(screen.getByRole("button", { name: "Ansiedade" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "PNL" })).toBeInTheDocument();
    expect(screen.getByText("3 artigos")).toBeInTheDocument();
  });

  it("supports oldest-first and reading-time sorting with a date tie-break", () => {
    const { rerender } = renderExplorer("ordem=antigos");
    expect(renderedTitles()).toEqual([
      "Respiração consciente",
      "Rotinas mentais",
      "Foco e confiança",
    ]);

    navigation.params = new URLSearchParams("ordem=leitura");
    rerender(<BlogExplorer posts={posts} categories={categories} />);

    expect(renderedTitles()).toEqual([
      "Rotinas mentais",
      "Respiração consciente",
      "Foco e confiança",
    ]);
  });

  it("falls back to newest-first for an invalid sort parameter", () => {
    renderExplorer("ordem=desconhecida");

    expect(screen.getByLabelText("Ordenar")).toHaveValue("recentes");
    expect(renderedTitles()[0]).toBe("Foco e confiança");
  });

  it("searches titles and excerpts without requiring accents", async () => {
    const user = userEvent.setup();
    renderExplorer();

    await user.type(screen.getByLabelText("Pesquisar artigos"), "respiracao");

    expect(screen.getByText("Respiração consciente")).toBeInTheDocument();
    expect(screen.queryByText("Foco e confiança")).not.toBeInTheDocument();
    expect(screen.getByText("1 artigo")).toBeInTheDocument();

    await user.clear(screen.getByLabelText("Pesquisar artigos"));
    await user.type(screen.getByLabelText("Pesquisar artigos"), "ansiedade");

    expect(screen.getByText("Foco e confiança")).toBeInTheDocument();
    expect(screen.queryByText("Rotinas mentais")).not.toBeInTheDocument();
  });

  it("filters from the category URL and marks its shortened chip active", () => {
    renderExplorer("categoria=ansiedade-no-desporto");

    expect(screen.getByText("Foco e confiança")).toBeInTheDocument();
    expect(screen.getByText("Respiração consciente")).toBeInTheDocument();
    expect(screen.queryByText("Rotinas mentais")).not.toBeInTheDocument();
    expect(screen.getByText("2 artigos")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Ansiedade" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("writes category and sort changes to the URL without scrolling", async () => {
    const user = userEvent.setup();
    renderExplorer();

    await user.click(screen.getByRole("button", { name: "Ansiedade" }));
    expect(navigation.replace).toHaveBeenLastCalledWith(
      "/blog?categoria=ansiedade-no-desporto",
      { scroll: false },
    );

    await user.selectOptions(screen.getByLabelText("Ordenar"), "antigos");
    expect(navigation.replace).toHaveBeenLastCalledWith(
      "/blog?ordem=antigos",
      { scroll: false },
    );
  });

  it("debounces and trims search query updates", async () => {
    vi.useFakeTimers();
    renderExplorer();

    fireEvent.change(screen.getByLabelText("Pesquisar artigos"), {
      target: { value: "  foco  " },
    });
    expect(navigation.replace).not.toHaveBeenCalled();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(250);
    });

    expect(navigation.replace).toHaveBeenCalledWith("/blog?q=foco", {
      scroll: false,
    });
  });

  it("shows a no-results state and clears all filters", async () => {
    const user = userEvent.setup();
    const { rerender } = renderExplorer(
      "q=inexistente&categoria=pnl-do-desporto&ordem=antigos",
    );

    expect(
      screen.getByText("Não encontrámos artigos para esta pesquisa."),
    ).toBeInTheDocument();
    expect(screen.getByText("0 artigos")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Limpar filtros" }));

    expect(navigation.replace).toHaveBeenCalledWith("/blog", { scroll: false });
    navigation.params = new URLSearchParams();
    rerender(<BlogExplorer posts={posts} categories={categories} />);
    expect(screen.getByText("3 artigos")).toBeInTheDocument();
  });

  it("synchronizes the search field when URL parameters change", async () => {
    const { rerender } = renderExplorer("q=foco");
    expect(screen.getByLabelText("Pesquisar artigos")).toHaveValue("foco");

    navigation.params = new URLSearchParams("q=respiracao");
    rerender(<BlogExplorer posts={posts} categories={categories} />);

    await waitFor(() =>
      expect(screen.getByLabelText("Pesquisar artigos")).toHaveValue(
        "respiracao",
      ),
    );
    expect(screen.getByText("Respiração consciente")).toBeInTheDocument();
    expect(screen.queryByText("Foco e confiança")).not.toBeInTheDocument();
  });
});
