/**
 * Blog data layer.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * SANITY-READY BY DESIGN
 * ─────────────────────────────────────────────────────────────────────────
 * Today this returns hand-authored mock content. The public surface is a set
 * of *async* functions returning plain data, so swapping to Sanity later is a
 * drop-in: implement the bodies with the Sanity client and keep the same
 * return shapes. Nothing in the app imports the mock array directly — pages
 * only call `getAllPosts` / `getPostBySlug` / `getLatestPosts`.
 *
 * When wiring Sanity (future):
 *   1. `pnpm add @sanity/client @portabletext/react`
 *   2. Create `lib/sanity.ts` exporting a configured client:
 *        import { createClient } from "@sanity/client";
 *        export const sanity = createClient({
 *          projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
 *          dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
 *          apiVersion: "2024-01-01",
 *          useCdn: true,
 *        });
 *   3. Replace the mock bodies below with GROQ queries (examples inline).
 *   4. Model `body` as Portable Text and render it with @portabletext/react.
 *      The current `BodyBlock[]` shape mirrors the subset we render, so the
 *      swap is mechanical.
 *   5. Add `cdn.sanity.io` to `images.remotePatterns` in next.config.ts and
 *      build cover URLs with @sanity/image-url.
 */

export type BodyBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string; cite?: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  /** ISO date string. */
  publishedAt: string;
  /** Estimated reading time in minutes. */
  readingMinutes: number;
  coverImage: { src: string; alt: string };
  body: BodyBlock[];
};

/**
 * Mock content. Not exported — reach it only through the async accessors so
 * call sites are already shaped for a remote source.
 */
