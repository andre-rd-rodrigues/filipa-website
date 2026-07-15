/**
 * Services data layer.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * SANITY-READY BY DESIGN
 * ─────────────────────────────────────────────────────────────────────────
 * Content here is authored by a non-technical editor, so it mirrors the exact
 * pattern used by lib/courses.ts and lib/blog.ts. The public surface is a set
 * of *async* functions returning plain data (POJOs). The mock array below is
 * NOT exported — pages only call `getAllServices` / `getServiceBySlug`.
 * Swapping to Sanity later is a drop-in: implement the bodies with the Sanity
 * client and keep the same return shapes.
 *
 * Fields are intentionally granular (one field/array per editable block) so
 * they map 1:1 to Sanity Studio inputs and stay easy to edit.
 *
 * Intended Sanity document type `service`:
 *   slug (slug), number (string), title (string), summary (text),
 *   description (text), audience (string), includes (array<string>),
 *   intro (array<text>), benefits (array<string>),
 *   process (array<{ title, body }>),
 *   ctas (array<{ label, href, variant }>), image ({ asset, alt }).
 *
 * When wiring Sanity (future):
 *   getAllServices ->
 *     sanity.fetch(groq`
 *       *[_type == "service"] | order(orderRank){
 *         "slug": slug.current, number, title, summary, description, audience,
 *         includes, intro, benefits, process[]{ title, body },
 *         ctas[]{ label, href, variant },
 *         "image": { "src": image.asset->url, "alt": image.alt }
 *       }
 *     `)
 *   getServiceBySlug ->
 *     sanity.fetch(groq`*[_type == "service" && slug.current == $slug][0]{ ... }`,
 *       { slug })
 *
 * NOTE: Copy structure is final; the long-form fields (`summary`, `intro`,
 * `benefits`, `process`, `audience`) are PLACEHOLDER pt-PT wording awaiting
 * Filipa's approval. Images reuse the existing /img/profile-*.jpg assets —
 * replace with per-service photography when available.
 */

/** A single "O que vais ganhar" item — optional bold label + description. */
export type ServiceBenefit = { label?: string; description: string };

/** A single step in the "Como funciona" flow. */
export type ServiceProcessStep = { title: string; lead?: string; body: string };

/** Closing CTA copy for the detail page (falls back to generic defaults). */
export type ServiceClosing = { heading?: string; lead?: string; body?: string };

export type Service = {
  slug: string;
  /** Signature two-digit index used by the listing rows, e.g. "01". */
  number: string;
  title: string;
  /** Short qualifier shown as a pill on the detail page, e.g. "Para atletas". */
  tag?: string;
  /** Tagline shown under the title in the hero. */
  subtitle?: string;
  /** Short pitch — used on the listing and as the meta description. */
  summary: string;
  /** Listing blurb — the longer paragraph shown in the service row. */
  description: string;
  /** Mocked editorial photo, ready to be replaced with real assets. */
  image: { src: string; alt: string };
  /** Introduction paragraphs on the detail page. */
  intro?: string[];
  /** "O que vais ganhar" — concrete outcomes. */
  benefits?: ServiceBenefit[];
  /** "Como funciona" — the delivery flow, step by step. */
  process?: ServiceProcessStep[];
  /** "Para quem" — who the service is for. */
  audience?: string;
  /** "O que está incluído". */
  includes?: string[];
  /** Calls to action rendered as pill buttons, in order. */
  ctas?: { label: string; href: string; variant: "primary" | "secondary" }[];
  /** Closing CTA copy for the detail page. */
  closing?: ServiceClosing;
};

/**
 * Mock content. Not exported — reach it only through the async accessors so
 * call sites are already shaped for a remote source.
 */
