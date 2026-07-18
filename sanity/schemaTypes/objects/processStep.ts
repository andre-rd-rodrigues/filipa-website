import { defineType, defineField } from "sanity";

/** Um passo do "Como funciona" — título, frase de destaque opcional e corpo. */
export const processStep = defineType({
  name: "processStep",
  title: "Passo",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Título do passo",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "lead",
      title: "Frase de destaque (opcional)",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Descrição",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "body" },
  },
});
