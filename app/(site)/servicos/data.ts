/**
 * Mocked pt-PT content for the /servicos page. Structure is final; copy is
 * placeholder awaiting Filipa's approved wording.
 */

export type Service = {
  number: string;
  title: string;
  description: string;
  includes?: string[];
};

/** Signature numbered service-row list. */
export const services: Service[] = [
  {
    number: "01",
    title: "Coaching individual",
    description:
      "Trabalhamos lado a lado, focados no teu objetivo. Usamos a Psicologia e a PNL para treinares a tua mente a dominar a pressão, manter o foco sob stress e chegar onde o talento sozinho não te consegue levar.",
    includes: [
      "Sessão de diagnóstico inicial",
      "Plano de objetivos personalizado",
      "Ferramentas práticas de PNL e gestão emocional",
    ],
  },
  {
    number: "02",
    title: "Coaching de equipas & workshops",
    description:
      "Uma equipa alinhada joga melhor e ganha mais. Uso o coaching e a PNL para colocar atletas e staff a comunicar com clareza, a construir confiança mútua e a competir como um só bloco.",
    includes: [
      "Workshops presenciais ou online",
      "Dinâmicas de grupo personalizadas",
      "Guia de acompanhamento para a equipa técnica",
    ],
  },
  {
    number: "03",
    title: "Inteligência emocional no desporto",
    description:
      "As emoções decidem campeonatos. Aprende a identificá-las e a usá-las a teu favor, do aquecimento ao apito final, para competires sempre com a mente no sítio certo.",
    includes: [
      "Mapeamento emocional em competição",
      "Rotinas de regulação pré e pós-jogo",
      "Estratégias de recuperação mental ativa",
    ],
  },
  {
    number: "04",
    title: "Comunicação em campo (PNL)",
    description:
      "A forma como comunicas dita o comportamento da tua equipa. Aplicamos a PNL e técnicas de influência ao terreno de jogo, para que saibas exatamente o que dizer no momento de maior pressão.",
    includes: [
      "Padrões de linguagem de alto impacto",
      "Gestão de comunicação sob stress e conflito",
      "Aplicação prática em treino e balneário",
    ],
  },
  {
    number: "05",
    title: "Palestras & formação",
    description:
      "Levo o treino mental, a inteligência emocional e a comunicação ao teu clube ou associação. Entrego conteúdo prático e dinâmico, desenhado à medida, que continua a gerar impacto muito depois de a sessão terminar.",
    includes: [
      "Palestras e masterclasses dinâmicas",
      "Temas totalmente personalizados",
      "Ferramentas e materiais de apoio pós-formação",
    ],
  },
];

export type Audience = {
  title: string;
  description: string;
};

/** "Para quem" — editorial audience blurbs (not decorative cards). */
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
