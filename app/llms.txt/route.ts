/**
 * `/llms.txt` — a structured, Markdown overview of the site for LLMs and
 * generative-engine crawlers (GEO), following the llmstxt.org convention.
 *
 * Generated from the same Sanity content as the sitemap so it stays in sync as
 * services, courses and posts are added. ISR: regenerates at most once a minute.
 */
import { siteConfig } from "@/lib/site";
import { getSiteSettings } from "@/lib/settings";
import { getAboutPage } from "@/lib/pages";
import { getClubs } from "@/lib/clubs";
import { getAllServices } from "@/lib/services";
import { getAllCourses } from "@/lib/courses";
import { getAllPosts } from "@/lib/blog";
import { getAllEpisodes } from "@/lib/podcast";

export const revalidate = 60;

/** Absolute URL for a site-relative path. */
const abs = (path: string) => new URL(path, siteConfig.url).toString();

/** Collapse whitespace/newlines so descriptions fit on a single Markdown line. */
const oneLine = (text?: string | null) =>
  (text ?? "").replace(/\s+/g, " ").trim();

/** A Markdown link list item: `- [name](url): description`. */
const item = (name: string, url: string, description?: string) =>
  `- [${name}](${url})${description ? `: ${oneLine(description)}` : ""}`;

export async function GET() {
  const [site, about, clubsData, services, courses, posts, episodes] =
    await Promise.all([
      getSiteSettings(),
      getAboutPage(),
      getClubs(),
      getAllServices(),
      getAllCourses(),
      getAllPosts(),
      getAllEpisodes(),
    ]);

  const lines: string[] = [];

  // --- Title + summary (llmstxt.org: H1 + blockquote) ----------------------
  lines.push(`# ${site.name} — ${site.tagline}`);
  lines.push("");
  lines.push(`> ${oneLine(site.description)}`);
  lines.push("");

  // --- Context paragraphs --------------------------------------------------
  lines.push(
    oneLine(
      about.bio ||
        `${site.fullName}. Mental Coach, Master Trainer em PNL e Pós-Graduada em Psicologia do Desporto. Trabalho com atletas, treinadores, dirigentes e organizações desportivas.`,
    ),
  );
  lines.push("");
  if (site.quote) {
    lines.push(`Lema: "${oneLine(site.quote)}"`);
    lines.push("");
  }
  lines.push(`- Idioma: ${site.locale} (Português de Portugal)`);
  lines.push(`- Site: ${siteConfig.url}`);
  lines.push(`- Área de atuação: ${oneLine(site.contact.location)}`);
  lines.push(
    "- Público: atletas, treinadores, dirigentes, líderes e organizações desportivas",
  );
  lines.push("");

  // --- Credentials (E-E-A-T signals) --------------------------------------
  if (about.credentials?.length) {
    lines.push("## Credenciais");
    lines.push("");
    for (const c of about.credentials) {
      const detail = oneLine(c.detail);
      lines.push(`- ${oneLine(c.title)}${detail ? ` — ${detail}` : ""}`);
    }
    lines.push("");
  }

  // --- Key pages -----------------------------------------------------------
  lines.push("## Páginas principais");
  lines.push("");
  lines.push(
    item(
      "Início",
      abs("/"),
      "Página inicial: método, serviços, estatísticas, podcast e artigos em destaque.",
    ),
  );
  lines.push(
    item(
      "Sobre",
      abs("/sobre"),
      oneLine(about.bioTitle) ||
        "Percurso, valores e credenciais de Filipa Marques.",
    ),
  );
  lines.push(
    item(
      "Serviços",
      abs("/servicos"),
      "Coaching individual, coaching de equipas, gestão emocional e PNL aplicados ao desporto.",
    ),
  );
  lines.push(
    item(
      "Cursos",
      abs("/cursos"),
      "Formação prática em PNL, gestão emocional e comunicação aplicadas ao desporto.",
    ),
  );
  lines.push(
    item(
      "Blog",
      abs("/blog"),
      "Artigos sobre coaching, PNL, gestão emocional e comunicação no desporto.",
    ),
  );
  lines.push(
    item(
      "Podcast",
      abs("/podcast"),
      "Conversas curtas sobre PNL, gestão emocional e a mente de quem compete.",
    ),
  );
  lines.push(
    item(
      "Contactos",
      abs("/contactos"),
      "Marcar uma conversa: telefone, email e formulário de contacto.",
    ),
  );
  lines.push("");

  // --- Services ------------------------------------------------------------
  if (services.length) {
    lines.push("## Serviços");
    lines.push("");
    for (const s of services) {
      const audience = oneLine(s.tag || s.audience);
      const summary = oneLine(s.summary || s.description);
      const description = audience ? `${summary} — ${audience}` : summary;
      lines.push(item(s.title, abs(`/servicos/${s.slug}`), description));
    }
    lines.push("");
  }

  // --- Courses -------------------------------------------------------------
  if (courses.length) {
    lines.push("## Cursos");
    lines.push("");
    for (const c of courses) {
      const meta = [c.category, c.duration, c.format]
        .map(oneLine)
        .filter(Boolean)
        .join(" · ");
      const description = [oneLine(c.summary), meta && `(${meta})`]
        .filter(Boolean)
        .join(" ");
      lines.push(item(c.title, abs(`/cursos/${c.slug}`), description));
    }
    lines.push("");
  }

  // --- Blog ----------------------------------------------------------------
  if (posts.length) {
    lines.push("## Blog");
    lines.push("");
    for (const p of posts) {
      const date = (p.publishedAt ?? "").slice(0, 10);
      const meta = [p.category, date].filter(Boolean).join(" · ");
      const description = [oneLine(p.excerpt), meta && `(${meta})`]
        .filter(Boolean)
        .join(" ");
      lines.push(item(p.title, abs(`/blog/${p.slug}`), description));
    }
    lines.push("");
  }

  // --- Contact + social ----------------------------------------------------
  lines.push("## Contactos");
  lines.push("");
  lines.push(`- Email: ${site.contact.email}`);
  lines.push(`- Telefone: ${site.contact.phone}`);
  lines.push(`- Localização: ${oneLine(site.contact.location)}`);
  for (const s of site.socials) {
    lines.push(item(s.label, s.href, s.handle));
  }
  lines.push("");

  // --- Optional (skip if a shorter context is needed) ---------------------
  lines.push("## Optional");
  lines.push("");
  if (episodes.length) {
    lines.push(
      item(
        `Podcast (${episodes.length} episódios)`,
        abs("/podcast"),
        `Episódios de coaching desportivo, PNL e gestão emocional. Mais recente: "${oneLine(episodes[0].title)}".`,
      ),
    );
  }
  if (clubsData.clubs.length) {
    lines.push(
      `- ${oneLine(clubsData.title)}: ${clubsData.clubs.map(oneLine).join(", ")}.`,
    );
  }
  lines.push(item("Política de Privacidade", abs("/privacidade")));
  lines.push(item("Termos e Condições", abs("/termos")));
  lines.push(item("Política de Cookies", abs("/cookies")));
  lines.push(item("Sitemap", abs("/sitemap.xml")));
  lines.push("");

  const body = lines.join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=60, stale-while-revalidate=86400",
    },
  });
}
