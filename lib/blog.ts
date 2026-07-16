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

/** A single question/answer pair. Powers the on-page FAQ + FAQPage JSON-LD. */
export type FaqItem = { question: string; answer: string };

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
  /** SEO keywords surfaced in <meta keywords> and article JSON-LD. */
  keywords?: string[];
  /** Optional FAQ block: rendered on-page and emitted as FAQPage JSON-LD. */
  faq?: FaqItem[];
  /** Slugs of related posts (same series/topic) for internal linking. */
  relatedSlugs?: string[];
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
    category: "Alta Performance",
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
    category: "Alta Performance",
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
    category: "Alta Performance",
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
  // ── Série: Saúde mental e alto rendimento ──────────────────────────────
  {
    slug: "saude-mental-e-alto-rendimento-nao-tens-de-escolher",
    title: "Saúde mental e alto rendimento: porque não tens de escolher",
    excerpt:
      "Cuidar da saúde mental não é abdicar de resultados. Percebe como proteger o atleta sem retirar exigência — e porque a recuperação faz parte do treino.",
    category: "Saúde Mental no Desporto",
    author: "Filipa Marques",
    publishedAt: "2026-07-25",
    readingMinutes: 6,
    keywords: [
      "saúde mental no desporto",
      "alto rendimento",
      "recuperação do atleta",
      "psicologia do desporto",
      "bem-estar do atleta",
    ],
    relatedSlugs: [
      "identidade-do-atleta-quando-o-resultado-ocupa-tudo",
      "prevenir-antes-da-crise-comunicacao-controlo-rede-de-apoio",
    ],
    coverImage: {
      src: "/img/editorial/pista-atletismo.webp",
      alt: "Pista de atletismo ao amanhecer, o palco da exigência diária",
    },
    body: [
      {
        type: "paragraph",
        text: "Falar de saúde mental no desporto ainda cria uma falsa escolha. De um lado, a exigência, a disciplina e a procura de resultados. Do outro, o descanso, o bem-estar e a proteção emocional. Como se tivesses de abdicar de um para cuidar do outro.",
      },
      {
        type: "paragraph",
        text: "Não tens. Proteger a saúde mental não é evitar pressão nem baixar o nível. É criar as condições para aguentares a exigência sem que ela te consuma. O alto rendimento não precisa de ser confortável, mas também não deve funcionar como um sistema que só reage quando já não consegues continuar.",
      },
      {
        type: "heading",
        text: "A exigência não é o problema",
      },
      {
        type: "paragraph",
        text: "Precisas de ser desafiado. Precisas de tolerar frustração, lidar com erros, competir sob pressão e continuar a trabalhar quando os resultados demoram a aparecer. Retirar-te todas as dificuldades não protege nada, trava o teu desenvolvimento.",
      },
      {
        type: "paragraph",
        text: "O problema começa quando a exigência deixa de vir acompanhada de recuperação, clareza, apoio, margem para comunicar dificuldades, segurança para errar e corrigir, e uma sensação real de controlo sobre aquilo que depende de ti. A partir daí, deixas de estar perante um desafio pontual e passas a viver num estado prolongado de sobrecarga.",
      },
      {
        type: "heading",
        text: "Trata a recuperação como parte do treino",
      },
      {
        type: "paragraph",
        text: "O descanso ainda é tratado como ausência de trabalho. Mas não evoluis só quando treinas, evoluis quando te consegues adaptar à carga que recebes. E recuperar não é só o corpo: é a atenção, o sono e a disponibilidade emocional.",
      },
      {
        type: "paragraph",
        text: "Viagens, horários irregulares, competições tardias, ansiedade e ecrãs a mais mexem com o teu sono, e o sono influencia a recuperação, a cognição, o rendimento e o bem-estar. Proteger a recuperação é respeitar os períodos de descanso, não transformar cada momento livre em análise de desempenho, observar alterações persistentes no sono, ajustar cargas quando há sinais de desgaste e criar momentos em que não estás psicologicamente dentro da próxima competição.",
      },
      {
        type: "quote",
        text: "Descansar não é desistir da ambição. É garantir que o sistema tem capacidade para continuar a responder.",
        cite: "Filipa Marques",
      },
      {
        type: "heading",
        text: "Exigência sustentável, não exigência infinita",
      },
      {
        type: "paragraph",
        text: "Uma exigência elevada faz crescer quando existem recursos para lhe responder. Quando a pressão é contínua e a recuperação insuficiente, o esforço deixa de produzir adaptação e passa a produzir desgaste. O objetivo nunca é criar atletas menos exigentes, é evitar que a exigência gaste os recursos psicológicos de que precisas para continuar a render.",
      },
      {
        type: "paragraph",
        text: "Proteger a saúde mental não é reduzir todas as dificuldades, é aumentar a tua capacidade e a do teu contexto para lhes responder. E há um risco específico quando tudo aquilo que és passa a depender do resultado. É disso que falamos no próximo artigo, sobre a identidade do atleta.",
      },
      {
        type: "paragraph",
        text: "No podcast INVISÍVEL, os episódios «Viver no Alto Rendimento» e «Resistir no Alto Rendimento» exploram a diferença entre suportar a exigência de forma sustentável e permanecer em esforço até os recursos se esgotarem.",
      },
    ],
    faq: [
      {
        question: "Cuidar da saúde mental reduz a competitividade?",
        answer:
          "Não. Recuperação, apoio e autorregulação ajudam o atleta a sustentar a exigência ao longo do tempo. Proteger a saúde mental não significa evitar esforço nem frustração.",
      },
      {
        question: "Descansar é sinal de falta de ambição?",
        answer:
          "Não. O atleta não evolui só quando treina, evolui quando se adapta à carga. O descanso é o que permite que o esforço se transforme em progresso em vez de desgaste.",
      },
      {
        question: "O treinador é responsável pela saúde mental do atleta?",
        answer:
          "Não é responsável por diagnosticar ou tratar, mas tem responsabilidade sobre o ambiente que cria, a comunicação que usa e o encaminhamento para profissionais quando surgem sinais preocupantes.",
      },
    ],
  },
  {
    slug: "identidade-do-atleta-quando-o-resultado-ocupa-tudo",
    title: "Identidade do atleta: quando o resultado ocupa tudo",
    excerpt:
      "Quando o teu valor depende só de vencer, cada derrota dói a mais. Percebe como uma identidade mais ampla protege o atleta e distingue desconforto produtivo de desgaste.",
    category: "Saúde Mental no Desporto",
    author: "Filipa Marques",
    publishedAt: "2026-07-24",
    readingMinutes: 6,
    keywords: [
      "identidade do atleta",
      "saúde mental no desporto",
      "desgaste emocional",
      "psicologia do desporto",
    ],
    relatedSlugs: [
      "saude-mental-e-alto-rendimento-nao-tens-de-escolher",
      "prevenir-antes-da-crise-comunicacao-controlo-rede-de-apoio",
    ],
    coverImage: {
      src: "/img/editorial/basquetebol-salto.webp",
      alt: "Jogador de basquetebol suspenso no ar, entre o esforço e a queda",
    },
    body: [
      {
        type: "paragraph",
        text: "Quanto mais a tua identidade depende só do rendimento, maior é o impacto psicológico de uma lesão, de uma derrota ou de uma perda de estatuto. O problema não está em o desporto ser importante para ti, está em tornar-se a única fonte de valor, reconhecimento e direção.",
      },
      {
        type: "paragraph",
        text: "Um atleta precisa de conseguir responder a duas perguntas diferentes: «Quem sou enquanto atleta?» e «Quem sou para além daquilo que faço no desporto?». Ter interesses, relações e referências fora da modalidade não reduz o compromisso, cria uma identidade menos vulnerável às oscilações normais de uma carreira.",
      },
      {
        type: "heading",
        text: "Falhar numa competição não é ser um fracasso",
      },
      {
        type: "paragraph",
        text: "Quando acreditas que só tens valor enquanto vences, jogas ou és selecionado, cada dificuldade deixa de ser apenas desportiva. Há uma diferença enorme entre pensar «falhei nesta competição» e concluir «não presto». No primeiro caso avalias um desempenho. No segundo, transformas um resultado numa definição de quem és.",
      },
      {
        type: "quote",
        text: "Ter uma vida para além do resultado não te torna menos competitivo. Torna-te mais difícil de derrubar.",
        cite: "Filipa Marques",
      },
      {
        type: "heading",
        text: "Distingue desconforto produtivo de desgaste",
      },
      {
        type: "paragraph",
        text: "Nem todo o desconforto deve ser eliminado. Há desconforto produtivo quando enfrentas uma dificuldade, percebes o objetivo, dispões de recursos, consegues recuperar e sentes que estás a evoluir. É esse desconforto que constrói o atleta.",
      },
      {
        type: "paragraph",
        text: "Há desgaste quando a pressão nunca termina, o esforço deixa de produzir adaptação, a fadiga se acumula, perdes capacidade de concentração, o descanso te provoca culpa, a motivação passa a depender só do medo e já não existe espaço emocional fora do desempenho. O critério não é apenas saber se estás cansado, é perceber se consegues recuperar e voltar a responder.",
      },
      {
        type: "paragraph",
        text: "Uma identidade mais ampla e a capacidade de ler o teu próprio desgaste são duas formas concretas de te protegeres. Mas a prevenção não depende só de ti: depende também do contexto, da comunicação e da rede de apoio à tua volta. É esse o tema do próximo artigo.",
      },
    ],
    faq: [
      {
        question: "Ter interesses fora do desporto diminui o compromisso?",
        answer:
          "Não. Uma identidade mais ampla pode proteger o atleta quando surgem lesões, derrotas ou transições de carreira, sem reduzir a dedicação à modalidade.",
      },
      {
        question: "Como distinguir desconforto produtivo de desgaste?",
        answer:
          "No desconforto produtivo há objetivo, recursos, recuperação e sensação de evolução. No desgaste, a pressão não termina, a fadiga acumula-se e o esforço deixa de produzir adaptação.",
      },
      {
        question: "Sentir muita pressão significa que algo está mal?",
        answer:
          "Nem sempre. A pressão faz parte do desporto. O que merece atenção é quando ela é contínua, não há recuperação e o atleta deixa de se reconhecer naquilo que faz.",
      },
    ],
  },
  {
    slug: "prevenir-antes-da-crise-comunicacao-controlo-rede-de-apoio",
    title: "Prevenir antes da crise: comunicação, controlo e rede de apoio",
    excerpt:
      "A prevenção não começa quando o rendimento quebra. Descobre como a comunicação regular, o foco no que controlas e uma rede de apoio definida protegem o atleta.",
    category: "Saúde Mental no Desporto",
    author: "Filipa Marques",
    publishedAt: "2026-07-23",
    readingMinutes: 7,
    keywords: [
      "prevenção saúde mental atletas",
      "rede de apoio no desporto",
      "comunicação treinador atleta",
      "psicologia do desporto",
    ],
    relatedSlugs: [
      "saude-mental-e-alto-rendimento-nao-tens-de-escolher",
      "identidade-do-atleta-quando-o-resultado-ocupa-tudo",
    ],
    coverImage: {
      src: "/img/editorial/relvado-linha.webp",
      alt: "Linha branca sobre relvado, o limite claro entre dentro e fora do jogo",
    },
    body: [
      {
        type: "paragraph",
        text: "Muitas equipas dizem valorizar a saúde mental, mas só iniciam a conversa quando o rendimento quebra. A mensagem implícita é dura: o estado do atleta só interessa quando começa a afetar os resultados. A prevenção exige o contrário, contacto regular, não apenas intervenção em emergência.",
      },
      {
        type: "heading",
        text: "Cria espaços de comunicação antes da crise",
      },
      {
        type: "paragraph",
        text: "Perguntas simples produzem informação relevante: Como tens recuperado? O que te está a consumir mais energia neste momento? Há alguma coisa fora do treino a afetar-te? Sentes que estás a conseguir desligar? De que apoio precisas para responder melhor a esta fase?",
      },
      {
        type: "paragraph",
        text: "A existência de relações de confiança e de apoio social está associada a melhores indicadores de saúde mental nos atletas. Isto não significa que o treinador se torne terapeuta. Significa que deve conhecer o atleta o suficiente para reconhecer alterações e facilitar o acesso ao apoio adequado.",
      },
      {
        type: "heading",
        text: "Prepara-te para aquilo que não controlas",
      },
      {
        type: "paragraph",
        text: "Grande parte do sofrimento no desporto nasce da tentativa de controlar o que não depende de ti: resultados, decisões do treinador, arbitragem, lesões, opinião pública, escolhas de dirigentes, comportamento dos adversários. Não precisas de fingir que estes fatores não importam, precisas de distinguir influência de controlo.",
      },
      {
        type: "paragraph",
        text: "Podes influenciar a probabilidade de seres selecionado através do treino, mas não controlas a decisão final. Podes preparar-te para competir, mas não controlas o resultado. Podes cumprir o plano de recuperação, mas não determinas sozinho o ritmo biológico de uma lesão. Essa distinção evita que gastes toda a energia mental em variáveis externas.",
      },
      {
        type: "quote",
        text: "Investe onde tens influência real. É aí que a tua energia se transforma em rendimento, e não em desgaste.",
        cite: "Filipa Marques",
      },
      {
        type: "heading",
        text: "Tem uma rede de apoio definida",
      },
      {
        type: "paragraph",
        text: "Deves saber, antes de precisares, a quem recorrer perante cada dificuldade: o treinador para questões de função e rendimento; a equipa médica para sintomas físicos; o psicólogo para sofrimento psicológico ou intervenção clínica; o profissional de acompanhamento mental para competências de rendimento; a família e as pessoas próximas para apoio fora do contexto competitivo.",
      },
      {
        type: "paragraph",
        text: "O consenso do Comité Olímpico Internacional defende uma abordagem integrada, em que saúde física e saúde mental não são tratadas como áreas separadas e os atletas são encaminhados atempadamente para os profissionais certos. A prevenção falha quando ninguém sabe quem deve agir ou quando toda a responsabilidade recai sobre o próprio atleta.",
      },
      {
        type: "heading",
        text: "Intervém nos sinais precoces",
      },
      {
        type: "paragraph",
        text: "Esperar pela crise aumenta o custo da intervenção. Mudanças no sono, irritabilidade persistente, dificuldade em desligar, isolamento, perda de prazer ou fadiga que não melhora devem ser observadas cedo. Isto não é diagnosticar o atleta nem suspender automaticamente a exigência, é perguntar, recolher informação e ajustar antes de o problema se agravar. Proteger a saúde mental não é reagir a tudo como patologia, mas também não é normalizar tudo como parte inevitável do alto rendimento.",
      },
      {
        type: "paragraph",
        text: "Reconhecer sinais a tempo começa por saber o que observar. No próximo tema exploramos, em detalhe, os sinais de alerta da saúde mental no atleta.",
      },
    ],
    faq: [
      {
        question: "Quando deve haver encaminhamento clínico?",
        answer:
          "Quando surgem sintomas persistentes, sofrimento significativo, alterações relevantes no funcionamento diário ou risco para o próprio atleta ou para terceiros.",
      },
      {
        question: "O que significa distinguir influência de controlo?",
        answer:
          "Significa investir energia naquilo que depende de ti, como o treino e a preparação, em vez de a gastar em resultados, decisões ou opiniões que não controlas.",
      },
      {
        question: "A quem deve o atleta recorrer em cada situação?",
        answer:
          "Ao treinador para rendimento, à equipa médica para sintomas físicos, ao psicólogo para sofrimento psicológico, ao profissional de acompanhamento mental para competências de rendimento e à rede próxima para apoio fora da competição.",
      },
    ],
  },
  // ── Série: Sinais de alerta na saúde mental ────────────────────────────
  {
    slug: "saude-mental-no-desporto-atleta-funcional-pode-nao-estar-bem",
    title:
      "Saúde mental no desporto: um atleta funcional também pode não estar bem",
    excerpt:
      "Continuar a treinar e a competir não é prova de que está tudo bem. Percebe porque o sofrimento psicológico passa despercebido no desporto e como não o confundir com atitude.",
    category: "Saúde Mental no Desporto",
    author: "Filipa Marques",
    publishedAt: "2026-07-22",
    readingMinutes: 6,
    keywords: [
      "saúde mental no desporto",
      "sofrimento psicológico",
      "psicologia do desporto",
      "atletas saúde mental",
    ],
    relatedSlugs: [
      "sinais-de-alerta-saude-mental-do-atleta",
      "lesao-exclusao-fim-de-carreira-quando-procurar-ajuda",
    ],
    coverImage: {
      src: "/img/editorial/tenis-jogador.webp",
      alt: "Tenista concentrado entre pontos, o peso do jogo por dentro",
    },
    body: [
      {
        type: "paragraph",
        text: "Um atleta começa a treinar pior, mostra-se mais irritável e afasta-se dos colegas. A explicação surge depressa: «Está desmotivado.» «Não sabe lidar com a pressão.» «Precisa de ser mentalmente mais forte.» Pode ser um problema de atitude. Mas também pode ser um sinal de que alguma coisa não está bem.",
      },
      {
        type: "paragraph",
        text: "No desporto, as alterações emocionais e comportamentais são quase sempre lidas através do rendimento. O risco é ignorar o sofrimento psicológico só porque o atleta continua a treinar, a competir ou a apresentar resultados. Um atleta pode continuar funcional e, ainda assim, não estar bem.",
      },
      {
        type: "heading",
        text: "Os atletas também enfrentam problemas de saúde mental",
      },
      {
        type: "paragraph",
        text: "Disciplina, resistência e sucesso não protegem ninguém de ansiedade, depressão, perturbações alimentares ou outras dificuldades psicológicas. Além do que pode afetar qualquer pessoa, os atletas estão expostos a fatores específicos: pressão constante para render, lesões, seleção e exclusão, críticas públicas, perda de estatuto, incerteza contratual, transições de carreira e uma identidade demasiado dependente do desempenho.",
      },
      {
        type: "paragraph",
        text: "O próprio contexto desportivo pode dificultar o pedido de ajuda. Num meio onde se valorizam o controlo, a resistência e o sacrifício, admitir sofrimento ainda é lido como falta de força ou de compromisso. Por isso, nem sempre o atleta diz claramente que precisa de apoio.",
      },
      {
        type: "quote",
        text: "O rendimento visível não revela o estado emocional. Há atletas que mantêm resultados durante meses apesar de não estarem bem.",
        cite: "Filipa Marques",
      },
      {
        type: "heading",
        text: "Uma fase difícil não é automaticamente um problema clínico",
      },
      {
        type: "paragraph",
        text: "Nem toda a tristeza é depressão. Nem todo o nervosismo é uma perturbação de ansiedade. Nem toda a falta de motivação é burnout. Uma derrota, uma lesão, uma exclusão ou um período de menor rendimento têm um impacto emocional natural.",
      },
      {
        type: "paragraph",
        text: "O que deve ser observado é a intensidade dos sintomas, há quanto tempo persistem, com que frequência aparecem e de que forma afetam a vida do atleta. Uma reação difícil depois de uma derrota pode ser esperada. Torna-se preocupante quando se prolonga, se agrava ou interfere com o sono, a alimentação, as relações, o treino ou a vida fora do desporto.",
      },
      {
        type: "paragraph",
        text: "O papel de treinadores, familiares e profissionais do rendimento não é diagnosticar. É reconhecer mudanças relevantes e encaminhar quando necessário. E para reconhecer, é preciso saber o que procurar, os sinais de alerta que vemos no próximo artigo.",
      },
    ],
    faq: [
      {
        question: "Um atleta com bons resultados pode estar em sofrimento psicológico?",
        answer:
          "Sim. O rendimento visível não revela necessariamente o estado emocional. Alguns atletas mantêm bons resultados durante períodos significativos apesar de não estarem bem.",
      },
      {
        question: "Uma fase difícil é sempre um problema de saúde mental?",
        answer:
          "Não. Derrotas, lesões e quebras de rendimento têm impacto emocional natural. Torna-se preocupante quando os sintomas persistem, se agravam ou afetam várias áreas da vida.",
      },
      {
        question: "Porque é que os atletas evitam pedir ajuda?",
        answer:
          "Porque, num meio que valoriza controlo, resistência e sacrifício, admitir sofrimento ainda é interpretado como falta de força ou de compromisso.",
      },
    ],
  },
  {
    slug: "sinais-de-alerta-saude-mental-do-atleta",
    title: "Sinais de alerta na saúde mental do atleta: o que observar",
    excerpt:
      "Irritabilidade, isolamento, alterações no sono ou no apetite. Conhece os sinais emocionais, comportamentais e físicos que não devem ser confundidos com disciplina.",
    category: "Saúde Mental no Desporto",
    author: "Filipa Marques",
    publishedAt: "2026-07-21",
    readingMinutes: 6,
    keywords: [
      "sinais de alerta saúde mental",
      "sintomas psicológicos atletas",
      "saúde mental no desporto",
      "psicologia do desporto",
    ],
    relatedSlugs: [
      "saude-mental-no-desporto-atleta-funcional-pode-nao-estar-bem",
      "lesao-exclusao-fim-de-carreira-quando-procurar-ajuda",
    ],
    coverImage: {
      src: "/img/editorial/atletismo-partida.webp",
      alt: "Atletas na tensão da partida, o corpo a revelar o que a mente esconde",
    },
    body: [
      {
        type: "paragraph",
        text: "O sofrimento psicológico nem sempre aparece sob a forma de tristeza visível. No desporto, muitas vezes esconde-se por trás de comportamentos que parecem apenas atitude, cansaço ou até profissionalismo. Saber o que observar é o que permite reconhecer mudanças a tempo.",
      },
      {
        type: "heading",
        text: "Sinais emocionais e comportamentais",
      },
      {
        type: "paragraph",
        text: "Fica atento a irritabilidade persistente, ansiedade difícil de controlar, alterações acentuadas de humor, apatia ou sensação de vazio, perda de interesse por atividades antes valorizadas, culpa excessiva, discurso muito negativo sobre si próprio e reações emocionais desproporcionadas a pequenos erros.",
      },
      {
        type: "paragraph",
        text: "Podem também surgir alterações no treino e na competição: quebra persistente de rendimento sem causa evidente, dificuldade de concentração, hesitação invulgar, faltas ou atrasos frequentes, menor envolvimento com a equipa, necessidade constante de confirmação, evitamento de responsabilidades e vontade recorrente de desistir.",
      },
      {
        type: "paragraph",
        text: "Um sinal isolado não permite concluir que existe um problema. O que merece atenção é uma mudança significativa e persistente em relação ao comportamento habitual do atleta.",
      },
      {
        type: "heading",
        text: "Alterações físicas e de rotina",
      },
      {
        type: "paragraph",
        text: "A saúde mental também se manifesta no corpo. Importa observar alterações relevantes no sono, fadiga que não melhora com descanso, mudanças no apetite ou no peso, queixas físicas recorrentes sem explicação clara, recuperação mais lenta, agitação constante, consumo crescente de álcool ou outras substâncias e preocupação rígida com alimentação, peso ou composição corporal.",
      },
      {
        type: "quote",
        text: "Treinar sempre a mais parece compromisso. Nunca descansar parece ambição. A diferença está na flexibilidade e nas consequências do comportamento.",
        cite: "Filipa Marques",
      },
      {
        type: "paragraph",
        text: "No desporto, alguns destes comportamentos confundem-se com disciplina. Controlar rigidamente a alimentação pode parecer profissionalismo. A pergunta certa não é «está a esforçar-se?», mas «este comportamento ainda é flexível e ao serviço do atleta, ou já se voltou contra ele?».",
      },
      {
        type: "heading",
        text: "Isolamento e perda de ligação",
      },
      {
        type: "paragraph",
        text: "Afastar-se pontualmente pode ser apenas uma necessidade de espaço. O isolamento persistente é diferente. Quando o atleta sente que só é reconhecido pelos resultados, tende a afastar-se precisamente no momento em que mais precisa de apoio.",
      },
      {
        type: "paragraph",
        text: "Alguns momentos aumentam de forma previsível esta vulnerabilidade, uma lesão, uma exclusão ou o fim de carreira. É sobre esses períodos, e sobre quando procurar ajuda especializada, que falamos a seguir.",
      },
    ],
    faq: [
      {
        question: "Um único sinal já indica um problema de saúde mental?",
        answer:
          "Não. Um sinal isolado não permite tirar conclusões. O que merece atenção é uma mudança significativa e persistente face ao comportamento habitual do atleta.",
      },
      {
        question: "Uma quebra de rendimento significa um problema de saúde mental?",
        answer:
          "Não necessariamente. Pode ter causas físicas, técnicas ou contextuais. Torna-se mais relevante quando persiste e vem acompanhada de outras alterações.",
      },
      {
        question: "Como distinguir disciplina de um sinal de alerta?",
        answer:
          "Pela flexibilidade, pela função do comportamento e pelas consequências que provoca. Disciplina serve o atleta; um sinal de alerta acaba por prejudicá-lo.",
      },
    ],
  },
  {
    slug: "lesao-exclusao-fim-de-carreira-quando-procurar-ajuda",
    title:
      "Lesão, exclusão e fim de carreira: quando procurar ajuda especializada",
    excerpt:
      "Há momentos que retiram muito mais do que a possibilidade de competir. Percebe quando uma fase difícil pede avaliação profissional e onde acaba o treino mental.",
    category: "Saúde Mental no Desporto",
    author: "Filipa Marques",
    publishedAt: "2026-07-20",
    readingMinutes: 6,
    keywords: [
      "apoio psicológico atletas",
      "lesão desportiva saúde mental",
      "fim de carreira atleta",
      "quando procurar ajuda psicológica",
    ],
    relatedSlugs: [
      "saude-mental-no-desporto-atleta-funcional-pode-nao-estar-bem",
      "sinais-de-alerta-saude-mental-do-atleta",
    ],
    coverImage: {
      src: "/img/editorial/futebol-bola.webp",
      alt: "Bola de futebol imóvel no relvado, a pausa forçada de uma carreira",
    },
    body: [
      {
        type: "paragraph",
        text: "Existem períodos em que a vulnerabilidade psicológica tende a aumentar. Uma lesão não retira apenas a possibilidade de competir. Pode retirar rotina, contacto com a equipa, sensação de progresso, autonomia, estatuto e identidade, tudo ao mesmo tempo.",
      },
      {
        type: "paragraph",
        text: "O mesmo pode acontecer após uma não convocatória, uma perda de contrato, uma mudança forçada de clube ou o fim da carreira. Nestes momentos, perguntar apenas «Quando voltas?» é insuficiente.",
      },
      {
        type: "quote",
        text: "Também é preciso perguntar: como estás a lidar com aquilo que esta situação te retirou?",
        cite: "Filipa Marques",
      },
      {
        type: "heading",
        text: "Quando procurar ajuda especializada",
      },
      {
        type: "paragraph",
        text: "Deve ser procurada avaliação profissional quando os sinais persistem durante várias semanas, aumentam de intensidade, afetam diferentes áreas da vida, comprometem o sono, a alimentação ou o funcionamento diário, levam ao evitamento de treinos ou competições, envolvem abuso de substâncias, incluem comportamentos autolesivos ou pensamentos sobre morte, ou colocam em risco a segurança do atleta ou de terceiros.",
      },
      {
        type: "heading",
        text: "Onde acaba o treino mental",
      },
      {
        type: "paragraph",
        text: "O treino mental e o acompanhamento de rendimento não substituem psicoterapia, psicologia clínica ou psiquiatria quando existe um problema de saúde mental. O trabalho de rendimento desenvolve competências como a regulação da ativação, o foco e a confiança, mas não é uma intervenção clínica.",
      },
      {
        type: "paragraph",
        text: "Reconhecer este limite não diminui o trabalho de rendimento, torna-o responsável. Um acompanhamento sério sabe reconhecer quando a prioridade deixou de ser melhorar o desempenho e passou a ser encaminhar o atleta para o apoio adequado.",
      },
      {
        type: "paragraph",
        text: "A saúde mental de um atleta não pode ser avaliada apenas pelos resultados. Ignorar mudanças persistentes só porque ele continua a competir é um erro. Proteger a saúde mental no alto rendimento não é reduzir a exigência, é garantir que a pessoa a consegue sustentar.",
      },
      {
        type: "paragraph",
        text: "No podcast INVISÍVEL, os episódios «O Outro Lado do Sucesso» e «Blues Pós-Competição» exploram momentos em que o rendimento exterior pode esconder desgaste, perda de direção ou sofrimento emocional. Se reconheces algo disto no teu percurso ou no de alguém que acompanhas, marca uma conversa.",
      },
    ],
    faq: [
      {
        question: "Quando é que uma fase difícil pede ajuda profissional?",
        answer:
          "Quando os sinais persistem por várias semanas, aumentam de intensidade, afetam várias áreas da vida ou envolvem risco para o próprio ou para terceiros.",
      },
      {
        question: "O treino mental resolve problemas de saúde mental?",
        answer:
          "Nem sempre. O treino mental trabalha competências de rendimento e autorregulação. Problemas clínicos exigem avaliação e intervenção de profissionais de saúde habilitados.",
      },
      {
        question: "Porque não basta perguntar a um atleta lesionado quando volta?",
        answer:
          "Porque a lesão pode retirar rotina, identidade, estatuto e ligação à equipa. É preciso perguntar também como está a lidar com tudo aquilo que a situação lhe retirou.",
      },
    ],
  },
  // ── Série: Burnout no desporto ─────────────────────────────────────────
  {
    slug: "burnout-no-desporto-o-que-e",
    title: "Burnout no desporto: quando o cansaço deixa de ser só cansaço",
    excerpt:
      "Estar cansado e desmotivado nem sempre é burnout. Percebe o que é mesmo o burnout do atleta, as suas três dimensões e o sinal mais revelador de todos.",
    category: "Inteligência Emocional",
    author: "Filipa Marques",
    publishedAt: "2026-07-19",
    readingMinutes: 6,
    keywords: [
      "burnout no desporto",
      "esgotamento do atleta",
      "burnout do atleta",
      "psicologia do desporto",
    ],
    relatedSlugs: [
      "cansaco-overtraining-ou-burnout-como-distinguir",
      "porque-acontece-o-burnout-no-atleta-e-o-que-ajuda",
    ],
    coverImage: {
      src: "/img/editorial/tenis-servico.webp",
      alt: "Tenista no serviço, o gesto repetido mil vezes até perder o sentido",
    },
    body: [
      {
        type: "paragraph",
        text: "Há fases em que o atleta está cansado, menos motivado e com dificuldade em manter o rendimento. Isso não significa automaticamente que esteja em burnout. O cansaço faz parte do treino, e depois de períodos exigentes é natural sentir fadiga, irritabilidade ou menor disponibilidade.",
      },
      {
        type: "paragraph",
        text: "O problema começa quando a recuperação deixa de acontecer e a relação do atleta com a modalidade se altera. Já não está apenas cansado de treinar. Está emocionalmente esgotado, sente que nada do que faz é suficiente e começa a afastar-se de algo que antes tinha significado.",
      },
      {
        type: "heading",
        text: "O que é o burnout no desporto?",
      },
      {
        type: "paragraph",
        text: "O burnout do atleta é habitualmente descrito através de três dimensões: esgotamento físico e emocional; redução da sensação de realização; e desvalorização ou afastamento em relação à modalidade. Não se trata apenas de falta de energia.",
      },
      {
        type: "paragraph",
        text: "O atleta começa a sentir que o investimento exigido já não produz progresso, satisfação ou sentido. Pode continuar a treinar e a competir, mas fá-lo de forma cada vez mais automática ou emocionalmente desligada.",
      },
      {
        type: "quote",
        text: "Dizer que um atleta em burnout «perdeu a vontade» é uma leitura incompleta. A perda de vontade costuma ser a consequência, não a causa.",
        cite: "Filipa Marques",
      },
      {
        type: "heading",
        text: "O sinal mais revelador: a mudança de significado",
      },
      {
        type: "paragraph",
        text: "Um dos sinais mais importantes do burnout não é o cansaço, é a mudança de significado. O atleta pode continuar disciplinado, cumprir o plano e até obter resultados, mas sente cada vez menos ligação àquilo que faz. A perda de vontade pode ser o resultado de um processo prolongado de exigência sem recuperação suficiente.",
      },
      {
        type: "paragraph",
        text: "Se o burnout não é apenas cansaço, então como o distingues do cansaço normal ou do overtraining? É isso que vemos no próximo artigo, com os sinais que ajudam a perceber a diferença.",
      },
    ],
    faq: [
      {
        question: "Estar cansado e desmotivado é sempre burnout?",
        answer:
          "Não. O cansaço faz parte do treino e melhora com recuperação. O burnout envolve, além do esgotamento, uma alteração na relação psicológica com a modalidade.",
      },
      {
        question: "Quais são as três dimensões do burnout do atleta?",
        answer:
          "Esgotamento físico e emocional, redução da sensação de realização e desvalorização ou afastamento em relação à modalidade.",
      },
      {
        question: "Um atleta em burnout pode continuar a ter bons resultados?",
        answer:
          "Sim. O rendimento pode manter-se durante algum tempo, apesar do desgaste psicológico e da perda de ligação à modalidade.",
      },
    ],
  },
  {
    slug: "cansaco-overtraining-ou-burnout-como-distinguir",
    title: "Cansaço, overtraining ou burnout? Aprende a distinguir",
    excerpt:
      "Fadiga, overtraining e burnout não são a mesma coisa. Aprende a distingui-los pelos sinais e percebe quando o descanso deixa de ser suficiente.",
    category: "Inteligência Emocional",
    author: "Filipa Marques",
    publishedAt: "2026-07-18",
    readingMinutes: 6,
    keywords: [
      "overtraining vs burnout",
      "sinais de burnout",
      "fadiga no desporto",
      "esgotamento do atleta",
    ],
    relatedSlugs: [
      "burnout-no-desporto-o-que-e",
      "porque-acontece-o-burnout-no-atleta-e-o-que-ajuda",
    ],
    coverImage: {
      src: "/img/editorial/forca-levantamento.webp",
      alt: "Atleta sob carga, o limite entre esforço saudável e desgaste",
    },
    body: [
      {
        type: "paragraph",
        text: "Cansaço, overtraining e burnout são frequentemente tratados como sinónimos. Não são. Perceber a diferença é o que permite responder de forma adequada, em vez de recomendar apenas mais uns dias de descanso quando o problema é outro.",
      },
      {
        type: "heading",
        text: "Cansaço normal",
      },
      {
        type: "paragraph",
        text: "Surge após uma carga elevada e tende a melhorar com repouso e recuperação. O atleta pode sentir fadiga, dores musculares, menos energia, irritabilidade pontual e vontade de descansar. Apesar disso, mantém a ligação à modalidade e recupera quando a carga diminui.",
      },
      {
        type: "heading",
        text: "Overtraining",
      },
      {
        type: "paragraph",
        text: "O overtraining está mais diretamente ligado a um desequilíbrio prolongado entre carga física e recuperação. Pode provocar quebra persistente de rendimento, maior perceção de esforço, alterações no sono, dores frequentes, redução do apetite, alterações de humor, dificuldade de concentração e maior suscetibilidade a doença ou lesão.",
      },
      {
        type: "paragraph",
        text: "Ainda assim, não existe uma fronteira totalmente simples entre fatores físicos e psicológicos. A carga total inclui treino, competição, viagens, sono, pressão emocional e acontecimentos fora do desporto.",
      },
      {
        type: "heading",
        text: "Burnout",
      },
      {
        type: "paragraph",
        text: "No burnout, além do esgotamento, aparece uma alteração na relação psicológica com o desporto. O atleta pode pensar «já não vejo sentido nisto», «por mais que faça, nunca chega», «só quero que o treino acabe», «já não me reconheço dentro da modalidade» ou «estou farto de viver sempre para o próximo resultado».",
      },
      {
        type: "quote",
        text: "Overtraining e burnout podem coexistir, mas não são a mesma coisa. Um é a resposta do corpo à carga; o outro é a erosão do sentido.",
        cite: "Filipa Marques",
      },
      {
        type: "heading",
        text: "Os principais sinais de burnout",
      },
      {
        type: "paragraph",
        text: "O burnout não aparece de um dia para o outro. Desenvolve-se pela acumulação de sinais: fadiga persistente, dificuldade em recuperar, perda de entusiasmo, sensação de estagnação, irritabilidade frequente, menor confiança, distanciamento emocional, treino feito só por obrigação, vontade de faltar ou abandonar, menor tolerância a erros, redução do sentimento de competência e indiferença perante resultados que antes eram importantes.",
      },
      {
        type: "paragraph",
        text: "Se estes sinais te são familiares, a pergunta seguinte é inevitável: porque é que o burnout acontece, e o que ajuda mesmo a sair dele? É esse o tema do próximo artigo.",
      },
    ],
    faq: [
      {
        question: "Cansaço, overtraining e burnout são a mesma coisa?",
        answer:
          "Não. O cansaço melhora com repouso; o overtraining é um desequilíbrio prolongado entre carga e recuperação; o burnout inclui ainda uma deterioração da motivação e da ligação à modalidade.",
      },
      {
        question: "Tirar férias resolve o burnout?",
        answer:
          "Pode aliviar a fadiga, mas será insuficiente se o atleta regressar às mesmas condições que produziram o desgaste.",
      },
      {
        question: "Burnout é o mesmo que depressão?",
        answer:
          "Não. São fenómenos distintos, embora alguns sintomas se possam sobrepor e coexistir. Perante dúvidas, é necessária uma avaliação profissional.",
      },
    ],
  },
  {
    slug: "porque-acontece-o-burnout-no-atleta-e-o-que-ajuda",
    title: "Porque acontece o burnout no atleta (e o que realmente ajuda)",
    excerpt:
      "O burnout raramente é só treinar demais. Conhece as causas reais — falta de controlo, perfeccionismo, identidade única — e o que ajuda a prevenir sem facilitar.",
    category: "Inteligência Emocional",
    author: "Filipa Marques",
    publishedAt: "2026-07-17",
    readingMinutes: 7,
    keywords: [
      "causas do burnout",
      "prevenir burnout no desporto",
      "perfeccionismo no atleta",
      "recuperação e autonomia",
    ],
    relatedSlugs: [
      "burnout-no-desporto-o-que-e",
      "cansaco-overtraining-ou-burnout-como-distinguir",
    ],
    coverImage: {
      src: "/img/editorial/atletismo-corrida.webp",
      alt: "Corredores em prova longa, o esforço que só se sustenta com equilíbrio",
    },
    body: [
      {
        type: "paragraph",
        text: "O burnout raramente resulta apenas de «treinar demasiado». Costuma nascer do encontro entre uma carga elevada e um conjunto de fatores psicológicos e de contexto que, juntos, retiram ao atleta a capacidade de recuperar e de encontrar sentido no que faz.",
      },
      {
        type: "heading",
        text: "Exigência prolongada sem recuperação",
      },
      {
        type: "paragraph",
        text: "Quando há competição constante, viagens, pouco descanso e pressão contínua, o organismo deixa de ter tempo para recuperar. O problema não é uma semana difícil, é a ausência prolongada de alternância entre carga e recuperação.",
      },
      {
        type: "heading",
        text: "Falta de controlo",
      },
      {
        type: "paragraph",
        text: "O atleta pode sentir que não decide quanto treina, quando descansa, se compete lesionado, que objetivos persegue, como é avaliado ou se pode expressar dificuldades. Quanto menor a autonomia, mais facilmente o compromisso é substituído por obrigação.",
      },
      {
        type: "heading",
        text: "Perfeccionismo rígido",
      },
      {
        type: "paragraph",
        text: "Ter padrões elevados pode apoiar o rendimento. O risco surge quando o atleta interpreta qualquer resultado abaixo do ideal como insuficiência pessoal. Preocupação excessiva com erros, crítica interna constante e a sensação de nunca fazer o suficiente estão entre os fatores associados ao burnout.",
      },
      {
        type: "heading",
        text: "Identidade exclusivamente desportiva e relações desgastantes",
      },
      {
        type: "paragraph",
        text: "Quando toda a vida se organiza à volta da modalidade, torna-se difícil criar distância psicológica: mesmo fora do treino, o atleta continua a pensar no corpo, no resultado ou na competição seguinte. A isto somam-se relações negativas, crítica constante, conflitos e falta de apoio. Em contrapartida, o sentimento de pertença, as relações de confiança e o apoio social funcionam como fatores protetores.",
      },
      {
        type: "quote",
        text: "O descanso resolve a fadiga. Não resolve um ambiente desgastante, falta de autonomia, perfeccionismo ou perda de sentido.",
        cite: "Filipa Marques",
      },
      {
        type: "heading",
        text: "O que fazer perante sinais de burnout",
      },
      {
        type: "paragraph",
        text: "A resposta não se pode limitar a dizer ao atleta para descansar dois dias. É preciso analisar a carga de treino e competição, a qualidade do sono, a pressão externa, a autonomia, os conflitos, a recuperação emocional, a relação atual com a modalidade, as expectativas e o perfeccionismo, e as dificuldades fora do desporto.",
      },
      {
        type: "paragraph",
        text: "Em alguns casos, será necessário reduzir ou reorganizar a carga. Noutros, o problema principal estará no ambiente, na ausência de controlo ou na forma como o atleta interpreta permanentemente o próprio rendimento. Também é importante recuperar experiências de competência e significado: voltar a perceber por que treina, o que ainda valoriza e se os objetivos que persegue continuam a fazer sentido. Quando há sofrimento significativo ou alterações persistentes de humor ou funcionamento, deve procurar-se avaliação de um profissional de saúde mental.",
      },
      {
        type: "heading",
        text: "Prevenir não é facilitar",
      },
      {
        type: "paragraph",
        text: "Prevenir o burnout não significa diminuir automaticamente a exigência. O atleta não precisa de ser protegido de todo o desconforto, precisa de não permanecer continuamente num contexto em que o esforço aumenta e os recursos diminuem. Instrumentos simples de autorrelato sobre fadiga, stress, recuperação e bem-estar, observados ao longo do tempo e não num dia isolado, ajudam a acompanhar a resposta à carga.",
      },
      {
        type: "paragraph",
        text: "Quando o atleta já não recupera, deixa de se reconhecer naquilo que faz e sente que nada é suficiente, insistir apenas em mais disciplina pode aprofundar o problema. Se é aí que estás, ou alguém que acompanhas, marca uma conversa, para olharmos para a carga, o contexto e o sentido em conjunto.",
      },
    ],
    faq: [
      {
        question: "O burnout resulta só de treinar demais?",
        answer:
          "Não. Envolve também falta de recuperação, ausência de controlo, perfeccionismo rígido, identidade exclusivamente desportiva e relações desgastantes no contexto do desporto.",
      },
      {
        question: "Atletas jovens também podem desenvolver burnout?",
        answer:
          "Sim. Especialização precoce, calendários intensos, pressão e falta de autonomia podem aumentar o risco de desgaste e de abandono desportivo.",
      },
      {
        question: "Prevenir o burnout significa reduzir a exigência?",
        answer:
          "Não. Significa garantir que o atleta não permanece continuamente num contexto em que o esforço aumenta e os recursos diminuem, mantendo recuperação, autonomia e sentido.",
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

/**
 * Taxonomy categories always shown as blog filters, even before any post
 * uses them yet. Lets new content areas be surfaced ahead of publishing.
 */
export const ADDITIONAL_CATEGORIES = ["Liderança e Equipas"] as const;

/**
 * Categories for the blog filters: those in use (ordered by post count desc,
 * then first appearance) followed by any additional taxonomy categories that
 * don't have posts yet.
 */
export async function getAllCategories(): Promise<string[]> {
  const all = await getAllPosts();
  const counts = new Map<string, number>();
  const firstSeen = new Map<string, number>();
  all.forEach((post, i) => {
    counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
    if (!firstSeen.has(post.category)) firstSeen.set(post.category, i);
  });
  const derived = [...counts.keys()].sort((a, b) => {
    const byCount = (counts.get(b) ?? 0) - (counts.get(a) ?? 0);
    return byCount !== 0
      ? byCount
      : (firstSeen.get(a) ?? 0) - (firstSeen.get(b) ?? 0);
  });
  const extras = ADDITIONAL_CATEGORIES.filter((c) => !derived.includes(c));
  return [...derived, ...extras];
}

/**
 * URL-friendly slug for a category label.
 * e.g. "Saúde Mental no Desporto" → "saude-mental-no-desporto".
 */
export function categorySlug(category: string): string {
  return category
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Resolve a category slug back to its label, or null if unknown. */
export function categoryFromSlug(
  slug: string,
  categories: string[],
): string | null {
  return categories.find((c) => categorySlug(c) === slug) ?? null;
}
