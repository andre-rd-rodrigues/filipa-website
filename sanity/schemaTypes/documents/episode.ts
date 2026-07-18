import { defineType, defineField } from "sanity";

/** Episódio do podcast. */
export const episode = defineType({
  name: "episode",
  title: "Episódio do podcast",
  type: "document",
  fields: [
    defineField({
      name: "number",
      title: "Número do episódio",
      type: "number",
      validation: (rule) => rule.required(),
    }),
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
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Duração",
      type: "string",
      description: 'Ex.: "9 min".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      title: "Data",
      type: "string",
      description: 'Ex.: "15 Jul 2026".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "links",
      title: "Links das plataformas",
      type: "array",
      of: [{ type: "episodeLink" }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "coverImage",
      title: "Capa do episódio",
      type: "figure",
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Número (mais recente primeiro)",
      name: "numberDesc",
      by: [{ field: "number", direction: "desc" }],
    },
  ],
  preview: {
    select: { number: "number", title: "title", media: "coverImage" },
    prepare({ number, title, media }) {
      return { title: `${number}. ${title}`, media };
    },
  },
});
