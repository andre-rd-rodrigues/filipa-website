import { defineType, defineField } from "sanity";

/** Página "Contactos" (documento único). */
export const contactPage = defineType({
  name: "contactPage",
  title: "Página Contactos",
  type: "document",
  groups: [
    { name: "form", title: "Formulário", default: true },
    { name: "direto", title: "Contacto direto" },
    { name: "faq", title: "Perguntas frequentes" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "heroTitle", title: "Título da página", type: "string", initialValue: "Contactos", group: "form" }),
    defineField({ name: "formEyebrow", title: "Etiqueta", type: "string", group: "form" }),
    defineField({ name: "formTitle", title: "Título", type: "text", rows: 2, group: "form" }),
    defineField({ name: "formBody", title: "Descrição", type: "text", rows: 3, group: "form" }),
    // Contacto direto
    defineField({ name: "directImage", title: "Imagem", type: "figure", group: "direto" }),
    defineField({ name: "directTitle", title: "Título do contacto direto", type: "string", group: "direto" }),
    defineField({ name: "directNote", title: "Nota", type: "text", rows: 3, group: "direto" }),
    defineField({ name: "socialTitle", title: "Título das redes sociais", type: "string", group: "direto" }),
    // FAQ
    defineField({ name: "faqEyebrow", title: "Etiqueta", type: "string", group: "faq" }),
    defineField({ name: "faqTitle", title: "Título", type: "text", rows: 2, group: "faq" }),
    defineField({ name: "faqBody", title: "Descrição", type: "text", rows: 3, group: "faq" }),
    defineField({ name: "faqCtaLabel", title: "Texto do botão", type: "string", group: "faq" }),
    defineField({
      name: "faqs",
      title: "Perguntas frequentes",
      type: "array",
      of: [{ type: "faqItem" }],
      group: "faq",
    }),
    defineField({ name: "seo", title: "SEO e partilha", type: "seo", group: "seo" }),
  ],
  preview: {
    prepare() {
      return { title: "Página Contactos" };
    },
  },
});
