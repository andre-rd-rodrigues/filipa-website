/**
 * Mock content for the /sobre page.
 *
 * NOTE: All content below is REPRESENTATIVE / MOCK data written to match the
 * brand voice in PRODUCT.md. Formations, experience and descriptions are
 * placeholders and should be replaced with Filipa's real information before
 * launch.
 */

export type Principle = {
  title: string;
  body: string;
};

/** The three pillars of Filipa's approach. Mock copy, pt-PT, `tu`. */
export const approach: Principle[] = [
  {
    title: "Ação com substância",
    body: "Nada de frases feitas. Cada sessão sai com um passo concreto para dares — porque é a ação que liga o que pensas ao que alcanças.",
  },
  {
    title: "Proximidade profissional",
    body: "Trato-te por tu e falo a tua língua, mas com o rigor de quem trabalha com psicologia e desporto a sério. Calor humano e método, sem jargão a mais.",
  },
  {
    title: "Foco em resultados",
    body: "Definimos onde queres chegar e desenhamos o caminho. Mede-se pela clareza que ganhas, pela forma como comunicas e pelo que consegues fazer em campo.",
  },
];

export type Credential = {
  title: string;
  detail: string;
};

/**
 * Formations and experience.
 *
 * MOCK / REPRESENTATIVE data — do not treat as verified credentials.
 */
export const credentials: Credential[] = [
  {
    title: "Licenciatura em Psicologia",
    detail: "Base clínica que sustenta todo o trabalho de coaching e gestão emocional.",
  },
  {
    title: "Practitioner e Master em PNL",
    detail: "Programação Neurolinguística aplicada à comunicação e à performance.",
  },
  {
    title: "Formação em Inteligência Emocional",
    detail: "Ferramentas para reconhecer, nomear e gerir emoções — dentro e fora do jogo.",
  },
  {
    title: "Experiência com atletas e equipas técnicas",
    detail: "Acompanhamento individual e de grupo em contextos de competição e alto rendimento.",
  },
  {
    title: "Formadora certificada",
    detail: "Cursos e workshops de comunicação e inteligência emocional para o desporto.",
  },
];
