import { defineType, defineField } from "sanity";

/**
 * Definições globais do site (documento único). Alimenta metadados, cabeçalho,
 * rodapé e dados estruturados em todas as páginas.
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Definições do site",
  type: "document",
  groups: [
    { name: "identidade", title: "Identidade", default: true },
    { name: "contactos", title: "Contactos" },
    { name: "redes", title: "Redes sociais" },
    { name: "citacoes", title: "Citações" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Nome",
      type: "string",
      description: 'Ex.: "Filipa Marques".',
      group: "identidade",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Assinatura",
      type: "string",
      description: 'Ex.: "Coaching & PNL".',
      group: "identidade",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "fullName",
      title: "Nome completo (marca)",
      type: "string",
      description: 'Ex.: "Filipa Marques — Coaching & PNL".',
      group: "identidade",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descrição do site",
      type: "text",
      rows: 4,
      description: "Usada nos metadados e nas partilhas.",
      group: "identidade",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "quote",
      title: "Citação da marca",
      type: "text",
      rows: 2,
      description: "Frase apresentada no rodapé.",
      group: "identidade",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Telefone",
      type: "string",
      group: "contactos",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      group: "contactos",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Localização",
      type: "string",
      description: 'Ex.: "Portugal · Presencial e online".',
      group: "contactos",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "socials",
      title: "Redes sociais",
      type: "array",
      of: [{ type: "socialLink" }],
      group: "redes",
    }),
    defineField({
      name: "quoteHome",
      title: "Citação — página inicial",
      type: "text",
      rows: 2,
      group: "citacoes",
    }),
    defineField({
      name: "quoteServicos",
      title: "Citação — página Serviços",
      type: "text",
      rows: 2,
      group: "citacoes",
    }),
    defineField({
      name: "quoteSobre",
      title: "Citação — página Sobre",
      type: "text",
      rows: 2,
      group: "citacoes",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Definições do site" };
    },
  },
});
