import { describe, expect, it } from "vitest";
import {
  formatPostDate,
  getAllPosts,
  getLatestPosts,
  getPostBySlug,
} from "@/lib/blog";

describe("blog data layer", () => {
  it("returns a non-empty list ordered newest-first", async () => {
    const posts = await getAllPosts();
    expect(posts.length).toBeGreaterThan(0);

    for (let i = 1; i < posts.length; i++) {
      expect(+new Date(posts[i - 1].publishedAt)).toBeGreaterThanOrEqual(
        +new Date(posts[i].publishedAt),
      );
    }
  });

  it("finds a post by a known slug", async () => {
    const all = await getAllPosts();
    const target = all[0];
    const found = await getPostBySlug(target.slug);
    expect(found).not.toBeNull();
    expect(found?.slug).toBe(target.slug);
  });

  it("returns null for an unknown slug", async () => {
    expect(await getPostBySlug("__does-not-exist__")).toBeNull();
  });

  it("respects the limit in getLatestPosts", async () => {
    const latest = await getLatestPosts(1);
    expect(latest).toHaveLength(1);
  });

  it("formats dates in pt-PT", () => {
    // Guards against Intl behavior changes across Node upgrades.
    expect(formatPostDate("2026-06-24")).toBe("24 de junho de 2026");
  });
});
