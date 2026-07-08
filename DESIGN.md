---
name: Filipa Marques — Coaching & PNL
description: Dark-mode alto-energia — títulos Syne, onda suave laranja sobre preto (#0A0A0A). Layout moderno estilo FitFlex.
colors:
  primary: "#FF5F00"
  primary-hover: "#FF7A2B"
  secondary: "#222222"
  tertiary: "#FFFFFF"
  neutral: "#0A0A0A"
  apricot: "#FF9E66"
  gray-slate: "#4A4A4A"
  gray-mist: "#8A8A8A"
  base-ground: "#0A0A0A"
  ink-raised: "#222222"
  ink-line: "#2E2E2E"
  surface-panel: "#222222"
  surface-muted: "#2A2A2A"
  text-primary: "#FFFFFF"
  text-secondary: "#CBCBCB"
  text-muted: "#9B9B9B"
  text-inverse: "#FFFFFF"
  text-inverse-muted: "#A6A6A6"
  border-stone: "#2E2E2E"
  success: "#4BAE7E"
  error: "#E5675A"
typography:
  display:
    fontFamily: "Syne, Hanken Grotesk, system-ui, sans-serif"
    fontSize: "clamp(3rem, 7vw, 5.5rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Syne, Hanken Grotesk, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3.25rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 2vw, 1.5rem)"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "0"
  label:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.14em"
rounded:
  sm: "0px"
  md: "0px"
  pill: "0px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section: "clamp(4rem, 9vw, 6.5rem)"
  section-lg: "clamp(5.5rem, 12vw, 9rem)"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    rounded: "0px"
    padding: "16px 36px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.neutral}"
    rounded: "0px"
    padding: "16px 36px"
  button-secondary-dark:
    backgroundColor: "transparent"
    textColor: "{colors.tertiary}"
    rounded: "0px"
    padding: "16px 36px"
  input-field:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.tertiary}"
    rounded: "0px"
    padding: "13px 16px"
  chip-badge:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    rounded: "0px"
    padding: "6px 14px"
    typography: "{typography.label}"
---

# Design System: Filipa Marques — Coaching & PNL

## 1. Overview

**Creative North Star: "The Floodlit Field at Night"**

Black is the stadium after dark; orange is the floodlight that picks out the action. This is a **high-energy, always-dark brand surface** — cinematic, modern, and confident. The whole site lives on a pure neutral ground (`#0A0A0A`) carrying **one continuous soft wave**: a warm primary glow (`#FF5F00`) that blooms from the top and dissolves smoothly down the entire page — the hero glow, extended, with no seams and no grain. Wide, geometric **Syne** titles carry the energy; Hanken Grotesk keeps the reading calm; vivid orange is the rare, deliberate light.

The **core layout reference is FitFlex Personal Coach** (dark hero, oversized bold display titles, overlapping photo panels, a brand-logo strip, orange category badges, numbered service lines, floating action rail). We take its structure and pace and translate it to a boutique sports-psychology voice — sophisticated, not hardcore gym.

**Layout philosophy:** reject flat card grids. Depth comes from **layered compositions** (photo panels stacked on top of each other via overlap, negative margins, and z-index), **asymmetric bento grids** (one panel leading a set), **transparent bands** that let the soft wave flow through with Secondary `#222222` cards for structure, and **scroll-driven motion** (parallax drift, velocity-boosted marquees). For long-form (blog articles) the reference is the images provided: a full-bleed dark hero with an orange category badge and a giant Syne title, then a readable single column with a drop-cap opener and pull-quotes marked by an orange dash.

The system explicitly rejects: hardcore gym aesthetics (black + orange with no elegance), cold corporate gray, SaaS card grids, Instagram-coach clichés, and lime-neon B2B tones (per PRODUCT.md anti-references).

**Key Characteristics:**

