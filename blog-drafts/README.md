# Blog drafts — Cluster "Pressão na competição"

Rascunhos de artigos em Markdown, **independentes da app e do Sanity**. Base: documento `Pressão na competição.docx`.

Nada aqui está ligado ao código do site. É conteúdo para integrares manualmente no Sanity (noutra conta) quando quiseres.

## Cluster (4 artigos, categoria "Alta Performance")

1. **`01-pressao-na-competicao.md`** — Pilar. Liga aos três spokes.
2. **`02-bloqueio-e-interpretacao.md`** — Porque o corpo trava + ameaça vs. desafio.
3. **`03-treinar-a-resposta-a-pressao.md`** — Ferramentas: respiração, treino sob pressão, palavras-chave.
4. **`04-competicao-alem-do-resultado.md`** — Análise pós-competição + identidade.

## Imagens de capa

As capas estão em `images/` (16:9, geradas com a linha visual do site: fundo quase preto + acento laranja `#FF5F00`). Cada artigo referencia a sua no frontmatter (`coverImage`), com texto alternativo em `coverImageAlt`. No Sanity, faz upload da imagem para o campo `coverImage` (tipo `figure`) e usa o `coverImageAlt` como texto alternativo/legenda.

| Artigo | Imagem |
|---|---|
| 01 pilar | `images/cover-01-pressao.png` |
| 02 bloqueio | `images/cover-02-bloqueio.png` |
| 03 treino | `images/cover-03-treino.png` |
| 04 análise | `images/cover-04-analise.png` |

## Mapa frontmatter → campos do schema `post` do Sanity

| Frontmatter | Campo Sanity (`post`) | Notas |
|---|---|---|
| `title` | `title` (string) | Título do artigo |
| `slug` | `slug.current` (slug) | Gerar a partir do título (máx. 96) |
| `excerpt` | `excerpt` (text) | Resumo para listagens e meta |
| `category` | `category` (reference → `category`) | Referenciar o doc de categoria com este `title` |
| `author` | `author` (string) | Default "Filipa Marques" |
| `publishedAt` | `publishedAt` (date) | **Placeholder — ajustar antes de publicar** |
| `readingMinutes` | `readingMinutes` (number) | Estimativa |
| `keywords` | `keywords` (array<string>) | Grupo SEO |
| `relatedPosts` | `relatedPosts` (array<reference → post>) | Slugs dos artigos do cluster |
| `coverImage` | `coverImage` (figure) | **Falta imagem** — adicionar no Sanity |
| corpo do markdown | `body` (richText / Portable Text) | Colar como blocos de texto |
| secção `## FAQ` | `faq` (array<faqItem>) | Cada par pergunta/resposta → `question`/`answer` |

## Ligações internas

Os artigos referenciam-se entre si e a artigos já publicados via caminhos `/blog/<slug>`:

- Cluster ansiedade competitiva: `ansiedade-competitiva-o-que-e-e-sintomas`, `ansiedade-ou-ativacao-quando-prejudica-o-rendimento`
- Identidade: `identidade-do-atleta-quando-o-resultado-ocupa-tudo`

Confirma/ajusta os slugs no momento da integração.
