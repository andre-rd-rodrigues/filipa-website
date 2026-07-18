import { defineType, defineField } from "sanity";

/** Um link de plataforma de um episódio (Spotify, YouTube, …). */
export const episodeLink = defineType({
  name: "episodeLink",
  title: "Link de plataforma",
  type: "object",
  fields: [
    defineField({
      name: "platform",
      title: "Plataforma",
      type: "string",
      options: {
        list: [
          { title: "Spotify", value: "Spotify" },
          { title: "YouTube", value: "YouTube" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "url",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "platform", subtitle: "href" },
  },
});
