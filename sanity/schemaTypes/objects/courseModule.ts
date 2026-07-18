import { defineType, defineField } from "sanity";

/** Um módulo do programa de um curso — título + lista de conteúdos. */
export const courseModule = defineType({
  name: "courseModule",
  title: "Módulo",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Título do módulo",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "items",
      title: "Conteúdos",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title", items: "items" },
    prepare({ title, items }) {
      const count = Array.isArray(items) ? items.length : 0;
      return { title, subtitle: `${count} conteúdo(s)` };
    },
  },
});
