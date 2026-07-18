import { defineType, defineField } from "sanity";

/** Um público-alvo ("Para quem") — título + descrição. */
export const audience = defineType({
  name: "audience",
  title: "Público-alvo",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descrição",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "description" },
  },
});
