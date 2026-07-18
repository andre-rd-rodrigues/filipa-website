import { defineType, defineField } from "sanity";

/** Uma métrica animada (secção de números na página inicial). */
export const stat = defineType({
  name: "stat",
  title: "Número / métrica",
  type: "object",
  fields: [
    defineField({
      name: "value",
      title: "Valor",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "suffix",
      title: "Sufixo (opcional)",
      type: "string",
      description: 'Ex.: "+" para mostrar "150+".',
    }),
    defineField({
      name: "label",
      title: "Etiqueta",
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
    defineField({
      name: "cta",
      title: "Botão",
      type: "cta",
    }),
  ],
  preview: {
    select: { value: "value", suffix: "suffix", label: "label" },
    prepare({ value, suffix, label }) {
      return { title: `${value ?? ""}${suffix ?? ""} — ${label ?? ""}` };
    },
  },
});
