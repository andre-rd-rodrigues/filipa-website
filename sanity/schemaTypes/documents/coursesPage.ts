import { defineType, defineField } from "sanity";

/** Página "Cursos" (documento único). A lista de cursos vem da coleção Cursos. */
export const coursesPage = defineType({
  name: "coursesPage",
  title: "Página Cursos",
  type: "document",
  groups: [
    { name: "topo", title: "Topo", default: true },
    { name: "comoFunciona", title: "Como funcionam" },
    { name: "faq", title: "Perguntas frequentes" },
    { name: "cta", title: "Chamada final" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "heroTitle", title: "Título da página", type: "string", initialValue: "Cursos", group: "topo" }),
    defineField({ name: "datesEyebrow", title: "Etiqueta das datas", type: "string", group: "topo" }),
    defineField({ name: "listEyebrow", title: "Etiqueta da lista", type: "string", group: "topo" }),
    // Como funcionam
    defineField({ name: "howEyebrow", title: "Etiqueta", type: "string", group: "comoFunciona" }),
    defineField({ name: "howTitle", title: "Título", type: "text", rows: 2, group: "comoFunciona" }),
    defineField({
      name: "howItWorks",
      title: "Pilares",
      type: "array",
      of: [{ type: "processStep" }],
      description: "Cada pilar usa apenas título e descrição.",
      group: "comoFunciona",
    }),
    // FAQ
    defineField({ name: "faqTitle", title: "Título", type: "string", group: "faq" }),
    defineField({
      name: "faqs",
      title: "Perguntas frequentes",
      type: "array",
      of: [{ type: "faqItem" }],
      group: "faq",
    }),
    // CTA
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
      return { title: "Página Cursos" };
    },
  },
});
