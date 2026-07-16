import { describe, expect, it } from "vitest";
import {
  buildBlogPostingSchema,
  buildCourseSchema,
  buildFaqSchema,
  buildOrganizationSchema,
  buildPersonSchema,
  buildServiceSchema,
  buildWebSiteSchema,
} from "@/lib/schema";
import { site } from "@/lib/site";
import { makeBlogPost, makeCourse, makeService } from "@/test/fixtures";

// Pure builders — feed fixtures, assert the emitted JSON-LD shape and the
// transforms that matter for SEO. Source-agnostic by construction.

describe("schema builders", () => {
  it("buildOrganizationSchema emits an Organization node", () => {
    const schema = buildOrganizationSchema();
    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("Organization");
    expect(schema.url).toBe(site.url);
    expect(Array.isArray(schema.sameAs)).toBe(true);
  });

  it("buildWebSiteSchema emits a WebSite node in pt-PT", () => {
    const schema = buildWebSiteSchema();
    expect(schema["@type"]).toBe("WebSite");
    expect(schema.inLanguage).toBe("pt-PT");
    expect(schema.url).toBe(site.url);
  });

  it("buildPersonSchema emits a Person node linked to /sobre", () => {
    const schema = buildPersonSchema();
    expect(schema["@type"]).toBe("Person");
    expect(schema.name).toBe(site.name);
    expect(schema.url).toBe(`${site.url}/sobre`);
    expect(Array.isArray(schema.sameAs)).toBe(true);
  });

  it("buildCourseSchema encodes the course url and provider", () => {
    const course = makeCourse({ slug: "curso-x", title: "Curso X" });
    const schema = buildCourseSchema(course);
    expect(schema["@type"]).toBe("Course");
    expect(schema.name).toBe("Curso X");
    expect(schema.url).toBe(`${site.url}/cursos/curso-x`);
    expect((schema.provider as { name: string }).name).toBe(site.fullName);
  });

  it("buildServiceSchema encodes the service url and area served", () => {
    const service = makeService({ slug: "servico-x", title: "Serviço X" });
    const schema = buildServiceSchema(service);
    expect(schema["@type"]).toBe("Service");
    expect(schema.name).toBe("Serviço X");
    expect(schema.url).toBe(`${site.url}/servicos/servico-x`);
    expect(schema.areaServed).toBe("Portugal");
  });

  describe("buildBlogPostingSchema", () => {
    it("resolves a relative cover image to an absolute URL", () => {
      const post = makeBlogPost({
        slug: "artigo",
        coverImage: { src: "/img/capa.webp", alt: "Capa" },
      });
      const schema = buildBlogPostingSchema(post);
      expect(schema["@type"]).toBe("BlogPosting");
      expect(schema.url).toBe(`${site.url}/blog/artigo`);
      expect(schema.image).toEqual([`${site.url}/img/capa.webp`]);
    });

    it("keeps an already-absolute cover image untouched", () => {
      const post = makeBlogPost({
        coverImage: { src: "https://cdn.example.com/capa.webp", alt: "Capa" },
      });
      const schema = buildBlogPostingSchema(post);
      expect(schema.image).toEqual(["https://cdn.example.com/capa.webp"]);
    });

    it("includes keywords only when present", () => {
      const withKeywords = buildBlogPostingSchema(
        makeBlogPost({ keywords: ["burnout", "atleta"] }),
      );
      expect(withKeywords.keywords).toBe("burnout, atleta");

      const withoutKeywords = buildBlogPostingSchema(
        makeBlogPost({ keywords: undefined }),
      );
      expect(withoutKeywords).not.toHaveProperty("keywords");
    });
  });

  it("buildFaqSchema maps items to Question/acceptedAnswer entries", () => {
    const schema = buildFaqSchema([
      { question: "Pergunta um?", answer: "Resposta um." },
      { question: "Pergunta dois?", answer: "Resposta dois." },
    ]);
    expect(schema["@type"]).toBe("FAQPage");

    const entities = schema.mainEntity as Array<{
      "@type": string;
      name: string;
      acceptedAnswer: { "@type": string; text: string };
    }>;
    expect(entities).toHaveLength(2);
    expect(entities[0]).toMatchObject({
      "@type": "Question",
      name: "Pergunta um?",
      acceptedAnswer: { "@type": "Answer", text: "Resposta um." },
    });
  });
});
