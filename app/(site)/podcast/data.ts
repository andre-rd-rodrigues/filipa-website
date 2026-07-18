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

/**
 * Builds a YouTube thumbnail URL from a video id or watch URL.
 * Uses `maxresdefault` (highest resolution); `hqdefault` is always present as a
 * fallback if a video lacks a max-res thumbnail.
 */
export function youTubeThumbnail(
  idOrUrl: string,
  quality: "maxresdefault" | "hqdefault" = "maxresdefault",
): string {
  const match = idOrUrl.match(/(?:v=|youtu\.be\/|\/embed\/)([\w-]{11})/);
  const videoId = match?.[1] ?? idOrUrl;
  return `https://i.ytimg.com/vi/${videoId}/${quality}.jpg`;
}

export const episodes: Episode[] = [
  {
    number: 60,
    title: "O que é afinal o treino mental… e porque não funcionou?",
    description:
      "Há atletas que acreditam que o treino mental não funciona. Mas será mesmo essa a conclusão correta? Na maioria dos casos, aquilo a que chamam «treino mental» resume-se a uma sessão, uma conversa ou uma técnica aprendida num momento de dificuldade. Só que conhecer uma ferramenta não significa que o cérebro a consegue usar quando a pressão aumenta.",
    duration: "9 min",
    date: "15 Jul 2026",
    links: [
      { platform: "Spotify", href: "https://open.spotify.com/episode/3czR7xnL2UxbMaXPOPOsdQ" },
      { platform: "YouTube", href: "https://www.youtube.com/watch?v=kgssDHYyfl4" },
    ],
    coverImage: {
      src: youTubeThumbnail("https://www.youtube.com/watch?v=kgssDHYyfl4"),
      alt: "Arte do episódio: o que é afinal o treino mental",
    },
  },
  {
    number: 59,
    title: "O que o atleta não está a dizer — e porquê",
    description:
      "«Estou bem.» Muitos atletas dizem isto antes sequer de pensarem na resposta. Sai rápido, sai treinado, sai como proteção. Porque no desporto aprende-se cedo que mostrar o que pesa pode parecer risco: risco de perder estatuto, confiança, lugar ou respeito. Mas há um custo oculto.",
    duration: "8 min",
    date: "8 Jul 2026",
    links: [
      { platform: "Spotify", href: "https://open.spotify.com/episode/1pps3AGw5S61O22edtLJmf" },
      { platform: "YouTube", href: "https://www.youtube.com/watch?v=NsgknknMD1s" },
    ],
    coverImage: {
      src: youTubeThumbnail("https://www.youtube.com/watch?v=NsgknknMD1s"),
      alt: "Arte do episódio: o que o atleta não está a dizer",
    },
  },
  {
    number: 58,
    title: "A solidão do capitão — o preço oculto do brilho",
    description:
      "A braçadeira de capitão tem um peso que nem sempre se vê. O público vê liderança, o balneário vê estabilidade, a direção vê referência e a equipa técnica vê uma extensão do treinador. Mas poucas pessoas veem o peso invisível que o capitão carrega.",
    duration: "10 min",
    date: "1 Jul 2026",
    links: [
      { platform: "Spotify", href: "https://open.spotify.com/episode/52we2o2NO3Icjt2NUHk9T2" },
      { platform: "YouTube", href: "https://www.youtube.com/watch?v=BkdOx3elY3U" },
    ],
    coverImage: {
      src: youTubeThumbnail("https://www.youtube.com/watch?v=BkdOx3elY3U"),
      alt: "Arte do episódio: a solidão do capitão",
    },
  },
  {
    number: 57,
    title: "Geração Z no desporto — o que ninguém entende",
    description:
      "A Geração Z não chegou ao desporto com menos coragem. Chegou com outro sistema de processamento: cresceu com estímulo constante, feedback imediato, acesso rápido à informação e uma relação diferente com a autoridade, o fracasso e a identidade.",
    duration: "11 min",
    date: "24 Jun 2026",
    links: [
      { platform: "Spotify", href: "https://open.spotify.com/episode/0MYVVhAheEwARARVJ87mgB" },
      { platform: "YouTube", href: "https://www.youtube.com/watch?v=JNmHbLvhN6E" },
    ],
    coverImage: {
      src: youTubeThumbnail("https://www.youtube.com/watch?v=JNmHbLvhN6E"),
      alt: "Arte do episódio: Geração Z no desporto",
    },
  },
  {
    number: 56,
    title: "A coragem de escolheres os teus valores (com João Nunes)",
    description:
      "Por trás de um atleta há sempre muito mais do que aquilo que se vê. Neste episódio converso com João Nunes, defesa-central de futebol com um percurso sólido construído entre a formação nacional, clubes de referência e uma carreira cada vez mais consistente.",
    duration: "1 h 19 min",
    date: "16 Jun 2026",
    links: [
      { platform: "Spotify", href: "https://open.spotify.com/episode/6foO51G75k5PStNbjVDH7f" },
      { platform: "YouTube", href: "https://www.youtube.com/watch?v=1173OezGieA" },
    ],
    coverImage: {
      src: youTubeThumbnail("https://www.youtube.com/watch?v=1173OezGieA"),
      alt: "Arte do episódio: a coragem de escolheres os teus valores",
    },
  },
  {
    number: 55,
    title: "A época acaba e tu não sabes desligar?",
    description:
      "Há atletas que param de treinar… mas não param por dentro. Chegam as férias, o calendário esvazia, o treino formal acaba e, mesmo assim, o corpo continua em alerta, a cabeça continua em missão e o descanso não acontece verdadeiramente.",
    duration: "7 min",
    date: "10 Jun 2026",
    links: [
      { platform: "Spotify", href: "https://open.spotify.com/episode/48HmSWUnOgtFifoGEqoC2W" },
      { platform: "YouTube", href: "https://www.youtube.com/watch?v=9oJNy8VElyw" },
    ],
    coverImage: {
      src: youTubeThumbnail("https://www.youtube.com/watch?v=9oJNy8VElyw"),
      alt: "Arte do episódio: a época acaba e tu não sabes desligar",
    },
  },
  {
    number: 54,
    title: "A ressaca emocional: o que fazer quando a época acaba",
    description:
      "A época acaba, mas nem tudo acaba com ela. Independentemente de como terminou, há uma coisa que muitos atletas sentem e quase ninguém fala: o vazio. Neste episódio falo sobre a ressaca emocional que muitos atletas vivem no final da temporada.",
    duration: "7 min",
    date: "3 Jun 2026",
    links: [
      { platform: "Spotify", href: "https://open.spotify.com/episode/0F5ovfxsHW1fzGu05ce8hW" },
      { platform: "YouTube", href: "https://www.youtube.com/watch?v=1OrJbX2sh0I" },
    ],
    coverImage: {
      src: youTubeThumbnail("https://www.youtube.com/watch?v=1OrJbX2sh0I"),
      alt: "Arte do episódio: a ressaca emocional",
    },
  },
  {
    number: 53,
    title: "O impacto do diálogo interno: treina a tua voz interior",
    description:
      "O atleta não compete apenas contra o adversário ou contra o cronómetro. Em cada segundo, compete contra a forma como fala consigo próprio. Neste episódio despimos a tática e entramos na conversa interna que define muito do que acontece em campo.",
    duration: "9 min",
    date: "27 Mai 2026",
    links: [
      { platform: "Spotify", href: "https://open.spotify.com/episode/1aXNKMjKGqlzXa9rFonV5x" },
      { platform: "YouTube", href: "https://www.youtube.com/watch?v=rpYJW1RCjPw" },
    ],
    coverImage: {
      src: youTubeThumbnail("https://www.youtube.com/watch?v=rpYJW1RCjPw"),
      alt: "Arte do episódio: o impacto do diálogo interno",
    },
  },
  {
    number: 52,
    title: "Quando ficar frio parece proteção",
    description:
      "Há atletas que não deixaram de sentir. Só aprenderam, muito cedo ou muito à força, a esconder aquilo que sentem. Neste episódio falo sobre o que acontece quando um atleta se habitua a desligar emocionalmente para sobreviver.",
    duration: "7 min",
    date: "20 Mai 2026",
    links: [
      { platform: "Spotify", href: "https://open.spotify.com/episode/3DhsJwjleMgR32WKZ6JTTS" },
      { platform: "YouTube", href: "https://www.youtube.com/watch?v=Hn2VqQDHmDk" },
    ],
    coverImage: {
      src: youTubeThumbnail("https://www.youtube.com/watch?v=Hn2VqQDHmDk"),
      alt: "Arte do episódio: quando ficar frio parece proteção",
    },
  },
  {
    number: 51,
    title: "Já não falta nada, mas falta tudo",
    description:
      "Há atletas que treinam, competem, aparecem e cumprem. Por fora, até pode parecer que está tudo mais ou menos em ordem. Mas por dentro já não se sentem da mesma maneira: já não sentem a mesma leveza, a mesma energia, o mesmo entusiasmo.",
    duration: "9 min",
    date: "13 Mai 2026",
    links: [
      { platform: "Spotify", href: "https://open.spotify.com/episode/1T6vbBkuk5GntgO9H7sPOP" },
      { platform: "YouTube", href: "https://www.youtube.com/watch?v=LuKkG8bK8Ac" },
    ],
    coverImage: {
      src: youTubeThumbnail("https://www.youtube.com/watch?v=LuKkG8bK8Ac"),
      alt: "Arte do episódio: já não falta nada, mas falta tudo",
    },
  },
];

export const platforms: Platform[] = [
  { name: "Spotify", href: "https://open.spotify.com/show/4PQe3Vd4qeMBm8FIk1g1oy" },
  { name: "YouTube", href: "https://www.youtube.com/@Invisível-Podcast" },
];
