---
name: extract-articles
description: >-
  Analyzes a source text (document, transcript, notes, or long draft) and
  proposes a cluster of 4-5 focused articles to extract from it, each with
  title, slug, excerpt, keywords, angle, and internal links. Preserves the
  source text's language, register, voice, and formatting, and avoids common AI
  writing tells such as em dashes used as parenthetical separators, unnecessary
  commas, negation-heavy framing, the rule of three, and marketing jargon. Use
  when the user adds or points to a source text to turn into blog posts or an
  article cluster, asks to extract several articles from a document, or wants
  content ideas derived from existing material while keeping their voice.
---

# Extract articles from a source text

Turn one source text into a small cluster of focused articles, without losing the author's voice and without sounding like AI wrote it.

## When to use

The user adds a document, transcript, set of notes, or long draft and wants it turned into blog posts, an article cluster, or content ideas. Also use when they ask "what articles can we extract from this?" or "split this into articles".

## Workflow

Copy this checklist and track progress:

```
- [ ] Step 1: Profile the source (language, voice, format)
- [ ] Step 2: Extract the distinct ideas (article seeds)
- [ ] Step 3: Check for overlap with existing content
- [ ] Step 4: Design the cluster (4-5 articles, pillar + spokes)
- [ ] Step 5: Deliver proposals (or drafts) in the source's voice
- [ ] Step 6: Self-review against the AI-tells checklist
```

### Step 1: Profile the source

Read the whole text first. Note, so you can mirror them later:

- **Language and locale** (e.g. pt-PT vs pt-BR, en-US vs en-GB). Match it exactly.
- **Register / person**: formal or informal, `tu` vs `você`, first vs second person.
- **Tone**: calm and analytical, energetic, academic, conversational.
- **Sentence rhythm**: short and punchy, or longer and layered. Roughly match average length.
- **Formatting habits**: heading style, use of questions as headings, lists, pull quotes, bold, CTA at the end.
- **Vocabulary**: recurring terms and phrasings the author actually uses. Reuse their words, not synonyms you prefer.

The goal is that a reader of the original could not tell the articles were reworked.

### Step 2: Extract the distinct ideas

List the self-contained ideas in the text. A good article seed is one idea that can stand alone and answer a real question. Group related passages under each seed. Flag ideas that only make sense as a sub-point (those become sections or internal links, not separate articles).

### Step 3: Check for overlap with existing content

If the project has existing articles (repo files, CMS such as Sanity, a `/blog` route), scan them. For each seed, decide:

- **New** — not covered, safe to write.
- **Partial overlap** — adjacent to an existing piece; differentiate the angle and link instead of repeating.
- **Already covered** — drop it or fold it into another article as a linked reference.

State these calls explicitly in the output.

### Step 4: Design the cluster

Propose **4-5 articles** as a hub-and-spoke cluster:

- **1 pillar** that frames the whole topic and links to the spokes.
- **3-4 spokes**, each owning one idea in depth, cross-linking to the pillar and siblings.

Each article must be genuinely distinct. If two proposals share more than ~30% of their substance, merge them or sharpen the angles. Keep the same category/taxonomy the source's site already uses.

### Step 5: Deliver

Default to **proposals** (see template) unless the user asks for full drafts. When drafting, write every article in the source's voice from Step 1, and match its language, register, and formatting. Preserve any existing structural conventions (e.g. an FAQ section, a closing CTA) if the project uses them.

### Step 6: Self-review

Before finishing, run the drafts or proposals through the AI-tells checklist below and fix every hit.

## Voice preservation checklist

- [ ] Same language and locale as the source
- [ ] Same person and register (`tu`/`você`, formal/informal)
- [ ] Reuses the author's actual terms and phrasings
- [ ] Sentence length and rhythm are similar to the source
- [ ] Heading, list, and quote styles match the source/site
- [ ] Keeps the source's structural conventions (FAQ, CTA, etc.)
- [ ] No new tone the author never uses (hype, corporate, academic)

## Avoid these AI tells

Fix every occurrence. Examples show the tell, then the fix.

**Em dash as a parenthetical or clause separator.** Prefer commas, or nothing.
- Tell: `Este mecanismo — o momento em que trava — merece atenção.`
- Fix: `Este mecanismo, o momento em que trava, merece atenção.`

**Negation-heavy framing** ("não é X, é Y" / "not just X, but Y") used repeatedly. Use it once at most; otherwise state things positively.
- Tell: `Não é sobre vencer. É sobre evoluir. Não se trata de...`
- Fix: `O foco está na evolução.`

**Unnecessary commas / comma splices.** Don't join two full sentences with a comma when the source wouldn't; don't add a comma before every subordinate clause.
- Tell: `Treina a respiração, isto ajuda no jogo.`
- Fix: `Treina a respiração. Isto ajuda no jogo.` (or join with a conjunction)

**Rule of three everywhere** (triads of adjectives/nouns as a reflex). Vary the count; use two, or one strong word.
- Tell: `clareza, foco e consistência` in every paragraph.

**Marketing / filler jargon and clichés.** Cut them.
- Avoid: "no mundo de hoje", "é importante notar que", "num mundo cada vez mais", "desbloquear o potencial", "elevar ao próximo nível", "mergulhar fundo", "game-changer", "in today's world", "it's worth noting", "delve", "leverage", "unlock", "moreover", "furthermore", "in conclusion".

**Empty transitions and windups.** Don't open with "Além disso" / "Por outro lado" / "Em suma" as a reflex, and don't restate the intro as a conclusion.

**Hedging and over-qualification.** Cut "de certa forma", "por assim dizer", "pode-se dizer que" when they add nothing.

**Symmetrical, templated paragraphs.** Real writing varies paragraph and sentence length. Break the pattern.

**Emoji, bold-spam, and title case** unless the source already uses them.

**Invented facts, stats, or quotes.** Only use claims present in the source. Never fabricate numbers or citations.

## Output template

For each proposed article:

```markdown
### [n]. [Working title] — (pillar | spoke)
- **slug:** kebab-case-slug
- **excerpt:** one or two sentences in the source's voice
- **category:** [existing site category]
- **keywords:** term1, term2, term3
- **angle:** what this article uniquely covers (1-2 sentences)
- **source:** which passage(s) of the text it draws from
- **overlap:** New | Partial (differentiate from X) | link to existing Y
- **internal links:** pillar + sibling slugs to reference
```

End with a short **cluster map** showing how the pillar and spokes link together, and flag any seeds you deliberately dropped and why.
