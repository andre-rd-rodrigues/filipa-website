import { defineType, defineField } from "sanity";

/** Metadados de SEO / partilha por página. */
export const seo = defineType({
  name: "seo",
  title: "SEO e partilha",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "metaTitle",
      title: "Título (meta)",
      type: "string",
      description:
        "Título usado no separador do browser e nos resultados de pesquisa.",
    }),
    defineField({
      name: "metaDescription",
      title: "Descrição (meta)",
      type: "text",
      rows: 3,
      description:
        "Resumo apresentado nos resultados de pesquisa e nas partilhas.",
      validation: (rule) => rule.max(180).warning("Idealmente até 180 caracteres."),
    }),
    defineField({
      name: "ogImage",
      title: "Imagem de partilha (opcional)",
      type: "figure",
    }),
  ],
});
