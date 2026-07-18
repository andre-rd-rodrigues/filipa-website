import { defineType, defineField, defineArrayMember } from "sanity";

/** Uma linha da tabela de cookies. */
export const cookieRow = defineType({
  name: "cookieRow",
  title: "Cookie",
  type: "object",
  fields: [
    defineField({ name: "name", title: "Cookie", type: "string", validation: (r) => r.required() }),
    defineField({ name: "provider", title: "Fornecedor", type: "string", validation: (r) => r.required() }),
    defineField({ name: "purpose", title: "Finalidade", type: "string", validation: (r) => r.required() }),
    defineField({ name: "duration", title: "Duração", type: "string", validation: (r) => r.required() }),
  ],
  preview: {
    select: { title: "name", subtitle: "provider" },
  },
});

/** Bloco que marca onde a tabela de cookies deve ser apresentada. */
export const cookieTableBlock = defineType({
  name: "cookieTableBlock",
  title: "Tabela de cookies",
  type: "object",
  fields: [
    defineField({
      name: "note",
      title: "Nota interna",
      type: "string",
      readOnly: true,
      initialValue: "A tabela usa os cookies definidos no campo abaixo da página.",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Tabela de cookies (inserida aqui)" };
    },
  },
});

/** Bloco que insere o botão "Alterar preferências de cookies". */
export const cookieSettingsButtonBlock = defineType({
  name: "cookieSettingsButtonBlock",
  title: "Botão de preferências de cookies",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Texto do botão",
      type: "string",
      initialValue: "Alterar preferências de cookies",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "label" },
    prepare({ title }) {
      return { title: title || "Botão de preferências de cookies" };
    },
  },
});

/**
 * Texto rico para páginas legais. Além do texto normal, permite inserir a
 * tabela de cookies e o botão de preferências nos locais certos.
 */
export const legalBody = defineType({
  name: "legalBody",
  title: "Conteúdo",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Parágrafo", value: "normal" },
        { title: "Subtítulo", value: "h2" },
        { title: "Subtítulo menor", value: "h3" },
      ],
      lists: [{ title: "Lista", value: "bullet" }],
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
    defineArrayMember({ type: "cookieTableBlock" }),
    defineArrayMember({ type: "cookieSettingsButtonBlock" }),
  ],
});
