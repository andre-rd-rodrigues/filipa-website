import { defineType, defineField } from "sanity";

/** Página "Blog" (documento único). Os artigos vêm da coleção Artigos. */
export const blogPage = defineType({
  name: "blogPage",
  title: "Página Blog",
  type: "document",
  groups: [
    { name: "topo", title: "Topo", default: true },
    { name: "cta", title: "Chamada final" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "heroTitle", title: "Título da página", type: "string", initialValue: "Blog", group: "topo" }),
    defineField({
      name: "emptyState",
      title: "Texto quando não há artigos",
      type: "string",
      initialValue: "Ainda não há artigos publicados.",
      group: "topo",
    }),
    defineField({ name: "ctaTitle", title: "Título", type: "text", rows: 2, group: "cta" }),
    defineField({ name: "ctaBody", title: "Descrição", type: "text", rows: 3, group: "cta" }),
    defineField({
      name: "ctas",
      title: "Botões",
      type: "array",
      of: [{ type: "cta" }],
      group: "cta",
    }),
    defineField({ name: "seo", title: "SEO e partilha", type: "seo", group: "seo" }),
  ],
  preview: {
    prepare() {
      return { title: "Página Blog" };
    },
  },
});
