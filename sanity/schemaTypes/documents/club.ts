import { defineType, defineField } from "sanity";

/** Clube / organização dos atletas acompanhados. */
export const club = defineType({
  name: "club",
  title: "Clube",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nome",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Ordem",
      type: "number",
      description: "Define a ordem na listagem (menor aparece primeiro).",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Ordem",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", order: "order" },
    prepare({ title, order }) {
      return {
        title: title || "Sem nome",
        subtitle: typeof order === "number" ? `Ordem ${order}` : undefined,
      };
    },
  },
});
