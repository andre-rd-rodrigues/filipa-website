import { defineType, defineField } from "sanity";

/** Uma sessão agendada dentro de uma edição de curso. */
export const courseSession = defineType({
  name: "courseSession",
  title: "Sessão",
  type: "object",
  fields: [
    defineField({
      name: "date",
      title: "Data",
      type: "date",
      options: { dateFormat: "YYYY-MM-DD" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "start",
      title: "Hora de início",
      type: "string",
      description: "Formato 24h, ex.: 19:30",
    }),
    defineField({
      name: "end",
      title: "Hora de fim",
      type: "string",
      description: "Formato 24h, ex.: 22:30",
    }),
  ],
  preview: {
    select: { date: "date", start: "start", end: "end" },
    prepare({ date, start, end }) {
      const time = [start, end].filter(Boolean).join("–");
      return { title: date || "Sessão", subtitle: time };
    },
  },
});

/** Uma edição / turma de um curso, com as suas datas. */
export const courseEdition = defineType({
  name: "courseEdition",
  title: "Edição",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Nome da edição",
      type: "string",
      description: 'Ex.: "Outubro 2026".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "format",
      title: "Formato desta edição",
      type: "string",
      description: 'Ex.: "Online (Zoom)".',
    }),
    defineField({
      name: "sessions",
      title: "Sessões",
      type: "array",
      of: [{ type: "courseSession" }],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "label", sessions: "sessions" },
    prepare({ title, sessions }) {
      const count = Array.isArray(sessions) ? sessions.length : 0;
      return { title, subtitle: `${count} sessão(ões)` };
    },
  },
});
