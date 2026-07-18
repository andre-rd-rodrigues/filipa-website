import { defineType, defineField } from "sanity";

/** Um valor / princípio (secção "Os meus valores" na página Sobre). */
export const principle = defineType({
  name: "principle",
  title: "Valor",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Descrição",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "body" },
  },
});
