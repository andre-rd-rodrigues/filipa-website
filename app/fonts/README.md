# Self-hosted fonts

## Termina (titles / display)

Termina is a commercial typeface by **Nootype**. It is not included in this
repo — add your **licensed** web font files here, then activate the loader.

### 1. Add these files to this folder

```
app/fonts/Termina-Medium.woff2   # weight 500
app/fonts/Termina-Demi.woff2     # weight 600  (main title weight)
app/fonts/Termina-Bold.woff2     # weight 700
```

Use `.woff2` (smallest, universally supported). If your license ships `.otf`
only, convert to `.woff2` first (e.g. `fonttools`, `woff2_compress`, or an
online converter you're licensed to use).

### 2. Activate the loader

In `app/layout.tsx`:

- Uncomment the `import localFont from "next/font/local"` line.
- Uncomment the `const termina = localFont({ ... })` block.
- Add `${termina.variable}` to the `<html>` `className`.

`--font-display` in `app/globals.css` already lists `--font-termina` first, so
titles switch to Termina automatically once the variable is defined. Until then
they fall back to Hanken Grotesk and the build stays green.

### 3. Verify

```
pnpm build
```

Then check any page title (hero H1, section H2, blog article title) renders in
the wide geometric Termina rather than Hanken.
