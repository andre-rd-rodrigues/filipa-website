/**
 * Clubs data layer — backed by Sanity. Each club is its own document
 * (Conteúdo → Clubes); the section title lives on the Sobre page singleton.
 */
import { cache } from "react";
import { sanityFetch } from "@/sanity/lib/client";

export type ClubsContent = {
  title: string;
  clubs: string[];
};

const DEFAULT_TITLE = "Clubes dos atletas que acompanho";

/** Section title + club names in editorial order. */
export const getClubs = cache(async (): Promise<ClubsContent> => {
  const [meta, clubs] = await Promise.all([
    sanityFetch<{ clubsTitle?: string } | null>(
      `*[_type == "aboutPage"][0]{ clubsTitle }`,
    ),
    sanityFetch<{ title: string }[]>(
      `*[_type == "club" && defined(title)] | order(order asc){ title }`,
    ),
  ]);

  return {
    title: meta?.clubsTitle || DEFAULT_TITLE,
    clubs: clubs.map((c) => c.title),
  };
});
