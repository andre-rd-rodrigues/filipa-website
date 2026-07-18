import { defineType, defineField } from "sanity";

/** Botão / call-to-action reutilizável (texto + destino + estilo). */
export const cta = defineType({
  name: "cta",
  title: "Botão (call-to-action)",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Texto do botão",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "Destino (link)",
      type: "string",
      description: "Caminho interno (ex.: /contactos) ou URL completo.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "variant",
      title: "Estilo",
      type: "string",
      options: {
        list: [
          { title: "Principal (cheio)", value: "primary" },
          { title: "Secundário (contorno)", value: "secondary" },
        ],
        layout: "radio",
      },
      initialValue: "primary",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "href" },
  },
});