const services: Service[] = [
  {
    slug: "treino-mental-individual",
    number: "01",
    title: "Treino mental individual",
    tag: "Para atletas",
    subtitle: "O teu plano de jogo exclusivo para o alto rendimento",
    summary:
      "Treino mental com Psicologia do Desporto e PNL para dominares a pressão, blindares o teu foco e chegares onde o teu talento sozinho não chega.",
    description:
      "Trabalhamos lado a lado, focados no teu objetivo. Unimos a Psicologia do Desporto à PNL para treinares a tua mente a dominar a pressão, a manter o foco sob stress e a atingir o patamar que o teu talento sozinho não consegue garantir.",
    image: {
      src: "/img/profile-2.jpg",
      alt: "Filipa Marques em sessão de coaching individual",
    },
    audience:
      "Atletas que querem competir com a mente ao mesmo nível do corpo, gerindo a pressão e recuperando rapidamente do erro ou da derrota.",
    includes: [
      "Sessão de diagnóstico inicial",
      "Plano de objetivos personalizado",
      "Ferramentas práticas de PNL e gestão emocional",
    ],
    intro: [
      "O teu talento abre-te a porta, mas é a tua mente que decide o que fazes depois de entrares em campo.",
      "No treino mental individual, não trabalhamos com fórmulas genéricas. Partimos do teu objetivo concreto para desenhar, juntos, um plano de jogo mental estritamente à tua medida.",
      "Cruzamos a base científica da Psicologia do Desporto com a eficácia prática e imediata da PNL. O objetivo é simples: treinares a forma como pensas, sentes e reages nos momentos de maior stress, para que jogues sempre ao teu melhor nível — do treino diário ao apito final da competição.",
    ],
    benefits: [
      {
        label: "Domínio sob pressão",
        description:
          "Controlar os picos de ansiedade competitiva e manter a lucidez tática quando o resultado está em jogo.",
      },
      {
        label: "Foco blindado",
        description:
          "Manter a concentração máxima no que controlas, ignorando o ruído das bancadas, da arbitragem ou do adversário.",
      },
      {
        label: "Resiliência tática",
        description:
          "Recuperar rapidamente da frustração de um erro, de uma lesão ou de uma derrota para focar de imediato na jogada seguinte.",
      },
      {
        label: "Confiança ativa",
        description:
          "Transformar as tuas crenças limitadoras em convicção profunda e clareza mental para decidires com eficácia.",
      },
      {
        label: "Praticidade imediata",
        description:
          "Sair de cada sessão com ferramentas concretas e um plano de ação claro para aplicares já no próximo treino.",
      },
    ],
    process: [
      {
        title: "Diagnóstico",
        lead: "Uma primeira conversa para mapear os teus bloqueios.",
        body: "Um contacto inicial sem compromisso para percebermos exatamente onde estás hoje, qual é o patamar que queres atingir e o que está a travar a tua performance.",
      },
      {
        title: "Plano personalizado",
        lead: "A estratégia desenhada à tua medida.",
        body: "Definimos metas claras para a época desportiva e selecionamos as ferramentas de PNL e regulação emocional específicas que vamos treinar juntos.",
      },
      {
        title: "Acompanhamento",
        lead: "Consistência no terreno.",
        body: "Sessões regulares para aplicar técnicas, ajustar dinâmicas e consolidar competências mentais, sempre focados no teu progresso e na tua autonomia em competição.",
      },
    ],
    ctas: [
      {
        label: "Marcar Sessão de Diagnóstico",
        href: "/contactos",
        variant: "primary",
      },
    ],
    closing: {
      heading: "Vamos desenhar o teu plano de jogo?",
      lead: "O teu próximo nível começa aqui.",
      body: "Vamos conversar? Agenda uma sessão de diagnóstico sem compromisso e descobrimos, lado a lado, o caminho ideal para ti.",
    },
  },
  {
    slug: "coaching-de-equipas",
    number: "02",
    title: "Coaching de equipas & workshops",
    tag: "Para equipas",
    summary:
      "Coaching de equipas e PNL para colocar atletas e staff a comunicar com clareza, a construir confiança mútua e a competir como um só bloco.",
    description:
      "Uma equipa alinhada joga melhor e ganha mais. Uso o coaching e a PNL para colocar atletas e staff a comunicar com clareza, a construir confiança mútua e a competir como um só bloco nos momentos de maior pressão.",
    image: {
      src: "/img/profile-1.jpg",
      alt: "Sessão de coaching de equipa em grupo",
    },
    audience:
      "Equipas, equipas técnicas e grupos desportivos que querem alinhar a comunicação, resolver conflitos de balneário e reforçar a coesão.",
    includes: [
      "Workshops práticos (presenciais ou online)",
      "Dinâmicas de grupo personalizadas no terreno",
      "Guia de acompanhamento para a equipa técnica",
    ],
    intro: [
      "Uma equipa é muito mais do que a soma dos seus talentos individuais. É a forma como comunica, confia e decide sob stress que separa os grupos que ganham campeonatos daqueles que se desfazem no momento decisivo.",
      "Nos workshops de equipa, uso o coaching e a PNL para construir uma linguagem comum, solidificar a confiança mútua e criar uma cultura competitiva forte que se mantém viva no balneário muito depois de a sessão terminar.",
    ],
    benefits: [
      {
        label: "Sintonia tática",
        description:
          "Comunicação sem ruído e muito mais clara entre atletas, capitães e equipa técnica.",
      },
      {
        label: "Confiança de balneário",
        description:
          "Maior coesão e segurança dentro do grupo, criando um bloco protetor nas fases difíceis.",
      },
      {
        label: "Resolução de conflitos sob stress",
        description:
          "Ferramentas táticas e comportamentais para gerir tensões internas e focar o grupo na solução.",
      },
      {
        label: "Identidade forte",
        description:
          "Uma cultura competitiva partilhada e assumida por todos, do staff ao atleta que entra a substituir.",
      },
    ],
    process: [
      {
        title: "Levantamento",
        body: "Conversamos com a estrutura e com a equipa técnica para mapear o contexto, os objetivos e as reais dores do grupo.",
      },
      {
        title: "Workshop à medida",
        body: "Dinâmicas de grupo personalizadas, focadas nas vossas necessidades de comunicação e coesão sob pressão.",
      },
      {
        title: "Continuidade",
        body: "Entrego um guia de acompanhamento prático para que o treinador e o staff mantenham as dinâmicas vivas nos treinos diários.",
      },
    ],
    ctas: [
      { label: "Pedir proposta", href: "/contactos", variant: "primary" },
    ],
  },
  {
    slug: "inteligencia-emocional-no-desporto",
    number: "03",
    title: "Inteligência emocional no desporto",
    tag: "Para atletas e profissionais",
    summary:
      "Identifica as tuas emoções e usa-as a teu favor, do aquecimento ao apito final, para competires sempre com a mente no sítio certo.",
    description:
      "As emoções decidem campeonatos. Aprende a identificá-las, a regulá-las e a usá-las a teu favor, do aquecimento ao apito final, para competires sempre com a mente no sítio certo e sob controlo absoluto.",
    image: {
      src: "/img/profile-3.jpg",
      alt: "Atleta em momento de concentração e serenidade",
    },
    audience:
      "Atletas, treinadores e profissionais do desporto que procuram o domínio mental e o controlo das suas reações em competição.",
    includes: [
      "Mapeamento emocional sob pressão",
      "Rotinas de regulação pré, durante e pós-jogo",
      "Estratégias de recuperação mental ativa",
    ],
    intro: [
      "As emoções não se desligam quando entras em campo. Mas podes aprender a reconhecer os teus gatilhos e a usar o que sentes a teu favor, em vez de seres arrastado pelo descontrolo do momento.",
      "Trabalhamos a inteligência emocional aplicada à competição real: do nervosismo que antecede o apito inicial à frustração que surge logo após o erro, transformamos a tua resposta emocional num recurso estratégico de performance.",
    ],
    benefits: [
      {
        label: "Autonomia emocional",
        description:
          "Identificar os teus padrões físicos e mentais no exato momento em que eles tentam tirar-te do jogo.",
      },
      {
        label: "Ação com intenção",
        description:
          "Responder com tática e foco em vez de reagires por impulso, sobretudo nos momentos de maior provocação ou pressão.",
      },
      {
        label: "Rotinas de campo",
        description:
          "Criar âncoras e rotinas de regulação emocional rápidas para usares no aquecimento, nas pausas e no pós-jogo.",
      },
      {
        label: "Foco limpo",
        description:
          "Recuperar mentalmente da frustração de forma rápida e com método, mantendo a consistência ao longo da época.",
      },
    ],
    process: [
      {
        title: "Mapeamento emocional",
        body: "Identificamos os teus padrões emocionais em competição e mapeamos o que desencadeia a tua perda de foco.",
      },
      {
        title: "Rotinas de regulação",
        body: "Desenhamos rotinas práticas pré e pós-jogo para que consigas entrar e sair de campo com a mente no sítio certo.",
      },
      {
        title: "Recuperação ativa",
        body: "Treinamos as tuas competências de resiliência e recuperação tática para manteres o teu rendimento estável.",
      },
    ],
    ctas: [
      { label: "Marcar sessão", href: "/contactos", variant: "primary" },
    ],
  },
  {
    slug: "comunicacao-em-campo-pnl",
    number: "04",
    title: "Comunicação em campo (PNL)",
    tag: "Para treinadores e líderes",
    summary:
      "PNL e técnicas de influência aplicadas ao terreno de jogo para saberes exatamente o que dizer, e como dizer, no momento de maior stress.",
    description:
      "A forma como comunicas dita o comportamento da tua equipa. Aplicamos a PNL e técnicas de influência comportamental ao terreno de jogo para saberes exatamente o que dizer, e como dizer, no momento de maior stress.",
    image: {
      src: "/img/profile-2.jpg",
      alt: "Treinador a comunicar com a equipa em campo",
    },
    audience:
      "Treinadores, coordenadores, capitães e líderes desportivos que precisam de comunicar com impacto imediato no momento decisivo.",
    includes: [
      "Padrões de linguagem de alto impacto tático",
      "Gestão de comunicação sob stress extremo e conflito",
      "Aplicação prática e direta em treino e balneário",
    ],
    intro: [
      "A forma como comunicas dita o comportamento da tua equipa. Uma instrução clara no momento certo pode mudar o rumo de um campeonato; uma palavra mal direcionada pode desmoronar a confiança de um plantel inteiro.",
      "Através da PNL e de técnicas de influência e liderança, trabalhamos a tua comunicação verbal e não-verbal no terreno de jogo, garantindo que a tua mensagem é descodificada instantaneamente pelos atletas, mesmo sob cansaço extremo.",
    ],
    benefits: [
      {
        label: "Feedback de alto rendimento",
        description:
          "Aprender a dar indicações e correções que motivam e corrigem em vez de bloquearem o atleta.",
      },
      {
        label: "Comunicação adaptativa",
        description:
          "Ajustar a tua linguagem corporal, tom de voz e palavras ao perfil e ritmo de cada atleta da tua equipa.",
      },
      {
        label: "Controlo sob stress",
        description:
          "Liderar e comunicar com clareza tática e segurança, mesmo em cenários de conflito ou de alta pressão do cronómetro.",
      },
      {
        label: "Liderança de balneário",
        description:
          "Estruturar discursos de intervalo e rotinas de comunicação de treino que criam foco imediato e ação coletiva.",
      },
    ],
    process: [
      {
        title: "Diagnóstico de comunicação",
        body: "Analisamos como lideras e comunicas hoje, identificando onde a tua mensagem se perde entre a tua intenção e o comportamento da equipa.",
      },
      {
        title: "Padrões de impacto",
        body: "Treinamos padrões de linguagem corporal e verbal específicos da PNL que aumentam a tua capacidade de influência.",
      },
      {
        title: "Aplicação prática",
        body: "Levamos o treino para os cenários reais do teu clube: os discursos de balneário, as instruções rápidas de banco e os momentos de conflito.",
      },
    ],
    ctas: [
      { label: "Marcar sessão", href: "/contactos", variant: "primary" },
    ],
  },
  {
    slug: "palestras-e-formacao",
    number: "05",
    title: "Palestras & formação",
    tag: "Para clubes e organizações",
    summary:
      "Treino mental, inteligência emocional e comunicação aplicados à realidade do teu clube ou associação, com conteúdo dinâmico e 100% à medida.",
    description:
      "Levo o treino mental, a inteligência emocional e a comunicação prática ao teu clube ou associação. Entrego sessões dinâmicas e de alto impacto, desenhadas à medida do teu público, que continuam a gerar resultados muito depois de eu sair.",
    image: {
      src: "/img/profile-1.jpg",
      alt: "Filipa Marques a dar uma palestra",
    },
    audience:
      "Clubes, academias de formação, associações desportivas e organizações que querem integrar a psicologia do desporto, a IE e a PNL nas suas estruturas.",
    includes: [
      "Palestras e masterclasses dinâmicas",
      "Temáticas personalizadas à vossa realidade competitiva",
      "Ferramentas e materiais de apoio prático pós-formação",
    ],
    intro: [
      "Levo o treino mental, a inteligência emocional e a comunicação tática ao teu clube ou associação, em formato de palestra ou masterclass prática, presencial ou online.",
      "Sem teorias abstratas ou discursos vazios. Entrego conteúdo dinâmico, baseado na ciência da Psicologia do Desporto e na PNL, desenhado à medida do vosso escalão, modalidade e objetivos para a época.",
    ],
    benefits: [
      {
        label: "Conteúdo exclusivo",
        description:
          "Uma sessão estruturada e adaptada especificamente à realidade competitiva do teu clube ou modalidade.",
      },
      {
        label: "Dinâmicas com utilidade",
        description:
          "Palestras interativas e focadas no terreno, desenhadas para manter o público atento do início ao fim.",
      },
      {
        label: "Ferramentas pós-formação",
        description:
          "Guias, exercícios e materiais de apoio para que atletas, treinadores ou pais possam continuar a praticar depois da sessão.",
      },
      {
        label: "Cultura de clube forte",
        description:
          "Alinhamento de mentalidade entre atletas de formação, equipas técnicas e encarregados de educação.",
      },
    ],
    process: [
      {
        title: "Briefing",
        body: "Alinhamos contigo as necessidades da vossa estrutura, os objetivos da sessão e o público-alvo (atletas, pais ou treinadores).",
      },
      {
        title: "Sessão personalizada",
        body: "Palestra ou masterclass desenhada de raiz, com dinâmicas aplicáveis e exemplos retirados da vossa realidade competitiva.",
      },
      {
        title: "Material de suporte",
        body: "Entrego ferramentas e materiais pós-formação para que a tua estrutura continue a aplicar o treino mental de forma autónoma.",
      },
    ],
    ctas: [
      { label: "Pedir proposta", href: "/contactos", variant: "primary" },
    ],
  },
];