const posts: BlogPost[] = [
  {
    slug: "ansiedade-competitiva-o-que-e-e-sintomas",
    title: "Ansiedade competitiva: o que é e como reconhecer os sintomas",
    excerpt:
      "O coração acelera e a cabeça antecipa erros que ainda não aconteceram. Percebe o que é a ansiedade competitiva e como reconhecê-la na mente, no corpo e no comportamento.",
    category: "Psicologia do Desporto",
    author: "Filipa Marques",
    publishedAt: "2026-07-16",
    readingMinutes: 6,
    coverImage: {
      src: "/img/editorial/atletismo-corrida.webp",
      alt: "Atletas na tensão da partida, momentos de máxima pressão",
    },
    body: [
      {
        type: "paragraph",
        text: "Treinaste durante semanas. Sabes exatamente o que estás a fazer. E, no entanto, minutos antes de competir, sentes que deixaste de saber fazer aquilo que sempre fizeste. O coração acelera, o corpo fica tenso e a cabeça começa a antecipar erros que ainda não aconteceram. Decisões que costumam ser automáticas passam, de repente, a ser analisadas em excesso.",
      },
      {
        type: "paragraph",
        text: "Por fora, pode parecer falta de confiança ou incapacidade de lidar com a pressão. Por dentro, o cérebro está apenas a responder a uma situação que considera importante, incerta e potencialmente ameaçadora. Sentir ansiedade antes de competir não significa que não estás preparado, o problema começa quando aquilo que sentes interfere com a atenção, a decisão e a capacidade de executar.",
      },
      {
        type: "heading",
        text: "O que é a ansiedade competitiva?",
      },
      {
        type: "paragraph",
        text: "A ansiedade competitiva é uma resposta emocional que pode surgir antes, durante ou depois de uma situação em que o atleta sente que o seu rendimento vai ser avaliado. E essa avaliação nem sempre é sobre o resultado: pode ser a opinião do treinador, o receio de perder o lugar, as expectativas da família, a reação dos colegas, a oportunidade de estar a ser observado ou a própria imagem que o atleta tem de si.",
      },
      {
        type: "paragraph",
        text: "A investigação costuma distinguir a ansiedade-traço, uma tendência relativamente estável da pessoa, da ansiedade-estado, que aumenta perante uma situação específica, como um jogo decisivo, uma convocatória ou uma prova importante. Por isso, um atleta pode sentir-se tranquilo na maioria das áreas da vida e, ainda assim, experimentar uma ansiedade intensa em determinados contextos competitivos.",
      },
      {
        type: "heading",
        text: "Como se manifesta: mente, corpo e comportamento",
      },
      {
        type: "paragraph",
        text: "A ansiedade não aparece só através dos pensamentos. Manifesta-se em três frentes, na mente, no corpo e no comportamento, e aprender a reconhecê-las é o primeiro passo para deixares de ser apanhado de surpresa.",
      },
      {
        type: "heading",
        text: "Na mente (sintomas cognitivos)",
      },
      {
        type: "paragraph",
        text: "Na mente, a ansiedade soa a medo de falhar, preocupação constante com o resultado e dificuldade em concentrar-se. O atleta antecipa cenários negativos, duvida de capacidades que normalmente nem questiona, sente necessidade de controlar todos os detalhes e compara-se em excesso com os adversários. Está fisicamente pronto para competir, mas mentalmente ocupado com consequências que ainda não existem.",
      },
      {
        type: "heading",
        text: "No corpo (sintomas físicos)",
      },
      {
        type: "paragraph",
        text: "No corpo, pode surgir aumento da frequência cardíaca, respiração rápida ou superficial, tensão muscular, mãos húmidas, tremores, náuseas, sensação de pernas pesadas, vontade frequente de ir à casa de banho, dificuldade em dormir na véspera ou alterações no apetite. São sinais da ativação dos sistemas fisiológicos que preparam o organismo para responder a uma exigência, e não provas de fraqueza.",
      },
      {
        type: "heading",
        text: "No comportamento",
      },
      {
        type: "paragraph",
        text: "Nem todos os atletas dizem que estão ansiosos. Muitas vezes, a ansiedade torna-se visível no comportamento: evitar responsabilidades, jogar de forma demasiado segura, hesitar antes de decidir, irritar-se com facilidade, procurar confirmação constante, falar demais ou isolar-se, arranjar desculpas para não competir ou alterar rotinas que costumam funcionar.",
      },
      {
        type: "quote",
        text: "Aquilo que parece desinteresse ou falta de coragem é, muitas vezes, uma tentativa de proteção perante a possibilidade de falhar.",
        cite: "Filipa Marques",
      },
      {
        type: "paragraph",
        text: "Reconhecer estes sinais é meio caminho andado. Mas há uma pergunta que costuma trazer alívio imediato: será que todo este nervosismo é mesmo ansiedade, ou apenas o corpo a preparar-se para competir? É disso que falamos no próximo artigo.",
      },
    ],
  },
  {
    slug: "ansiedade-ou-ativacao-quando-prejudica-o-rendimento",
    title: "Quando o nervosismo começa a prejudicar o rendimento",
    excerpt:
      "Sentir o coração acelerado antes de competir é normal. Descobre a diferença entre ativação e ansiedade, e o momento exato em que ela começa a tirar-te do jogo.",
    category: "Psicologia do Desporto",
    author: "Filipa Marques",
    publishedAt: "2026-07-15",
    readingMinutes: 6,
    coverImage: {
      src: "/img/editorial/forca-levantamento.webp",
      alt: "Atleta a controlar o esforço e a ativação do corpo",
    },
    body: [
      {
        type: "paragraph",
        text: "Sentes o coração acelerado, a respiração curta e aquele frio na barriga momentos antes de entrar. A pergunta que quase nunca fazemos é a mais importante de todas: isto é ansiedade a atrapalhar-te, ou é o teu corpo a preparar-se para competir? A resposta muda tudo.",
      },
      {
        type: "heading",
        text: "Ansiedade e ativação são a mesma coisa?",
      },
      {
        type: "paragraph",
        text: "Não exatamente. A ativação é o grau de energia e prontidão do organismo. Antes de competir, é natural, e até desejável, que o corpo aumente o estado de alerta. A ansiedade acrescenta a essa ativação uma camada extra: preocupação, ameaça, antecipação negativa.",
      },
      {
        type: "paragraph",
        text: "Dois atletas podem sentir exatamente a mesma sensação física e interpretá-la de forma oposta. Onde um pensa «o meu corpo está preparado, estou pronto para entrar», outro pensa «estou demasiado nervoso, isto vai correr mal». A sensação é semelhante; é o significado que lhe damos que altera a resposta.",
      },
      {
        type: "quote",
        text: "O objetivo não é competir em calma absoluta. É perceber o que estás a sentir e o que consegues fazer a partir desse estado.",
        cite: "Filipa Marques",
      },
      {
        type: "paragraph",
        text: "Aliás, a investigação mostra uma enorme variabilidade individual: há atletas que rendem muito bem com níveis elevados de ansiedade pré-competitiva, enquanto reduzir demasiado a ativação pode retirar intensidade a quem precisa dela para competir. A pergunta útil deixa de ser «quanta ansiedade sinto?» e passa a ser «como interpreto aquilo que sinto e a partir de que ponto isto começa a prejudicar-me?».",
      },
      {
        type: "heading",
        text: "Quando a ansiedade começa a tirar-te do jogo",
      },
      {
        type: "paragraph",
        text: "A ansiedade torna-se problemática quando deixa de preparar o atleta para a ação e começa a interferir com aquilo que ele precisa de executar. E isso acontece, tipicamente, de três formas.",
      },
      {
        type: "heading",
        text: "1. A atenção afasta-se da tarefa",
      },
      {
        type: "paragraph",
        text: "Em vez de observar o adversário, comunicar ou tomar a próxima decisão, o atleta enche a cabeça de «não posso falhar», «tenho de mostrar que mereço jogar» ou «se isto correr mal, perco o lugar». A atenção desloca-se daquilo que está a acontecer para aquilo que poderá acontecer. O atleta continua dentro da competição, mas parte dos seus recursos mentais está ocupada com julgamentos e cenários futuros.",
      },
      {
        type: "heading",
        text: "2. Começas a pensar demasiado na execução",
      },
      {
        type: "paragraph",
        text: "Quando uma competência está bem treinada, grande parte da execução acontece de forma automática. Sob pressão, alguns atletas voltam a controlar conscientemente movimentos que já dominam: pensam na posição dos pés, analisam o gesto enquanto o executam, tentam controlar a força, corrigem o movimento a meio da própria ação. Aquilo que era fluido torna-se rígido.",
      },
      {
        type: "heading",
        text: "3. Passas a jogar para não falhar",
      },
      {
        type: "paragraph",
        text: "Quando o medo aumenta, a estratégia muda: o atleta deixa de procurar a ação mais eficaz e passa a procurar a que o expõe menos. No futebol, livra-se da bola depressa para não a perder. No ténis, deixa de acelerar o gesto. No atletismo, abandona o ritmo planeado para controlar as sensações. Num desporto de combate, espera demasiado antes de agir. O foco deixa de estar em competir e passa a estar em evitar o erro.",
      },
      {
        type: "paragraph",
        text: "A boa notícia é que este mecanismo tem explicação, e, quase sempre, uma causa concreta por trás. Perceber porque é que a ansiedade aparece é o que nos permite trabalhá-la, em vez de a combater às cegas. É esse o tema do próximo artigo.",
      },
    ],
  },
  {
    slug: "porque-aparece-a-ansiedade-competitiva-e-quando-procurar-apoio",
    title:
      "O medo por trás do jogo: Quando a ansiedade competitiva exige um plano de ação",
    excerpt:
      "Medo das consequências, expectativas a mais, experiências passadas. Percebe porque surge a ansiedade competitiva, quando é normal e quando é altura de procurar ajuda.",
    category: "Psicologia do Desporto",
    author: "Filipa Marques",
    publishedAt: "2026-07-14",
    readingMinutes: 7,
    coverImage: {
      src: "/img/editorial/tenis-bola.webp",
      alt: "Bola de ténis em impacto, a força do momento decisivo",
    },
    body: [
      {
        type: "paragraph",
        text: "«Estou bem preparado, então porque é que fico assim?» É uma das frases que mais oiço. A ansiedade competitiva raramente tem uma única causa, na maioria dos casos, vários fatores acumulam-se até pesar mais do que deviam. E conhecê-los é precisamente o que permite trabalhá-los.",
      },
      {
        type: "heading",
        text: "Porque aparece a ansiedade competitiva?",
      },
      {
        type: "paragraph",
        text: "O atleta raramente teme apenas o erro. Teme aquilo que acredita que o erro vai provocar: perder a titularidade, desapontar alguém, ser criticado, falhar uma oportunidade, prejudicar a equipa ou confirmar, lá no fundo, que «não é suficientemente bom». Quando as consequências imaginadas são enormes, uma ação normal do jogo passa a ser vivida como um teste ao valor do atleta.",
      },
      {
        type: "paragraph",
        text: "A este medo somam-se, muitas vezes, expectativas a mais. Podem vir do treinador, da família ou dos adeptos, mas também de dentro: há atletas que não entram para fazer uma boa competição, entram com a obrigação de não errar, de se destacarem de imediato e de provarem que pertencem àquele nível. E quanto maior a obrigação de provar, menor tende a ser a liberdade para jogar.",
      },
      {
        type: "paragraph",
        text: "A confiança também conta. Em vários estudos, níveis mais elevados de ansiedade competitiva aparecem associados a menor autoconfiança. Mas atenção: falta de confiança não é falta de capacidade. O atleta pode ter toda a competência técnica e física e, ainda assim, não confiar que a consegue usar naquele contexto específico.",
      },
      {
        type: "paragraph",
        text: "Depois há a memória. Uma queda, uma falha decisiva, uma lesão, uma substituição ou uma crítica pública podem ficar coladas a determinado contexto. Quando uma situação semelhante regressa, o cérebro antecipa a repetição, o atleta não está apenas a responder à competição de hoje, está a responder ao que aconteceu antes.",
      },
      {
        type: "paragraph",
        text: "Por fim, o ambiente. Mensagens como «hoje não podes falhar», «tens de mostrar o teu valor» ou «toda a gente está a contar contigo», mesmo quando querem motivar, podem ser lidas como «o meu valor e a aprovação dos outros dependem do que acontecer hoje». E quando a identidade fica demasiado dependente do resultado, há uma diferença enorme entre pensar «falhei nesta competição» e concluir «sou um fracasso».",
      },
      {
        type: "quote",
        text: "No primeiro caso, o atleta avalia um desempenho. No segundo, transforma o resultado numa definição de identidade.",
        cite: "Filipa Marques",
      },
      {
        type: "heading",
        text: "Afinal, é normal sentir ansiedade antes de competir?",
      },
      {
        type: "paragraph",
        text: "É. Competir implica exposição, incerteza e ausência de controlo total, o atleta não controla o adversário, a arbitragem, o resultado, a avaliação dos outros nem todas as sensações que vão surgir no corpo. Uma certa dose de tensão é, por isso, expectável. O problema não está em sentir; está na intensidade, na frequência e na interferência que provoca.",
      },
      {
        type: "heading",
        text: "Quando a ansiedade merece mais atenção",
      },
      {
        type: "paragraph",
        text: "Vale a pena olhar com mais cuidado quando a ansiedade surge em praticamente todas as competições, condiciona repetidamente o rendimento, leva o atleta a evitar competir, interfere com o sono ou a alimentação, provoca sofrimento intenso, se prolonga para além do desporto, inclui episódios de pânico ou afeta a vida escolar, profissional ou familiar.",
      },
      {
        type: "paragraph",
        text: "Ainda assim, nem todo o nervosismo antes de uma competição é um problema clínico. A ansiedade competitiva pode ser situacional, limitada ao contexto de rendimento. Uma perturbação de ansiedade envolve critérios próprios, intensidade, persistência, sofrimento e impacto no funcionamento da pessoa, e essa distinção é especialmente importante quando os sintomas se estendem a outras áreas da vida.",
      },
      {
        type: "heading",
        text: "Quando procurar apoio especializado",
      },
      {
        type: "paragraph",
        text: "O trabalho de preparação mental ajuda o atleta a compreender os seus padrões, a regular a ativação e a competir com mais liberdade. Mas, quando os sintomas são intensos, persistentes ou generalizados, pode ser necessária a avaliação de um psicólogo ou de outro profissional de saúde habilitado. Procurar apoio não é sinal de fragilidade, é a mesma lógica de quem trata uma lesão física antes que ela se agrave.",
      },
      {
        type: "paragraph",
        text: "Acumular técnicas para usar nos minutos antes de competir pode dar algum alívio, mas não substitui um trabalho estruturado. Quando o problema se repete, é preciso perceber o que o atleta interpreta como ameaça, para onde desloca a atenção e como isso mexe com o comportamento. É esse padrão individual que se trabalha no acompanhamento mental, antes de voltar a aparecer num momento decisivo.",
      },
      {
        type: "paragraph",
        text: "Se quiseres aprofundar, a ansiedade competitiva é explorada em vários episódios do podcast INVISÍVEL, nomeadamente em «Pressão na Competição», «O Que Acontece no Teu Cérebro Quando Mais Precisas de Render» e «Fantasmas Têm Medo de Sorrisos», sempre a partir de situações concretas do contexto competitivo.",
      },
    ],
  },
];

