/**
 * Mock course content for /cursos. pt-PT, `tu` address.
 * Structure based on Filipa's real courses (Em Campo — Comunicação e
 * Inteligência Emocional); dates and outcomes are illustrative mocks,
 * ready to be replaced with final content.
 */

export type Course = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  /** Who the course is for. */
  audience: string;
  /** Dates or format line (one is enough). */
  schedule: string;
  /** 3–4 concrete learning outcomes. */
  outcomes: string[];
  /** Calls to action rendered as pill buttons, in order. */
  ctas: { label: string; href: string; variant: "primary" | "secondary" }[];
  /** Mocked editorial photo (Unsplash), ready to be replaced with real assets. */
  image: { src: string; alt: string };
  /** Marks a course that is not open for enrolment yet. */
  upcoming?: boolean;
};

export const courses: Course[] = [
  {
    slug: "comunicacao-em-campo",
    category: "Em Campo — Comunicação",
    title: "Aplicação Prática da PNL e da Inteligência Emocional no Desporto",
    summary:
      "Leva a Programação Neurolinguística e a inteligência emocional para dentro do balneário e do campo. Um curso prático, feito de exercícios reais, para comunicares com clareza sob pressão e tirares o melhor de cada atleta.",
    audience: "Treinadores e profissionais do desporto",
    schedule: "6 sessões · presencial e online",
    outcomes: [
      "Dar feedback que motiva em vez de bloquear, mesmo em momentos de tensão.",
      "Ler e ajustar a tua linguagem — verbal e não-verbal — a cada atleta.",
      "Criar rotinas de comunicação para o antes, o durante e o depois do jogo.",
      "Gerir conflitos na equipa técnica com método e não com instinto.",
    ],
    ctas: [
      { label: "Saber mais", href: "/contactos", variant: "secondary" },
      { label: "Inscrição", href: "/contactos", variant: "primary" },
    ],
    image: {
      src: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=1200&q=80",
      alt: "Treinador a falar com a equipa em campo",
    },
  },
  {
    slug: "inteligencia-emocional",
    category: "Inteligência Emocional",
    title: "Inteligência Emocional",
    summary:
      "Estratégias para reconhecer e compreender emoções em ti e nos outros. Aprende a gerir emoções e transforma a tua vida.",
    audience:
      "Atletas, treinadores, fisioterapeutas, gestores, formadores e quem queira melhorar o bem-estar e a qualidade de vida.",
    schedule: "Outubro 2025 · 7, 9, 14, 16, 21 e 23 · 19h20–22h30",
    outcomes: [
      "Identificar as tuas emoções no momento em que surgem — e o que as desencadeia.",
      "Responder em vez de reagir, sobretudo em contextos de alta pressão.",
      "Compreender e acompanhar o estado emocional de quem está à tua volta.",
      "Construir hábitos simples de autorregulação que se mantêm no dia a dia.",
    ],
    ctas: [{ label: "Inscrição", href: "/contactos", variant: "primary" }],
    image: {
      src: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=1200&q=80",
      alt: "Atleta em momento de concentração e serenidade",
    },
  },
  {
    slug: "lideranca-desportiva",
    category: "Liderança",
    title: "Liderança e Motivação de Equipas",
    summary:
      "Um percurso para quem lidera dentro e fora do campo: como definir uma direção clara, manter a equipa ligada ao objetivo e sustentar a motivação quando os resultados tardam.",
    audience:
      "Treinadores principais, capitães, diretores desportivos e responsáveis de equipas técnicas.",
    schedule: "Datas a anunciar · presencial",
    outcomes: [
      "Comunicar uma visão que a equipa entende e faz sua.",
      "Distinguir motivação de curto prazo de compromisso duradouro.",
      "Dar autonomia sem perder alinhamento nem exigência.",
      "Sustentar a energia do grupo ao longo de uma época inteira.",
    ],
    ctas: [{ label: "Lista de espera", href: "/contactos", variant: "secondary" }],
    image: {
      src: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=1200&q=80",
      alt: "Equipa reunida antes do jogo, foco e liderança",
    },
    upcoming: true,
  },
];
