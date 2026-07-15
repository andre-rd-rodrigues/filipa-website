/**
 * Mock podcast content for /podcast. pt-PT, `tu` address.
 * Episodes, durations, dates and links are illustrative mocks, ready to be
 * replaced with real feed data. Platform links point to "#" placeholders.
 */

export type EpisodeLink = {
  /** Platform name, e.g. "Spotify". */
  platform: string;
  href: string;
};

export type Episode = {
  number: number;
  title: string;
  description: string;
  /** Human-readable running time, e.g. "38 min". */
  duration: string;
  /** Human-readable publish date, e.g. "12 Mar 2025". */
  date: string;
  links: EpisodeLink[];
  /** Mocked square cover art (Unsplash), ready to be replaced with real artwork. */
  coverImage: { src: string; alt: string };
};

export type Platform = {
  name: string;
  href: string;
};

const episodeLinks: EpisodeLink[] = [
  { platform: "Spotify", href: "#" },
  { platform: "Apple Podcast", href: "#" },
  { platform: "YouTube", href: "#" },
];

export const episodes: Episode[] = [
  {
    number: 1,
    title: "A mente também treina",
    description:
      "Porque é que o talento não chega e o que muda quando levas a preparação mental tão a sério como o treino físico. Um ponto de partida para tudo o que se segue.",
    duration: "38 min",
    date: "12 Mar 2025",
    links: episodeLinks,
    coverImage: {
      src: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=800&q=80",
      alt: "Arte do episódio: a mente também treina",
    },
  },
  {
    number: 2,
    title: "PNL sem misticismo",
    description:
      "O que é, afinal, a Programação Neurolinguística, e o que não é. Ferramentas concretas para mudares a conversa que tens contigo próprio antes de competir.",
    duration: "42 min",
    date: "26 Mar 2025",
    links: episodeLinks,
    coverImage: {
      src: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
      alt: "Arte do episódio: PNL sem misticismo",
    },
  },
  {
    number: 3,
    title: "Gerir a pressão do momento decisivo",
    description:
      "O penálti, o último serviço, a curva final. Como preparar o corpo e a mente para os instantes em que tudo se decide, sem deixar a ansiedade decidir por ti.",
    duration: "35 min",
    date: "9 Abr 2025",
    links: episodeLinks,
    coverImage: {
      src: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80",
      alt: "Arte do episódio: gerir a pressão do momento decisivo",
    },
  },
  {
    number: 4,
    title: "Falar para a equipa ouvir",
    description:
      "Comunicação em campo e no balneário: dar feedback que motiva em vez de bloquear, e ajustar o que dizes ao momento e a cada atleta.",
    duration: "40 min",
    date: "23 Abr 2025",
    links: episodeLinks,
    coverImage: {
      src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
      alt: "Arte do episódio: falar para a equipa ouvir",
    },
  },
  {
    number: 5,
    title: "Inteligência emocional no balneário",
    description:
      "Reconhecer o que sentes antes que o jogo o faça por ti. Estratégias simples de autorregulação para atletas e treinadores no dia a dia.",
    duration: "37 min",
    date: "7 Mai 2025",
    links: episodeLinks,
    coverImage: {
      src: "https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?auto=format&fit=crop&w=800&q=80",
      alt: "Arte do episódio: inteligência emocional no balneário",
    },
  },
  {
    number: 6,
    title: "Motivação que dura uma época inteira",
    description:
      "Distinguir a fagulha do compromisso. Como manter a energia e o foco quando os resultados tardam e a rotina começa a pesar.",
    duration: "44 min",
    date: "21 Mai 2025",
    links: episodeLinks,
    coverImage: {
      src: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80",
      alt: "Arte do episódio: motivação que dura uma época inteira",
    },
  },
];

export const platforms: Platform[] = [
  { name: "Spotify", href: "#" },
  { name: "Apple Podcast", href: "#" },
  { name: "YouTube", href: "#" },
  { name: "RSS", href: "#" },
];