/** Simulates network latency so call sites already handle async. */
async function delay<T>(value: T): Promise<T> {
  return value;
}

/**
 * All posts, newest first.
 *
 * Sanity (future):
 *   return sanity.fetch(groq`
 *     *[_type == "post"] | order(publishedAt desc){
 *       "slug": slug.current, title, excerpt, category,
 *       "author": author->name, publishedAt, readingMinutes,
 *       "coverImage": { "src": coverImage.asset->url, "alt": coverImage.alt },
 *       body
 *     }
 *   `);
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  const sorted = [...posts].sort(
    (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt),
  );
  return delay(sorted);
}

/**
 * A single post by slug, or null if not found.
 *
 * Sanity (future):
 *   return sanity.fetch(
 *     groq`*[_type == "post" && slug.current == $slug][0]{ ... }`,
 *     { slug },
 *   );
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const post = posts.find((p) => p.slug === slug) ?? null;
  return delay(post);
}

/** The N most recent posts (home teaser, related lists). */
export async function getLatestPosts(limit = 3): Promise<BlogPost[]> {
  const all = await getAllPosts();
  return all.slice(0, limit);
}

/** Locale-aware date formatting shared by blog surfaces. */
export function formatPostDate(iso: string): string {
  return new Intl.DateTimeFormat("pt-PT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}
