import type { StructureResolver } from "sanity/structure";

/** Documentos únicos (singletons): editados numa só vista, sem "criar novo". */
const SINGLETONS: { id: string; title: string; schema: string }[] = [
  { id: "homePage", title: "Início", schema: "homePage" },
  { id: "aboutPage", title: "Sobre", schema: "aboutPage" },
  { id: "servicesPage", title: "Serviços", schema: "servicesPage" },
  { id: "coursesPage", title: "Cursos", schema: "coursesPage" },
  { id: "blogPage", title: "Blog", schema: "blogPage" },
  { id: "podcastPage", title: "Podcast", schema: "podcastPage" },
  { id: "contactPage", title: "Contactos", schema: "contactPage" },
];

/**
 * Estrutura do Studio, em pt-PT:
 *   Definições do site · Páginas · Conteúdo
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Conteúdo")
    .items([
      // Definições globais (singleton)
      S.listItem()
        .title("Definições do site")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),

      S.divider(),

      // Páginas (singletons)
      S.listItem()
        .title("Páginas")
        .child(
          S.list()
            .title("Páginas")
            .items(
              SINGLETONS.map((s) =>
                S.listItem()
                  .title(s.title)
                  .id(s.id)
                  .child(
                    S.document().schemaType(s.schema).documentId(s.id),
                  ),
              ),
            ),
        ),

      S.listItem()
        .title("Páginas legais")
        .schemaType("legalPage")
        .child(S.documentTypeList("legalPage").title("Páginas legais")),

      S.divider(),

      // Conteúdo (coleções)
      S.listItem()
        .title("Serviços")
        .schemaType("service")
        .child(S.documentTypeList("service").title("Serviços")),
      S.listItem()
        .title("Cursos")
        .schemaType("course")
        .child(S.documentTypeList("course").title("Cursos")),
      S.listItem()
        .title("Artigos do blog")
        .schemaType("post")
        .child(S.documentTypeList("post").title("Artigos do blog")),
      S.listItem()
        .title("Episódios do podcast")
        .schemaType("episode")
        .child(S.documentTypeList("episode").title("Episódios do podcast")),
      S.listItem()
        .title("Categorias")
        .schemaType("category")
        .child(S.documentTypeList("category").title("Categorias")),
    ]);

/** Tipos geridos por singletons ou pela estrutura acima (fora da criação livre). */
export const SINGLETON_TYPES = new Set(SINGLETONS.map((s) => s.schema));
