import { defineType, defineField } from "sanity";

/** Página legal (privacidade, termos, cookies). */
export const legalPage = defineType({
  name: "legalPage",
  title: "Página legal",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      description: "privacidade, termos ou cookies.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "lastUpdated",
      title: "Última atualização",
      type: "string",
      description: 'Ex.: "julho de 2026".',
    }),
    defineField({
      name: "body",
      title: "Conteúdo",
      type: "legalBody",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cookies",
      title: "Tabela de cookies",
      type: "array",
      of: [{ type: "cookieRow" }],
      description:
        'Só é usada na página de cookies (onde estiver inserido o bloco "Tabela de cookies").',
    }),
    defineField({
      name: "seo",
      title: "SEO e partilha",
      type: "seo",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current" },
  },
});
