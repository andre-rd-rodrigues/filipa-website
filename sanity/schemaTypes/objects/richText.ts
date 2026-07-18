import { defineType, defineField, defineArrayMember } from "sanity";

/** Citação em destaque dentro de um artigo (texto + autoria opcional). */
export const calloutQuote = defineType({
  name: "calloutQuote",
  title: "Citação em destaque",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Citação",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cite",
      title: "Autoria (opcional)",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "text", subtitle: "cite" },
    prepare({ title, subtitle }) {
      return { title: title ? `“${title}”` : "Citação", subtitle };
    },
  },
});

/**
 * Texto rico (Portable Text) para o corpo dos artigos.
 * Suporta parágrafos, subtítulos, listas, negrito/itálico, links e citações.
 */
export const richText = defineType({
  name: "richText",
  title: "Corpo do artigo",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Parágrafo", value: "normal" },
        { title: "Subtítulo", value: "h2" },
        { title: "Subtítulo menor", value: "h3" },
        { title: "Citação simples", value: "blockquote" },
      ],
      lists: [
        { title: "Lista", value: "bullet" },
        { title: "Lista numerada", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Negrito", value: "strong" },
          { title: "Itálico", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            title: "Link",
            type: "object",
            fields: [
              {
                name: "href",
                title: "Destino (link)",
                type: "string",
                validation: (rule) => rule.required(),
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({ type: "calloutQuote" }),
  ],
});