- **Always dark:** a single neutral ground (`#0A0A0A`) under one soft-wave glow; no light sections
- **Soft-wave background:** one continuous `#FF5F00` radial bloom from the top, dissolving smoothly across the whole page — no grain, no seams
- **Syne** wide geometric titles (display/headline) + **Hanken Grotesk** body; **Bodoni Moda** kept only for the logo wordmark
- **Palette:** primary `#FF5F00`, secondary `#222222` (panels/cards), tertiary `#FFFFFF` (text), neutral `#0A0A0A` (ground); apricot `#FF9E66` is a soft primary tint for numbers/highlights
- **Squared everything:** 0px radius on buttons, cards, inputs, chips, imagery
- **Layered compositions:** overlapping photo panels, offset accent blocks, bento asymmetry — FitFlex-style, never identical card grids
- **Choreographed motion:** GSAP hero timelines, scroll parallax, velocity-marquees — gated behind JS + `prefers-reduced-motion`
- **Numbered rows** only where sequence matters (services, 5-step process)
- **pt-PT**, `tu` address, action verbs; progressive enhancement keeps content visible without JS

## 2. Colors: The Floodlight Palette

Four colors: primary orange, secondary charcoal, tertiary white, neutral black. Warmth lives in the primary and the soft-wave glow — never in a wash and never in a light section.

### Primary

