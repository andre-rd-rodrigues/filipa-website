# Fonts

Display titles use **Termina** (local `Termina-Bold.otf`), loaded via `next/font/local` in `app/layout.tsx` and exposed as `--font-termina`.

Only the **Bold** cut is licensed, so it's declared across the `100 900` weight range — every display weight (the site only uses 700/800) resolves to it. Unlike the previous trial cut, this file includes the full accented Latin set (é, ç, ã, õ, …).

Body and UI use **Hanken Grotesk**. The logo wordmark uses **Bodoni Moda** only.

See `DESIGN.md` §3 Typography and `--font-display` in `app/globals.css`.
