# Jaisy — Website

Corporate marketing site for **Jaisy**, a Cairo-based advertising and production
agency. Built with the Next.js App Router, TypeScript and Tailwind CSS v4.

All copy on the site is taken verbatim from `CONTENT.md`, which is the single
source of truth. The technical brief lives in `PROMPT.md`.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # PowerShell: Copy-Item .env.example .env.local
npm run dev
```

Open <http://localhost:3000>.

---

## GitHub Pages

Pushes to `main` publish a static build via `.github/workflows/pages.yml`.
The live URL is `https://<your-username>.github.io/jaisy-website/`.

The contact form API is not available on Pages (static hosting only).
Visitors can still use the listed phone / WhatsApp details.

### Requirements

- Node.js 20 or newer (developed on Node 24)
- npm 10 or newer

---

## Scripts

| Script              | What it does                                    |
| ------------------- | ----------------------------------------------- |
| `npm run dev`       | Start the dev server on port 3000               |
| `npm run build`     | Production build (also type-checks and lints)   |
| `npm run build:pages` | Static export for GitHub Pages                |
| `npm run start`     | Serve the production build                      |
| `npm run lint`      | ESLint across the repo                          |
| `npm run typecheck` | `tsc --noEmit` with strict settings             |

---

## Environment variables

| Variable               | Required | Description                                                            |
| ---------------------- | -------- | ---------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | No       | Public base URL used for metadata, canonicals, sitemap and OG tags. Defaults to `http://localhost:3000`. |

Phase 2 variables (database, auth, storage, email) are listed and commented out
in `.env.example`.

---

## Architecture

```
src/
  app/                    App Router: layout, page, metadata routes, API routes
    api/health/           Uptime probe
    api/public/inquiries/ Contact form endpoint (POST)
  components/
    layout/               Preloader, navbar, footer, logo
    sections/             The 10 homepage sections
    ui/                   Reusable primitives (Button, Reveal, Section, ...)
  hooks/                  Client-side hooks (scroll spy, lightbox, filters)
  lib/
    api/                  Response envelope, error handling, rate limiting
    content/              Typed content objects mirroring CONTENT.md
    data/                 Data-access layer — the only thing pages import
    repositories/         Persistence adapters
    services/             Business logic (validation, sanitising, rate limits)
    utils/                cn(), motion variants, accent colour helpers
    validation/           Zod schemas shared by client and server
```

### Key conventions

- **Server Components by default.** Interactivity is isolated into small client
  islands marked with `"use client"`.
- **Pages never read content directly.** `src/app/page.tsx` calls async getters
  from `@/lib/data`. In Phase 1 those getters return the static objects from
  `@/lib/content`; in Phase 2 the same getters will query Prisma, so no page or
  section component has to change.
- **API layer is three-tiered:** Route Handler → Service → Repository. Every
  endpoint responds with `{ success, data?, error? }`.
- **Validation is shared.** `src/lib/validation/inquiry.ts` powers both the
  React Hook Form resolver and the server-side re-validation.
- **Sections are presentational.** They receive typed props and never fetch.

---

## Design system

Tokens live in `src/app/globals.css` using Tailwind v4's CSS-first `@theme`
block — there is **no `tailwind.config.ts`**.

- Ink scale (`--color-ink-950` … `--color-ink-600`) for the dark surface
- Brand accents: blue `#1ab3ff`, pink `#fe2f94`, yellow `#ffdd07`. Blue and
  yellow are used as **flat** per-item accents only (service cards, portfolio
  tiles, ambient blobs).
- **Gradients are pink-based only.** `bg-gradient-brand` and
  `text-gradient-brand` run pink → white and always pair with `text-ink-950`
  on filled surfaces. Rules and underlines run pink → transparent so they
  dissolve into the canvas. The old blue → pink → yellow ramp is retired.
- Custom utilities: `container-page`, `surface-card`, `text-gradient-brand`,
  `bg-gradient-brand`, `grid-texture`, `noise-overlay`, `mask-fade-x`, `eyebrow`
- Every animation respects `prefers-reduced-motion`

### Fonts

`CONTENT.md` §A.10 specifies **Open Sauce One** and **Stavok Grotesque**. Open
Sauce One is distributed via Fontshare, which is not reachable from this build
environment, so the site currently uses Google Fonts substitutes wired to the
same CSS variables:

| Role    | CSS variable     | Current font       | Intended font     |
| ------- | ---------------- | ------------------ | ----------------- |
| Display | `--font-display` | Space Grotesk      | Stavok Grotesque  |
| Body    | `--font-body`    | Plus Jakarta Sans  | Open Sauce One    |

To swap in the real families, drop the `.woff2` files into `src/assets/fonts/`
and replace the `next/font/google` calls in `src/lib/fonts.ts` with
`next/font/local`. Nothing else needs to change.

---

## Media assets

No photography ships with this repository. Until real assets are supplied:

- **Portfolio** — every item in `src/lib/content/portfolio.ts` has
  `imageUrl: null` and a `suggestedAsset` field recording the filename from
  `CONTENT.md` §B.9. A deterministic generative `ArtworkTile` renders branded
  abstract art in place of each image.
- **Client logos** — rendered as typographic grayscale chips, per the note in
  `CONTENT.md` §B.10.

To add real images: drop the files into `public/images/portfolio/` using the
names from `suggestedAsset`, then set `imageUrl` on the matching seed entry.
The gallery and lightbox pick them up automatically.

---

## Contact form

`POST /api/public/inquiries`

- Zod-validated on both client and server
- Honeypot field (`website`) silently discards bots
- Fixed-window rate limit: 5 submissions per IP per 10 minutes
- Input is sanitised before persistence
- Phase 1 stores submissions in memory and logs them; Phase 2 will persist to
  Postgres and send an email notification

---

## Accessibility & SEO

- Semantic landmarks, a skip link, and `aria-labelledby` on every section
- Visible focus rings and keyboard-operable menu, filters and lightbox
- `generateMetadata` with Open Graph and Twitter cards
- Generated `opengraph-image`, `icon`, `sitemap.xml` and `robots.txt`
- Organization JSON-LD in the root layout
- Security headers (CSP, HSTS, X-Frame-Options, Referrer-Policy) in
  `next.config.ts`

---

## Roadmap — Phase 2

Admin panel and database, per `PROMPT.md` §7:

1. Prisma schema + Postgres
2. Auth.js credentials login for staff
3. CRUD screens for services, portfolio, clients, industries and site settings
4. Inquiry inbox
5. Point the getters in `src/lib/data` at the Prisma repositories

The page and component layer is already decoupled from the content source, so
Phase 2 is additive.