- **Primary** (#FF5F00): The one accent — CTA fills (with neutral text), category badges, focus rings, active states, sequence numbers, links and eyebrows (it reads AA as text on the neutral ground), and the soft-wave glow.
- **Primary Hover** (#FF7A2B): Hover for primary fills — lifted so it pops on dark.
- **Apricot** (#FF9E66): A soft primary tint for numbers, highlighted words in headings, and quote attribution — where full-strength primary would shout.

### Secondary

- **Secondary** (#222222): Raised panels and cards — bento tiles, forms, course cards, blog pull-quote blocks. The step up from the neutral ground.
- **Surface Muted** (#2A2A2A): Hover rows and subtler panels.
- **Ink Line / Border Stone** (#2E2E2E): Hairline dividers and borders on dark.

### Tertiary

- **Tertiary / Text Primary** (#FFFFFF): Headings and body — the default text on dark.
- **Text Secondary** (#CBCBCB): Strong secondary text.
- **Text Muted** (#9B9B9B): Meta and captions — the floor for readable text (≥4.5:1 on the neutral ground).
- **Text Inverse Muted** (#A6A6A6): Secondary text on panels.
- **Gray Mist** (#8A8A8A): Decorative labels, brand-logo strip (dimmed), dividers — never body copy.

### Neutral

- **Neutral / Base Ground** (#0A0A0A): The single body ground, under the soft-wave glow. Base bands are transparent so the wave shows through; the footer and deepest bands sit on it too.

### Named Rules

**The Always-Dark Rule.** There is no light mode. Every ground is the neutral base or a translucent tint of it. Never introduce a light (`#F5F4F2`/white) section — reading rooms are darker panels, not bright bands.

**The Soft-Wave Rule.** The background is ONE continuous soft wave: a single `#FF5F00` radial bloom from the top of the body, dissolving smoothly down the whole document. No grain, no fixed tiling, no per-section glows. Base sections stay transparent to reveal it; other bands use translucent tints (`bg-white/[0.02]`, `bg-black/40`) — never flat solid blocks that would seam the wave. Cards are the only solid surfaces (Secondary `#222222`).

**The Floodlight Rule.** Orange is light, and light is rare. Combined primary coverage stays ≤12% of any screen: CTAs, badges, sequence numbers, focus states, one accent word per heading, the soft-wave glow.

**The Two-Orange Rule.** Primary `#FF5F00` fills buttons and badges (with neutral `#0A0A0A` text) and sets large numbers, links, and eyebrows — it clears AA as text on dark. Use Apricot `#FF9E66` for softer numbers/highlights. Never white text on a primary fill (fails contrast).

## 3. Typography

**Display / Title Font:** Syne (Google Fonts) — geometric, high-energy sans. Weight **700** (bold) for display and headlines.
**Body / UI Font:** Hanken Grotesk (system-ui, sans-serif).
**Logo Font:** Bodoni Moda — the Didone brand wordmark **only**; never for running titles.

**Character:** Syne's geometric forms give big titles a modern, athletic, confident presence (see the provided blog-hero and homepage-section references). Hanken keeps body copy warm and quiet underneath. The contrast is weight and presence, not serif-vs-sans — one loud display sans over one calm text sans.

### Hierarchy

- **Display** (Syne 700, clamp(3rem, 7vw, 5.5rem), line-height 1.02, -0.02em): Hero H1 and blog-article titles. Cap at 5.5rem. `text-wrap: balance`. Needs a dark or scrimmed ground — never over busy photo midtones without a scrim.
- **Headline** (Syne 700, clamp(2rem, 4vw, 3.25rem), line-height 1.08): Section H2. One per section.
- **Title** (Hanken Grotesk 600, clamp(1.25rem, 2vw, 1.5rem), line-height 1.3): Card titles, course names, FAQ questions. Hanken here — Syne gets too heavy at small sizes.
- **Body** (Hanken Grotesk 400, 1.0625rem / 17px, line-height 1.65): All prose. 65–75ch max. `text-wrap: pretty`. On dark, line-height reads a touch lighter — keep ≥1.65.
- **Label** (Hanken Grotesk 500, 0.8125rem, 0.14em tracking, uppercase): Nav, badges, form labels, attribution.
- **Marquee** (Hanken Grotesk 600, clamp(3.5rem, 17vw, 15rem), line-height 0.95, -0.03em): Decorative scroll-band type only — outlined or apricot-filled, never an H1.

### Named Rules

**The Syne-Display Rule.** Syne is used at Headline size and above only. Below ~1.75rem, switch to Hanken Grotesk. Display sans at paragraph size is a legibility bug, not energy.

**The One Kicker Rule.** At most one uppercase tracked label per section, and only when it names a category. Section titles stand alone.

## 4. Elevation

The system is **flat by default**; depth comes from **tonal bands** and **layered overlap** — the transparent wave base, Secondary `#222222` panels, and photo stacks sitting on top of each other — not floating card shadows.

Shadows appear as **state feedback** or **photo-panel depth**:

- Primary button hover: `translateY(-1px)` + `0 6px 20px rgba(216, 113, 30, 0.22)` (warm orange glow)
- Header on scroll: `background: rgba(10, 10, 10, 0.90)` + `backdrop-filter: blur(12px)` — no box-shadow
- Layered image panels: `0 24px 60px rgba(0, 0, 0, 0.45)` on offset photo stacks — structural stack depth

### Shadow Vocabulary

- **Orange lift** (`0 6px 20px rgba(216, 113, 30, 0.22)`): Primary button hover only.
- **Photo panel depth** (`0 24px 60px rgba(0, 0, 0, 0.45)`): Layered showcase stacks — front panel deeper than back.
- **Header scrim** (no box-shadow): translucent Ink Black + blur.

### Named Rules

**The Warm-Shadow Rule.** Interactive shadows are orange glows. Neutral shadows are permitted only on overlapping photo panels where they simulate physical stack depth on the dark ground.

**The Flat-By-Default Rule.** Content rows use 1px Ink Line separators, not card containers.

**The Layer-Stack Rule.** When two surfaces overlap, the front panel gets the deeper shadow and an offset accent block behind — never identical flat tiles side by side.

## 5. Components

### Buttons

- **Shape:** Squared rectangles (0px radius).
- **Primary:** Action Orange fill, Ink Black text (never white — fails contrast), 16px × 36px, Hanken 600 uppercase label. Labels: *Marcar conversa*, *Saber mais*, *Enviar mensagem*.
- **Hover / Focus:** Action Orange Hover fill, `translateY(-1px)`, warm orange lift; focus ring 2px Action Orange.
- **Secondary (default, on dark):** Transparent, 1.5px white border at 55% opacity, light label. Hover: `rgba(255,255,255,0.1)` fill. Focus ring in Apricot.
- **Ghost:** Primary (#FF5F00) label, underline — no fill.

### Chips / Badges

- **Style:** Category **badge** = solid Primary fill with neutral text (the FitFlex "TRAINING" badge), squared, Label typography. Alternative on quiet panels: transparent with `#FF5F00` text + 1px primary border.
- **Use:** One category badge per course / article (*COMUNICAÇÃO*, *TRAINING*) — never a filter row.

### Cards / Containers

- **Corner Style:** 0px everywhere.
- **Background:** Secondary (#222222) on cards/panels; transparent over the wave base.
- **Shadow Strategy:** None at rest unless part of a layered image stack.
- **Border:** 1px Ink Line (#2E2E2E).
- **Internal Padding:** 24px (lg) minimum; feature/bento tiles 32–40px.

### Inputs / Fields

- **Style:** Surface Panel fill, 1px Ink Line, 0px radius, Body typography, light text.
- **Focus:** Border shifts to Action Orange + 2px orange ring.
- **Error:** Border Error (#E5675A), message in Body-sm below.
- **Labels:** Label style in Text Muted — always visible.

### Navigation

- **Header:** Fixed over content, transparent → Ink Black scrim (90% + blur) after 24px scroll. Logo = Bodoni Didone wordmark in Action Orange + tracked tagline. Links Hanken 500, light at 80% → 100% on hover/active.
- **CTA in nav:** Squared *Marcar conversa* — white outline on hero, fills Action Orange on hover.
- **Mobile:** Slide-down panel on Ink Black; links ≥48px touch height; full-width primary CTA.

### Section Band (layout primitive)

- **Tones:** `page` / `surface` (transparent — reveal the soft wave) | `muted` / `ink` (faint `bg-white/[0.02–0.03]`) | `dark` (`bg-black/40` deepen). Translucent only — never flat solid bands, per the Soft-Wave Rule.
- **Padding:** Default `clamp(4rem, 9vw, 6.5rem)`; `lg` `clamp(5.5rem, 12vw, 9rem)`.
- **Container:** Max 80rem, padding `clamp(1.25rem, 4vw, 2rem)`; optional `narrow` 46rem.

### Cinematic Hero (signature — home)

- **Layout:** 12-col grid; copy (7) overlaps image (5) via negative margin + z-index. Radial orange floodlight wash top-right.
- **Image stack:** Offset apricot accent block behind a square photo; clip-path wipe reveal; bottom gradient scrim.
- **Type:** Line-by-line Syne H1 reveal; one accent word in Apricot.
- **Motion:** GSAP one-shot timeline + scroll parallax; gated + visible-by-default without JS.

### Layered Showcase (signature)

- **Layout:** Copy + two overlapping photo panels — back ~68% top-left, front ~58% bottom-right ringed in the base ground; offset accent block behind. Matches the FitFlex "more than gym training" section and the provided image.
- **Motion:** Independent scroll parallax on each panel.

### Brand-Logo Strip (FitFlex pattern)

- **Layout:** Full-width row of dimmed partner/context logos (Gray Mist on the wave base), evenly spaced, low contrast — a trust band between hero and story.
- **Use:** Once, high on the homepage.

### Scrolling Headline (signature)

- **Layout:** Full-bleed horizontal marquee — oversized outlined or apricot-filled sans.
- **Motion:** Baseline drift + scroll-velocity boost; static centered fallback with reduced motion.

### Bento Feature Grid (signature)

- **Layout:** `sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2`; first item 2×2 leading. Deepest-ink feature tile among raised neighbours.
- **Content:** Sequence number (Syne/Apricot) + title + body + arrow CTA.

### Service Row (signature)

- **Layout:** Full-width row — accent number (Syne, Action Orange) + Title + circular arrow (40px, 1px ring).
- **Hover:** Title shifts 4px right; arrow rotates 45°. 220ms ease-out.

### Blog Article (long-form — provided reference)

- **Hero:** Full-bleed dark photo, orange category **badge**, giant Syne title, author + date + comments meta row.
- **Body:** Single readable column on the wave base; **drop-cap** opening letter (large, light); section H2 in Syne.
- **Pull-quote:** Raised charcoal panel, Body-large quote, attribution preceded by a short **orange dash** rule (see the "Piter Bowman" reference).
- **Rail (optional):** Floating squared Action Orange action buttons (share / bag / etc.) fixed to the right edge.

### Process Timeline (signature)

- **Layout:** 5 steps on Ink / Ink Raised. Numbers in Apricot, vertical connector.

### FAQ Accordion

- **Toggle:** Chevron rotates 180°, 250ms; answer via animated `max-height`. Instant with reduced motion.

### Motion System

- **Easing:** `--ease-out-quart` / `-quint` / `-expo` for entrances; `--ease-standard` for hovers (220ms).
- **Reveal (CSS):** `.reveal` fade-up via Intersection Observer — visible by default.
- **GSAP:** Hero and layered showcase only; revert on unmount.
- **Reduced motion:** Disable parallax, marquees, GSAP; keep instant state changes and visible content.

### Logo (brand asset)

- **Treatment:** High-contrast Didone wordmark (Bodoni Moda), Action Orange on dark. Ship as SVG where possible; never re-typeset the mark in Syne.

## 6. Do's and Don'ts

### Do:

- **Do** keep the whole site dark: one neutral ground (`#0A0A0A`) under a single soft-wave glow. No light sections.
- **Do** ship high-energy layout — overlap, parallax, bento asymmetry, brand-logo strip, scroll type — modelled on FitFlex.
- **Do** set titles in Syne (display/headline); keep Hanken for body and small titles; keep Bodoni only for the logo.
- **Do** let base bands stay transparent so the soft wave flows through; use Secondary `#222222` panels for cards and reading rooms.
- **Do** use Primary `#FF5F00` fills/badges with neutral text; use Primary/Apricot for orange text on dark.
- **Do** keep body copy ≥4.5:1 (Text Primary/Secondary/Muted); reserve Gray Mist for decoration and the logo strip.
- **Do** keep every corner square (0px radius).
- **Do** layer content — overlapping panels and offset stacks, never flat card grids.
- **Do** style long-form like the references: orange badge, giant Syne title, drop-cap opener, orange-dash pull-quotes.
- **Do** respect `prefers-reduced-motion`; gate GSAP and marquees behind JS; keep content visible without animation.
- **Do** write in pt-PT with `tu` address and action verbs; cap hero/article H1 at 5.5rem and test PT overflow at tablet widths.

### Don't:

- **Don't** introduce a light mode or a cream/beige/white section — the site is always dark (Always-Dark Rule).
- **Don't** break the wave with flat solid section bands — base bands stay transparent; other bands use translucent tints (Soft-Wave Rule).
- **Don't** set Syne below ~1.75rem, or re-typeset the Didone logo in Syne.
- **Don't** use hardcore gym aesthetics (black + orange with no elegance or editorial restraint).
- **Don't** go corporate cold — gray-only palettes with no personality.
- **Don't** build identical icon + heading + text card grids (SaaS cliché).
- **Don't** use motivational Instagram-coach tropes (empty quotes, fist-pump stock photos).
- **Don't** use lime-neon accents (wrong register for psychology and coaching).
- **Don't** put white text on a Primary fill, or use Gray Mist for body copy (both fail contrast).
- **Don't** put an eyebrow above every section, or number sections that aren't real sequences.
- **Don't** use border-left/right accent stripes, gradient text, or decorative glassmorphism.
- **Don't** hide content behind animation gates — if JS or motion fails, everything must still render.
- **Don't** ship the Canva site aesthetic as the visual target — content reference only.
