import { defineType, defineField } from "sanity";

/** Uma formação / certificação (grelha da página Sobre). */
export const credential = defineType({
  name: "credential",
  title: "Formação / certificação",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "detail",
      title: "Descrição",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "type",
      title: "Tipo",
      type: "string",
      description: "Define o ícone apresentado.",
      options: {
        list: [
          { title: "Licenciatura", value: "licenciatura" },
          { title: "Pós-graduação", value: "pos-graduacao" },
          { title: "Certificação", value: "certificacao" },
        ],
        layout: "radio",
      },
      initialValue: "certificacao",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "type" },
  },
});
