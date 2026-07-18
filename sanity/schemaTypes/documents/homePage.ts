import { defineType, defineField } from "sanity";

/** Página inicial (documento único). */
export const homePage = defineType({
  name: "homePage",
  title: "Página inicial",
  type: "document",
  groups: [
    { name: "hero", title: "Destaque (topo)", default: true },
    { name: "metodo", title: "Método" },
    { name: "servicos", title: "Serviços" },
    { name: "numeros", title: "Números" },
    { name: "podcast", title: "Podcast" },
    { name: "citacao", title: "Citação" },
    { name: "blog", title: "Blog" },
    { name: "instagram", title: "Instagram" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // Hero
    defineField({
      name: "heroBackdropWord",
      title: "Palavra de fundo",
      type: "string",
      description: 'Texto grande que desliza atrás do retrato, ex.: "Desporto Coaching".',
      group: "hero",
    }),
    defineField({
      name: "heroEyebrow",
      title: "Etiquetas (topo)",
      type: "array",
      of: [{ type: "string" }],
      description: 'Palavras separadas por pontos, ex.: Coaching · PNL · Desporto.',
      group: "hero",
    }),
    defineField({
      name: "heroCtas",
      title: "Botões do destaque",
      type: "array",
      of: [{ type: "cta" }],
      group: "hero",
    }),
    // Método (layered showcase)
    defineField({ name: "methodEyebrow", title: "Etiqueta", type: "string", group: "metodo" }),
    defineField({ name: "methodTitle", title: "Título", type: "text", rows: 3, group: "metodo" }),
    defineField({
      name: "methodParagraphs",
      title: "Parágrafos",
      type: "array",
      of: [{ type: "text", rows: 3 }],
      group: "metodo",
    }),
    defineField({ name: "methodCta", title: "Botão", type: "cta", group: "metodo" }),
    defineField({
      name: "methodImages",
      title: "Imagens (2)",
      type: "array",
      of: [{ type: "figure" }],
      validation: (rule) => rule.max(2),
      group: "metodo",
    }),
    // Serviços
    defineField({ name: "servicesEyebrow", title: "Etiqueta", type: "string", group: "servicos" }),
    defineField({ name: "servicesTitle", title: "Título", type: "text", rows: 2, group: "servicos" }),
    defineField({
      name: "highlights",
      title: "Destaques",
      type: "array",
      of: [{ type: "highlightItem" }],
      group: "servicos",
    }),
    defineField({
      name: "marqueeText",
      title: "Texto do letreiro rolante",
      type: "string",
      group: "servicos",
    }),
    // Números
    defineField({
      name: "stats",
      title: "Números / métricas",
      type: "array",
      of: [{ type: "stat" }],
      group: "numeros",
    }),
    // Podcast
    defineField({ name: "podcastEyebrow", title: "Etiqueta", type: "string", group: "podcast" }),
    defineField({ name: "podcastTitle", title: "Título", type: "text", rows: 2, group: "podcast" }),
    // Citação
    defineField({ name: "quoteEyebrow", title: "Etiqueta da citação", type: "string", group: "citacao" }),
    // Blog
    defineField({ name: "blogEyebrow", title: "Etiqueta", type: "string", group: "blog" }),
    defineField({ name: "blogTitle", title: "Título", type: "text", rows: 2, group: "blog" }),
    // Instagram
    defineField({
      name: "instagramImages",
      title: "Imagens do Instagram",
      type: "array",
      of: [{ type: "figure" }],
      group: "instagram",
    }),
    defineField({ name: "seo", title: "SEO e partilha", type: "seo", group: "seo" }),
  ],
  preview: {
    prepare() {
      return { title: "Página inicial" };
    },
  },
});
