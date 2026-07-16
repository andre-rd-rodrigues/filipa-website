/**
 * Courses data layer.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * SANITY-READY BY DESIGN
 * ─────────────────────────────────────────────────────────────────────────
 * Content here is authored by a non-technical editor, so it mirrors the exact
 * pattern used by lib/blog.ts. The public surface is a set of *async* functions
 * returning plain data (POJOs). The mock array below is NOT exported — pages
 * only call `getAllCourses` / `getCourseBySlug`. Swapping to Sanity later is a
 * drop-in: implement the bodies with the Sanity client and keep the same
 * return shapes.
 *
 * Fields are intentionally granular (one field/array per editable block) so
 * they map 1:1 to Sanity Studio inputs and stay easy to edit.
 *
 * Intended Sanity document type `course`:
 *   slug (slug), title (string), subtitle (string), category (string),
 *   summary (text), audience (text), duration (string), schedule (string),
 *   format (string), includes (array<string>), intro (array<text>),
 *   objectives (array<string>), program (array<{ title, items:array<string> }>),
 *   outcomes (array<string>), ctas (array<{ label, href, variant }>),
 *   image ({ asset, alt }),
 *   editions (array<{ label, format, sessions:array<{ date, start, end }> }>).
 *
 * When wiring Sanity (future):
 *   getAllCourses ->
 *     sanity.fetch(groq`
 *       *[_type == "course"] | order(orderRank){
 *         "slug": slug.current, title, subtitle, category, summary, audience,
 *         duration, schedule, format, includes, intro, objectives,
 *         program[]{ title, items },
 *         outcomes, ctas[]{ label, href, variant },
 *         "image": { "src": image.asset->url, "alt": image.alt },
 *         editions[]{ label, format, sessions[]{ date, start, end } }
 *       }
 *     `)
 *   getCourseBySlug ->
 *     sanity.fetch(groq`*[_type == "course" && slug.current == $slug][0]{ ... }`,
 *       { slug })
 */

/** A programme module: a titled group of syllabus items. */
export type CourseModule = { title: string; items: string[] };

/** A single scheduled session within a course edition. */
export type CourseSession = {
  /** ISO date, `yyyy-mm-dd`. */
  date: string;
  /** Start time, `HH:mm` (24h). */
  start?: string;
  /** End time, `HH:mm` (24h). */
  end?: string;
};

/** A course edition/intake — a run of the course with its own dates. */
export type CourseEdition = {
  /** Human label, e.g. "Outubro 2026". */
  label: string;
  /** Delivery format for this edition, e.g. "Online (Zoom)". */
  format?: string;
  /** Individual session dates. */
  sessions: CourseSession[];
};

export type Course = {
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  /** Short pitch — used on the listing card and as meta description. */
  summary: string;
  /** Who the course is for. */
  audience: string;
  // Practical details (each its own field for clarity in the Studio).
  duration?: string;
  schedule?: string;
  format?: string;
  /** "O que está incluído". */
  includes?: string[];
  // Editorial content.
  /** Introduction paragraphs. */
  intro?: string[];
  /** "O que vais aprender". */
  objectives?: string[];
  /** "Conteúdos programáticos" — modules with their items. */
  program?: CourseModule[];
  /** 3–4 concrete results shown on the listing card. */
  outcomes: string[];
  /** Calls to action rendered as pill buttons, in order. */
  ctas: { label: string; href: string; variant: "primary" | "secondary" }[];
  /** Mocked editorial photo (Unsplash), ready to be replaced with real assets. */
  image: { src: string; alt: string };
  /** Scheduled editions/intakes — structured source for the calendar. */
  editions?: CourseEdition[];
};

/**
 * Mock content. Not exported — reach it only through the async accessors so
 * call sites are already shaped for a remote source.
 */
