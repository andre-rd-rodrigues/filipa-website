/**
 * Podcast data layer — backed by Sanity.
 */
import { sanityFetch } from "@/sanity/lib/client";

export type EpisodeLink = { platform: string; href: string };

export type Episode = {
  number: number;
  title: string;
  description: string;
  duration: string;
  date: string;
  links: EpisodeLink[];
  coverImage: { src: string; alt: string };
};

const FIELDS = `
  number,
  title,
  description,
  duration,
  date,
  links[]{ platform, href },
  "coverImage": { "src": coverImage.asset->url, "alt": coverImage.alt }
`;

/** All episodes, newest first. */
export async function getAllEpisodes(): Promise<Episode[]> {
  return sanityFetch<Episode[]>(
    `*[_type == "episode"] | order(number desc){${FIELDS}}`,
  );
}

/** The N most recent episodes (home preview). */
export async function getLatestEpisodes(limit = 3): Promise<Episode[]> {
  return sanityFetch<Episode[]>(
    `*[_type == "episode"] | order(number desc)[0...$limit]{${FIELDS}}`,
    { limit },
  );
}
