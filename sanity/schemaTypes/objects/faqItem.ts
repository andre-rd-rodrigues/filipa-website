import { defineType, defineField } from "sanity";

/** Par pergunta/resposta, usado em FAQs e em dados estruturados (FAQPage). */
export const faqItem = defineType({
  name: "faqItem",
  title: "Pergunta frequente",
  type: "object",
  fields: [
    defineField({
      name: "question",
      title: "Pergunta",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Resposta",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "question", subtitle: "answer" },
  },
});
