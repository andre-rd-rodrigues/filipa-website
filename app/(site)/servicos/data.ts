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
      "Acompanhamento um-para-um para clarificar objectivos, tirar peso da cabeça e agir com foco — sessão a sessão, no teu ritmo.",
    includes: [
      "Sessão de diagnóstico inicial",
      "Plano de objectivos personalizado",
      "Ferramentas de PNL e gestão emocional",
    ],
  },
  {
    number: "02",
    title: "Coaching de equipas & workshops",
    description:
      "Dinâmicas práticas para reforçar comunicação, coesão e desempenho colectivo — pensadas para o dia a dia da equipa, não para a sala de aula.",
    includes: [
      "Workshops presenciais ou online",
      "Dinâmicas de grupo à medida",
      "Guia de seguimento para a equipa técnica",
    ],
  },
  {
    number: "03",
    title: "Inteligência emocional no desporto",
    description:
      "Reconhecer e gerir emoções sob pressão — do momento decisivo ao pós-jogo — para competir com a cabeça no sítio certo.",
    includes: [
      "Mapa das tuas emoções em competição",
      "Rotinas de regulação antes e durante o jogo",
      "Estratégias de recuperação mental",
    ],
  },
  {
    number: "04",
    title: "Comunicação em campo (PNL)",
    description:
      "Linguagem e influência aplicadas ao terreno: como treinadores e atletas dizem o que importa, no momento em que importa.",
    includes: [
      "Padrões de linguagem para dar feedback",
      "Comunicação sob stress e em conflito",
      "Aplicação directa a treino e balneário",
    ],
  },
  {
    number: "05",
    title: "Palestras & formação",
    description:
      "Sessões para clubes, escolas e organizações — conteúdo prático sobre mente, emoção e comunicação, adaptado ao teu público.",
    includes: [
      "Palestras de 60 a 90 minutos",
      "Temas à medida do clube ou escola",
      "Materiais de apoio para os participantes",
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
      "Para quem quer competir com a mente ao mesmo nível do corpo — gerir pressão, ganhar foco e recuperar da derrota.",
  },
  {
    title: "Treinadores & equipas técnicas",
    description:
      "Para quem lidera pessoas e precisa de comunicar melhor, criar coesão e tirar o máximo de cada atleta.",
  },
  {
    title: "Clubes & organizações",
    description:
      "Para estruturas que querem levar coaching, inteligência emocional e PNL a atletas, staff e formadores.",
  },
];
