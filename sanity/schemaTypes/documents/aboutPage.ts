import { defineType, defineField } from "sanity";

/** Página "Sobre" (documento único). */
export const aboutPage = defineType({
  name: "aboutPage",
  title: "Página Sobre",
  type: "document",
  groups: [
    { name: "bio", title: "Biografia", default: true },
    { name: "valores", title: "Valores" },
    { name: "formacao", title: "Formação" },
    { name: "clubes", title: "Clubes" },
    { name: "cta", title: "Chamada final" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "heroTitle", title: "Título da página", type: "string", initialValue: "Sobre mim", group: "bio" }),
    defineField({
      name: "portrait",
      title: "Retrato",
      type: "figure",
      group: "bio",
    }),
    defineField({ name: "portraitCaption", title: "Legenda do retrato", type: "string", group: "bio" }),
    defineField({ name: "bioTitle", title: "Título da biografia", type: "text", rows: 2, group: "bio" }),
    defineField({
      name: "bio",
      title: "Biografia",
      type: "text",
      rows: 12,
      description:
        "Markdown simples. Linha em branco = novo parágrafo. Suporta **negrito**, *itálico* e [links](url).",
      group: "bio",
    }),
    // Valores
    defineField({ name: "valuesEyebrow", title: "Etiqueta", type: "string", group: "valores" }),
    defineField({ name: "valuesTitle", title: "Título", type: "text", rows: 2, group: "valores" }),
    defineField({
      name: "values",
      title: "Valores",
      type: "array",
      of: [{ type: "principle" }],
      group: "valores",
    }),
    // Formação
    defineField({ name: "credentialsEyebrow", title: "Etiqueta", type: "string", group: "formacao" }),
    defineField({ name: "credentialsTitle", title: "Título", type: "text", rows: 2, group: "formacao" }),
    defineField({ name: "credentialsIntro", title: "Introdução", type: "text", rows: 3, group: "formacao" }),
    defineField({
      name: "credentialsImage",
      title: "Imagem",
      type: "figure",
      group: "formacao",
    }),
    defineField({
      name: "credentials",
      title: "Formações e certificações",
      type: "array",
      of: [{ type: "credential" }],
      group: "formacao",
    }),
    // Clubes (lista em Conteúdo → Clubes)
    defineField({
      name: "clubsTitle",
      title: "Título dos clubes",
      type: "string",
      description:
        'Ex.: "Clubes dos atletas que acompanho". Usado na página inicial e em Sobre. A lista de clubes edita-se em Conteúdo → Clubes.',
      group: "clubes",
      initialValue: "Clubes dos atletas que acompanho",
    }),
    // CTA final
    defineField({
      name: "ctaImage",
      title: "Imagem",
      type: "figure",
      group: "cta",
    }),
    defineField({ name: "ctaTitle", title: "Título", type: "text", rows: 2, group: "cta" }),
    defineField({ name: "ctaBody", title: "Descrição", type: "text", rows: 3, group: "cta" }),
    defineField({
      name: "ctas",
      title: "Botões",
      type: "array",
      of: [{ type: "cta" }],
      group: "cta",
    }),
    defineField({ name: "seo", title: "SEO e partilha", type: "seo", group: "seo" }),
  ],
  preview: {
    prepare() {
      return { title: "Página Sobre" };
    },
  },
});
