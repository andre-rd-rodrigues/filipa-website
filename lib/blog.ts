/**
 * Blog data layer.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * SANITY-READY BY DESIGN
 * ─────────────────────────────────────────────────────────────────────────
 * Today this returns hand-authored mock content. The public surface is a set
 * of *async* functions returning plain data, so swapping to Sanity later is a
 * drop-in: implement the bodies with the Sanity client and keep the same
 * return shapes. Nothing in the app imports the mock array directly — pages
 * only call `getAllPosts` / `getPostBySlug` / `getLatestPosts`.
 *
 * When wiring Sanity (future):
 *   1. `pnpm add @sanity/client @portabletext/react`
 *   2. Create `lib/sanity.ts` exporting a configured client:
 *        import { createClient } from "@sanity/client";
 *        export const sanity = createClient({
 *          projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
 *          dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
 *          apiVersion: "2024-01-01",
 *          useCdn: true,
 *        });
 *   3. Replace the mock bodies below with GROQ queries (examples inline).
 *   4. Model `body` as Portable Text and render it with @portabletext/react.
 *      The current `BodyBlock[]` shape mirrors the subset we render, so the
 *      swap is mechanical.
 *   5. Add `cdn.sanity.io` to `images.remotePatterns` in next.config.ts and
 *      build cover URLs with @sanity/image-url.
 */

export type BodyBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string; cite?: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  /** ISO date string. */
  publishedAt: string;
  /** Estimated reading time in minutes. */
  readingMinutes: number;
  coverImage: { src: string; alt: string };
  body: BodyBlock[];
};

/**
 * Mock content. Not exported — reach it only through the async accessors so
 * call sites are already shaped for a remote source.
 */
const posts: BlogPost[] = [
  {
    slug: "inteligencia-emocional-no-desporto",
    title: "Inteligência emocional: a vantagem que não se treina no ginásio",
    excerpt:
      "Gerir o que sentes sob pressão decide tanto como a preparação física. Fica com um mapa prático para treinar a cabeça com o mesmo rigor que treinas o corpo.",
    category: "Inteligência Emocional",
    author: "Filipa Marques",
    publishedAt: "2026-06-24",
    readingMinutes: 6,
    coverImage: {
      src: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1600&q=80",
      alt: "Atleta a preparar-se antes do treino, concentração e respiração",
    },
    body: [
      {
        type: "paragraph",
        text: "Há um momento, segundos antes de entrares em campo, em que tudo o que treinaste fica em segundo plano. O corpo está pronto — mas é a cabeça que decide se a preparação se transforma em resultado. É aí que a inteligência emocional deixa de ser um conceito bonito e passa a ser uma vantagem concreta.",
      },
      {
        type: "heading",
        text: "O que é, sem jargão",
      },
      {
        type: "paragraph",
        text: "Inteligência emocional é a capacidade de reconhecer o que sentes, perceber de onde vem, e escolher o que fazes a seguir — em vez de reagires em piloto automático. No desporto, isto aparece na forma como lidas com um erro, com a pressão do resultado, ou com um colega que não está no seu melhor dia.",
      },
      {
        type: "quote",
        text: "Não é sobre não sentir. É sobre sentir e continuar a decidir bem.",
        cite: "Filipa Marques",
      },
      {
        type: "heading",
        text: "Três hábitos para começar esta semana",
      },
      {
        type: "paragraph",
        text: "Primeiro: nomeia a emoção. Dizer «estou frustrado» em vez de deixar a frustração conduzir já reduz a sua intensidade. Segundo: separa o facto da interpretação — «falhei o passe» é um facto; «sou um desastre» é uma história. Terceiro: define a tua próxima ação mínima, aquela coisa pequena e concreta que te devolve o controlo.",
      },
      {
        type: "paragraph",
        text: "Nenhum destes hábitos exige tempo extra de treino. Exige intenção. E, como tudo o que treinas, melhora com repetição — até se tornar a tua forma natural de estar em competição.",
      },
    ],
  },
];

/** Simulates network latency so call sites already handle async. */
async function delay<T>(value: T): Promise<T> {
  return value;
}

/**
 * All posts, newest first.
 *
 * Sanity (future):
 *   return sanity.fetch(groq`
 *     *[_type == "post"] | order(publishedAt desc){
 *       "slug": slug.current, title, excerpt, category,
 *       "author": author->name, publishedAt, readingMinutes,
 *       "coverImage": { "src": coverImage.asset->url, "alt": coverImage.alt },
 *       body
 *     }
 *   `);
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  const sorted = [...posts].sort(
    (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt),
  );
  return delay(sorted);
}

/**
 * A single post by slug, or null if not found.
 *
 * Sanity (future):
 *   return sanity.fetch(
 *     groq`*[_type == "post" && slug.current == $slug][0]{ ... }`,
 *     { slug },
 *   );
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const post = posts.find((p) => p.slug === slug) ?? null;
  return delay(post);
}

/** The N most recent posts (home teaser, related lists). */
export async function getLatestPosts(limit = 3): Promise<BlogPost[]> {
  const all = await getAllPosts();
  return all.slice(0, limit);
}

/** Locale-aware date formatting shared by blog surfaces. */
export function formatPostDate(iso: string): string {
  return new Intl.DateTimeFormat("pt-PT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}