const courses: Course[] = [
  {
    slug: "comunicacao-em-campo",
    title: "Comunicação em Campo",
    subtitle:
      "Aplicação prática da PNL e da Inteligência Emocional no desporto",
    category: "Comunicação",
    summary:
      "Descobre como elevar a tua liderança e transformar os resultados da tua equipa. Com as ferramentas da PNL e da inteligência emocional, aumentas o autoconhecimento, comunicas com clareza e crias uma ligação mais forte com quem treinas.",
    audience: "Treinadores, equipas técnicas e dirigentes desportivos.",
    duration: "18 horas de formação prática",
    schedule: "Outubro · 7, 9, 14, 16, 21 e 23 · 19h30–22h30",
    format:
      "Online (Zoom) ou presencial · inscrição individual ou em equipa/grupo",
    includes: ["1 sessão individual de coaching", "Manual do curso"],
    intro: [
      "Ao trabalhar com atletas, equipas e clubes, o treinador enfrenta todos os dias uma série de desafios: as diferenças de cada atleta (habilidades, personalidades e motivações); as dificuldades emocionais (falta de confiança, frustração, medo e ansiedade); e a pressão de dentro e de fora (clube, família, agentes, adeptos e a gestão de expectativas).",
      "E se pudesses transformar esses desafios em oportunidades? Liderar com confiança, comunicar com clareza e criar um ambiente onde cada atleta se sente inspirado a chegar ao seu máximo, elevando o desempenho individual e coletivo.",
      "É aqui que entram duas ferramentas poderosas. A Programação Neurolinguística (PNL) explora como os teus programas mentais, guardados no inconsciente, influenciam diretamente o teu comportamento: ao dominá-la, conheces-te melhor, compreendes melhor os outros e alinhas a tua comunicação com aquilo em que acreditas.",
      "A Inteligência Emocional (IE) é a chave para reconhecer, compreender e gerir emoções, as tuas e as dos outros. Desenvolvê-la permite-te criar estados emocionais mais harmoniosos, tomar decisões mais assertivas e fortalecer as relações, dentro e fora do campo.",
      "Porque é hora de transformares a tua abordagem enquanto treinador: comunicar com impacto, liderar com propósito e inspirar a tua equipa a alcançar patamares nunca antes imaginados.",
    ],
    objectives: [
      "Compreender melhor as pessoas: como pensam, sentem e agem.",
      "Conhecer-te melhor a ti para agires e decidires de forma mais consciente.",
      "Comunicar de forma clara e eficaz, contigo próprio e com os outros.",
      "Perceber como as emoções influenciam o comportamento, e usá-las a teu favor.",
      "Reconhecer e gerir emoções, tuas e dos outros, para criar relações mais positivas.",
      "Superar bloqueios mentais e crenças limitantes que te travam.",
      "Ganhar ferramentas práticas para lidar com o stress, a pressão e o dia a dia.",
      "Criar estratégias de motivação e superação, individuais e de equipa.",
      "Resolver conflitos e gerir situações desafiantes com método.",
      "Aumentar a tua assertividade, no contexto pessoal e desportivo.",
      "Fortalecer as tuas relações, compreendendo e influenciando melhor os outros.",
      "Atingir mais e melhores resultados, com impacto no bem-estar e na qualidade de vida.",
    ],
    program: [
      {
        title:
          "A PNL como metodologia para desenvolver e alcançar a excelência",
        items: [
          "Modelo da comunicação: alinhar pensamentos, emoções e ações para melhorar resultados.",
          "Níveis neurológicos de comunicação e ação: identificar o que ajustar para agir melhor.",
          "Metaprogramas e sistemas de representação: ajustar a comunicação a cada pessoa.",
          "Técnicas de empatia e feedback: criar confiança e saber dar e receber feedback.",
          "Autoconhecimento: os valores como pilares e o seu impacto na motivação e na ação.",
          "Submodalidades: transformar pensamentos negativos em perspetivas úteis.",
          "Ancoragem: ativar recursos positivos para a alta performance (confiança, foco, calma).",
          "Crenças: transformar convicções limitadoras em crenças que promovem a ação.",
          "Reenquadramento: mudar a perspetiva de situações difíceis para decidir melhor.",
        ],
      },
      {
        title:
          "A Inteligência Emocional na gestão de pessoas e na melhoria de resultados",
        items: [
          "Inteligência emocional: competências que se aprendem e fazem a diferença no dia a dia.",
          "Consciência emocional: reconhecer e identificar estados emocionais em ti e no outro.",
          "Gestão emocional: estratégias simples para manter o equilíbrio sob pressão.",
          "Habilidades sociais e de liderança: criar relações sólidas, no pessoal e no profissional.",
        ],
      },
    ],
    outcomes: [
      "Dar feedback que motiva em vez de bloquear, mesmo em momentos de tensão.",
      "Ler e ajustar a tua linguagem (verbal e não-verbal) a cada atleta.",
      "Criar rotinas de comunicação para o antes, o durante e o depois do jogo.",
      "Gerir conflitos na equipa técnica com método e não com instinto.",
    ],
    ctas: [{ label: "Inscrição", href: "/contactos", variant: "primary" }],
    image: {
      src: "https://images.unsplash.com/photo-1751394220229-9a23c9ed6a75?auto=format&fit=crop&w=1200&q=80",
      alt: "Treinador a falar com a equipa em campo",
    },
    // PLACEHOLDER dates (Outubro 2026) so the calendar shows upcoming sessions.
    // Confirm/replace with the real edition dates in Sanity.
    editions: [
      {
        label: "Outubro 2026",
        format: "Online (Zoom)",
        sessions: [
          { date: "2026-10-07", start: "19:30", end: "22:30" },
          { date: "2026-10-09", start: "19:30", end: "22:30" },
          { date: "2026-10-14", start: "19:30", end: "22:30" },
          { date: "2026-10-16", start: "19:30", end: "22:30" },
          { date: "2026-10-21", start: "19:30", end: "22:30" },
          { date: "2026-10-23", start: "19:30", end: "22:30" },
        ],
      },
    ],
  },
  {
    slug: "inteligencia-emocional",
    title: "Inteligência Emocional",
    category: "Inteligência Emocional",
    summary:
      "As emoções não se desligam quando mais precisas de clareza, mas podes aprender a geri-las. Reconhece o que sentes e o que sentem os outros, responde em vez de reagires e transforma a forma como vives o dia a dia, no desporto e fora dele.",
    audience:
      "Atletas, treinadores, fisioterapeutas, gestores, formadores e quem queira melhorar o bem-estar e a qualidade de vida.",
    schedule: "Outubro 2025 · 7, 9, 14, 16, 21 e 23 · 19h20–22h30",
    intro: [
      "Reconhecer e compreender emoções (em ti e nos outros) é uma competência que se treina. Este curso dá-te estratégias simples e práticas para o fazer no momento em que mais conta.",
      "Aprende a gerir o que sentes, a responder em vez de reagir e a transformar a forma como te relacionas e vives o dia a dia.",
    ],
    outcomes: [
      "Identificar as tuas emoções no momento em que surgem, e o que as desencadeia.",
      "Responder em vez de reagir, sobretudo em contextos de alta pressão.",
      "Compreender e acompanhar o estado emocional de quem está à tua volta.",
      "Construir hábitos simples de autorregulação que se mantêm no dia a dia.",
    ],
    ctas: [{ label: "Inscrição", href: "/contactos", variant: "primary" }],
    image: {
      src: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=1200&q=80",
      alt: "Atleta em momento de concentração e serenidade",
    },
    // PLACEHOLDER dates (Outubro 2026) so the calendar shows upcoming sessions.
    // Confirm/replace with the real edition dates in Sanity.
    editions: [
      {
        label: "Outubro 2026",
        format: "Online (Zoom)",
        sessions: [
          { date: "2026-10-07", start: "19:20", end: "22:30" },
          { date: "2026-10-09", start: "19:20", end: "22:30" },
          { date: "2026-10-14", start: "19:20", end: "22:30" },
          { date: "2026-10-16", start: "19:20", end: "22:30" },
          { date: "2026-10-21", start: "19:20", end: "22:30" },
          { date: "2026-10-23", start: "19:20", end: "22:30" },
        ],
      },
    ],
  },
];