/** Simulates network latency so call sites already handle async. */
async function delay<T>(value: T): Promise<T> {
  return value;
}

/**
 * All services, in editorial order.
 *
 * Sanity (future): return sanity.fetch(groq`*[_type == "service"] | order(orderRank){ ... }`);
 */
export async function getAllServices(): Promise<Service[]> {
  return delay(services);
}

/**
 * A single service by slug, or null if not found.
 *
 * Sanity (future):
 *   return sanity.fetch(
 *     groq`*[_type == "service" && slug.current == $slug][0]{ ... }`,
 *     { slug },
 *   );
 */
export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const service = services.find((s) => s.slug === slug) ?? null;
  return delay(service);
}

export type Audience = {
  title: string;
  description: string;
};

/** "Para quem" — editorial audience blurbs used on the /servicos listing. */
export const audiences: Audience[] = [
  {
    title: "Atletas",
    description:
      "Para quem quer competir com a mente ao mesmo nível do corpo, gerindo a pressão, mantendo o foco e recuperando rapidamente do erro ou da derrota.",
  },
  {
    title: "Treinadores & equipas técnicas",
    description:
      "Para líderes que procuram otimizar a sua comunicação, criar uma forte coesão de grupo e extrair o potencial máximo de cada atleta.",
  },
  {
    title: "Clubes & organizações",
    description:
      "Para estruturas que querem levar coaching, inteligência emocional e PNL a atletas, staff e formadores.",
  },
];
