import { defineType, defineField } from "sanity";

/** Um item de "O que vais ganhar" — título opcional a negrito + descrição. */
export const benefit = defineType({
  name: "benefit",
  title: "Benefício",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Título (opcional)",
      type: "string",
      description: "Aparece a negrito antes da descrição.",
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
    select: { title: "label", subtitle: "description" },
    prepare({ title, subtitle }) {
      return { title: title || subtitle, subtitle: title ? subtitle : undefined };
    },
  },
});
