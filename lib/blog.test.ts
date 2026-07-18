import { describe, expect, it, vi } from "vitest";
import { makeBlogPost } from "@/test/fixtures";

const fixturePosts = [
  makeBlogPost({ slug: "novo", title: "Novo", publishedAt: "2026-03-01" }),
  makeBlogPost({ slug: "antigo", title: "Antigo", publishedAt: "2026-01-01" }),
];

// The data layer is a thin wrapper over Sanity; mock the fetch so the contract
// tests run offline. GROQ queries are routed by their distinguishing clauses.
vi.mock("@/sanity/lib/client", () => ({
  sanityFetch: vi.fn(
    async (query: string, params: Record<string, unknown> = {}) => {
      if (query.includes('_type == "post"')) {
        if (query.includes("slug.current == $slug")) {
          return fixturePosts.find((p) => p.slug === params.slug) ?? null;
        }
        if (query.includes("[0...$limit]")) {
          return fixturePosts.slice(0, params.limit as number);
        }
        return fixturePosts;
      }
      if (query.includes('_type == "category"')) return ["Categoria"];
      return null;
    },
  ),
}));

import {
  formatPostDate,
  getAllPosts,
  getLatestPosts,
  getPostBySlug,
  categorySlug,
} from "@/lib/blog";

describe("blog data layer", () => {
  it("returns a non-empty list", async () => {
    const posts = await getAllPosts();
    expect(posts.length).toBeGreaterThan(0);
  });

  it("finds a post by a known slug", async () => {
    const found = await getPostBySlug("novo");
    expect(found).not.toBeNull();
    expect(found?.slug).toBe("novo");
  });

  it("returns null for an unknown slug", async () => {
    expect(await getPostBySlug("__does-not-exist__")).toBeNull();
  });

  it("respects the limit in getLatestPosts", async () => {
    const latest = await getLatestPosts(1);
    expect(latest).toHaveLength(1);
  });

  it("formats dates in pt-PT", () => {
    expect(formatPostDate("2026-06-24")).toBe("24 de junho de 2026");
  });

  it("returns posts with a well-formed shape", async () => {
    const posts = await getAllPosts();
    for (const post of posts) {
      expect(typeof post.slug).toBe("string");
      expect(post.slug.length).toBeGreaterThan(0);
      expect(typeof post.title).toBe("string");
      expect(typeof post.excerpt).toBe("string");
      expect(typeof post.category).toBe("string");
      expect(typeof post.author).toBe("string");
      expect(typeof post.coverImage.src).toBe("string");
      expect(typeof post.coverImage.alt).toBe("string");
      expect(Number.isFinite(post.readingMinutes)).toBe(true);
      expect(post.readingMinutes).toBeGreaterThan(0);
    }
  });

  it("derives accent-free category slugs", () => {
    expect(categorySlug("Saúde Mental no Desporto")).toBe(
      "saude-mental-no-desporto",
    );
  });
});
