import { defineType, defineField } from "sanity";

/** Página "Podcast" (documento único). Os episódios vêm da coleção Episódios. */
export const podcastPage = defineType({
  name: "podcastPage",
  title: "Página Podcast",
  type: "document",
  groups: [
    { name: "topo", title: "Topo", default: true },
    { name: "lista", title: "Lista de episódios" },
    { name: "subscrever", title: "Subscrever" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "heroTitle", title: "Título da página", type: "string", initialValue: "Podcast", group: "topo" }),
    defineField({ name: "heroLogo", title: "Logótipo do podcast", type: "figure", group: "topo" }),
    defineField({ name: "featuredEyebrow", title: "Etiqueta do último episódio", type: "string", group: "topo" }),
    // Lista
    defineField({ name: "listEyebrow", title: "Etiqueta", type: "string", group: "lista" }),
    defineField({ name: "listTitle", title: "Título", type: "text", rows: 2, group: "lista" }),
    defineField({ name: "listCta", title: "Botão (ver todos)", type: "cta", group: "lista" }),
    // Subscrever
    defineField({ name: "subscribeEyebrow", title: "Etiqueta", type: "string", group: "subscrever" }),
    defineField({ name: "subscribeTitle", title: "Título", type: "text", rows: 2, group: "subscrever" }),
    defineField({ name: "subscribeBody", title: "Descrição", type: "text", rows: 3, group: "subscrever" }),
    defineField({
      name: "platforms",
      title: "Plataformas",
      type: "array",
      of: [{ type: "episodeLink" }],
      group: "subscrever",
    }),
    defineField({ name: "seo", title: "SEO e partilha", type: "seo", group: "seo" }),
  ],
  preview: {
    prepare() {
      return { title: "Página Podcast" };
    },
  },
});
