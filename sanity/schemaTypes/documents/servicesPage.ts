import { defineType, defineField } from "sanity";

/** Página "Serviços" (documento único). A lista de serviços vem da coleção Serviços. */
export const servicesPage = defineType({
  name: "servicesPage",
  title: "Página Serviços",
  type: "document",
  groups: [
    { name: "intro", title: "Introdução", default: true },
    { name: "publico", title: "Para quem" },
    { name: "cta", title: "Chamada final" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "heroTitle", title: "Título da página", type: "string", initialValue: "Serviços", group: "intro" }),
    defineField({ name: "introEyebrow", title: "Etiqueta", type: "string", group: "intro" }),
    defineField({ name: "introTitle", title: "Título", type: "text", rows: 2, group: "intro" }),
    defineField({ name: "introBody", title: "Descrição", type: "text", rows: 4, group: "intro" }),
    defineField({ name: "introImage", title: "Imagem", type: "figure", group: "intro" }),
    // Para quem
    defineField({ name: "audiencesEyebrow", title: "Etiqueta", type: "string", group: "publico" }),
    defineField({ name: "audiencesTitle", title: "Título", type: "text", rows: 2, group: "publico" }),
    defineField({ name: "audiencesImage", title: "Imagem", type: "figure", group: "publico" }),
    defineField({
      name: "audiences",
      title: "Públicos-alvo",
      type: "array",
      of: [{ type: "audience" }],
      group: "publico",
    }),
    // Citação
    defineField({ name: "quoteEyebrow", title: "Etiqueta da citação", type: "string", group: "cta" }),
    // CTA
    defineField({ name: "ctaImage", title: "Imagem", type: "figure", group: "cta" }),
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
      return { title: "Página Serviços" };
    },
  },
});