/** Simulates network latency so call sites already handle async. */
async function delay<T>(value: T): Promise<T> {
  return value;
}

/**
 * All courses, in editorial order.
 *
 * Sanity (future): return sanity.fetch(groq`*[_type == "course"] | order(orderRank){ ... }`);
 */
export async function getAllCourses(): Promise<Course[]> {
  return delay(courses);
}

/**
 * A single course by slug, or null if not found.
 *
 * Sanity (future):
 *   return sanity.fetch(
 *     groq`*[_type == "course" && slug.current == $slug][0]{ ... }`,
 *     { slug },
 *   );
 */
export async function getCourseBySlug(slug: string): Promise<Course | null> {
  const course = courses.find((c) => c.slug === slug) ?? null;
  return delay(course);
}

/** A single upcoming session, flattened with its course and edition context. */
export type UpcomingSession = {
  course: Pick<Course, "slug" | "title" | "category" | "image">;
  edition: CourseEdition;
  session: CourseSession;
};

/**
 * All future course sessions, flattened and sorted ascending by date.
 * "Future" is relative to the start of today (so today's sessions still show).
 *
 * Sanity (future): fetch courses with editions, then flatten/filter the same way.
 */
export async function getUpcomingSessions(): Promise<UpcomingSession[]> {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const upcoming: UpcomingSession[] = [];
  for (const course of courses) {
    for (const edition of course.editions ?? []) {
      for (const session of edition.sessions) {
        if (new Date(`${session.date}T00:00:00`) >= startOfToday) {
          upcoming.push({
            course: {
              slug: course.slug,
              title: course.title,
              category: course.category,
              image: course.image,
            },
            edition,
            session,
          });
        }
      }
    }
  }

  upcoming.sort((a, b) => a.session.date.localeCompare(b.session.date));
  return delay(upcoming);
}
