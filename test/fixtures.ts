/**
 * Shared test fixtures.
 *
 * Factory helpers that return minimal, valid domain objects with overridable
 * fields. Component and schema tests build their inputs from these instead of
 * importing the mock arrays in lib/*, so the suite stays decoupled from today's
 * hardcoded content and survives the swap to Sanity untouched.
 */

import type { BlogPost } from "@/lib/blog";
import type { Course, UpcomingSession } from "@/lib/courses";
import type { Service } from "@/lib/services";
import type { HighlightItem } from "@/components/highlight-strip";
import type { Stat } from "@/components/stats-strip";

export function makeBlogPost(overrides: Partial<BlogPost> = {}): BlogPost {
  return {
    slug: "post-de-teste",
    title: "Post de teste",
    excerpt: "Um resumo curto do artigo de teste.",
    category: "Categoria",
    author: "Filipa Marques",
    publishedAt: "2026-01-15",
    readingMinutes: 5,
    coverImage: { src: "/img/editorial/capa.webp", alt: "Imagem de capa" },
    body: [
      { type: "paragraph", text: "Primeiro parágrafo." },
      { type: "heading", text: "Um título" },
      { type: "quote", text: "Uma citação.", cite: "Autor" },
    ],
    ...overrides,
  };
}

export function makeCourse(overrides: Partial<Course> = {}): Course {
  return {
    slug: "curso-de-teste",
    title: "Curso de teste",
    category: "Comunicação",
    summary: "Resumo curto do curso.",
    audience: "Para toda a gente.",
    outcomes: ["Resultado um", "Resultado dois"],
    ctas: [{ label: "Inscrição", href: "/contactos", variant: "primary" }],
    image: { src: "/img/curso.webp", alt: "Foto do curso" },
    ...overrides,
  };
}

export function makeService(overrides: Partial<Service> = {}): Service {
  return {
    slug: "servico-de-teste",
    number: "01",
    title: "Serviço de teste",
    summary: "Resumo curto do serviço.",
    description: "Descrição mais longa do serviço para a listagem.",
    image: { src: "/img/servico.webp", alt: "Foto do serviço" },
    ...overrides,
  };
}

export function makeUpcomingSession(
  overrides: {
    course?: Partial<UpcomingSession["course"]>;
    edition?: Partial<UpcomingSession["edition"]>;
    session?: Partial<UpcomingSession["session"]>;
  } = {},
): UpcomingSession {
  return {
    course: {
      slug: "curso-de-teste",
      title: "Curso de teste",
      category: "Comunicação",
      image: { src: "/img/curso.webp", alt: "Foto do curso" },
      ...overrides.course,
    },
    edition: {
      label: "Edição de teste",
      format: "Online (Zoom)",
      sessions: [],
      ...overrides.edition,
    },
    session: {
      date: "2026-10-07",
      start: "19:30",
      end: "22:30",
      ...overrides.session,
    },
  };
}

export function makeHighlightItem(
  overrides: Partial<HighlightItem> = {},
): HighlightItem {
  return {
    label: "Destaque",
    body: "Descrição do destaque.",
    href: "/servicos",
    image: { src: "/img/destaque.webp", alt: "Foto do destaque" },
    ...overrides,
  };
}

export function makeStat(overrides: Partial<Stat> = {}): Stat {
  return {
    value: 120,
    suffix: "+",
    label: "Atletas acompanhados",
    description: "Descrição da métrica.",
    cta: { label: "Saber mais", href: "/sobre" },
    ...overrides,
  };
}
