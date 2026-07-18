import { defineType, defineField } from "sanity";

/** Um destaque de serviço na página inicial (cartão com imagem + link). */
export const highlightItem = defineType({
  name: "highlightItem",
  title: "Destaque",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Título",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Descrição curta",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "Destino (link)",
      type: "string",
      description: "Ex.: /servicos/treino-mental-individual",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Imagem",
      type: "figure",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "href", media: "image" },
  },
});
