/**
 * Content for the /sobre page.
 *
 * Values and credentials below are based on Filipa's real "Quem sou eu?" page.
 * Copy is adapted to the brand voice in PRODUCT.md (pt-PT, `tu`, dinâmica e
 * próxima). Confirm exact certification names/entities before launch if precise
 * wording matters for accreditation.
 */

export type Principle = {
  title: string;
  body: string;
};

/** Filipa's three core values (from the real "Valores" section). pt-PT, `tu`. */
export const approach: Principle[] = [
  {
    title: "Respeito",
    body: "O teu percurso é único e, como tal, merece ser respeitado. Escuto sem julgamentos e caminho ao teu lado, respeitando sempre o teu tempo. O que partilhamos é sagrado: a tua privacidade e confidencialidade são a base absoluta da nossa relação.",
  },
  {
    title: "Individualidade",
    body: "Porque não existem duas pessoas iguais, o teu caminho nunca será uma cópia. Aqui, não te tento encaixar em fórmulas pré-feitas; o método é desenhado à tua medida, alinhado com os teus objetivos e, acima de tudo, com o teu próprio ritmo.",
  },
  {
    title: "Compromisso",
    body: "Não estou aqui para te dar o que te falta, mas para te ajudar a potenciar o que já tens. O meu compromisso é total: dedicação genuína para despertar o teu melhor e acompanhar-te, passo a passo, até onde queres chegar.",
  },
];

export type Credential = {
  title: string;
  detail: string;
};

/**
 * Formations and certifications.
 *
 * Based on Filipa's real credentials listed on the current Canva site.
 * Verify exact titles/awarding bodies before adding to structured data.
 */
export const credentials: Credential[] = [
  {
    title: "Licenciatura em Psicologia",
    detail: "A base clínica e científica que sustenta todo o trabalho: perceber como a mente funciona antes de a treinar.",
  },
  {
    title: "Pós-Graduação em Psicologia do Desporto",
    detail: "Otimização do desempenho através do desenvolvimento mental e emocional do atleta: a psicologia aplicada ao que acontece em campo.",
  },
  {
    title: "Certificação em Psicologia para o Treinador no Alto Rendimento",
    detail: "O alto rendimento nasce de uma mente preparada e resiliente. Ferramentas, com base na psicologia, para chegar a níveis de excelência.",
  },
  {
    title: "Master Trainer em Programação Neurolinguística (PNL)",
    detail: "PNL para compreender como os teus programas mentais estão organizados e como moldam a forma como pensas e ages.",
  },
  {
    title: "Certificação em Coaching",
    detail: "Técnicas e ferramentas para te conduzir num percurso de autoconhecimento e crescimento, ao teu lado e ao teu ritmo.",
  },
  {
    title: "Formadora certificada",
    detail: "Formação em Comunicação, PNL, Inteligência Emocional e Coaching, para quem quer levar estas competências para a sua equipa.",
  },
];
