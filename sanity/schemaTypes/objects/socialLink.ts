import { defineType, defineField } from "sanity";

/** Uma rede social — nome, identificador e link. */
export const socialLink = defineType({
  name: "socialLink",
  title: "Rede social",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Nome",
      type: "string",
      description: 'Ex.: "Instagram".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "handle",
      title: "Identificador",
      type: "string",
      description: 'Ex.: "@filipamarques.coaching.pnl".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "url",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "handle" },
  },
});
