import { defineType, defineField } from "sanity";

/**
 * Imagem com texto alternativo — objeto reutilizável em todo o site.
 * O `alt` é obrigatório por acessibilidade (leitores de ecrã e SEO).
 */
export const figure = defineType({
  name: "figure",
  title: "Imagem",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Texto alternativo",
      type: "string",
      description:
        "Descreve a imagem em poucas palavras (para leitores de ecrã e SEO).",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { media: "asset", title: "alt" },
    prepare({ media, title }) {
      return { media, title: title || "Imagem" };
    },
  },
});
