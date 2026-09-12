# BUILD PROMPT — Jaisy Corporate Website (Frontend + CMS Admin Panel)

You are an expert full-stack product engineer. Build a complete, production-quality
marketing website for **Jaisy**, an Egyptian integrated-advertising / signage / exhibitions
/ events / promotional-products / production company. Read `CONTENT.md` (in this same
folder) first — it is built from **two official client documents**: the business team's
approved "Repositioning Strategy & Content Plan" (Section A of CONTENT.md — this is
**authoritative** for headlines, CTA labels, section headings, services list, and
differentiators) and the older company portfolio (Section B — supporting depth, the full
client list, portfolio images, and contact details). CONTENT.md's own §0 explains exactly
how the two combine. Use CONTENT.md as the single source of truth for every piece of text
on the site, following its priority rule wherever the two documents differ. Do not invent
facts that contradict it. Where content is marked as a placeholder (e.g. client logo art,
social links), build the feature to be fully editable later from the admin panel rather
than hardcoding fake data.

Work in **two clearly separated phases**, and complete Phase 1 fully (including polish,
responsiveness, and animation) before starting Phase 2:

- **Phase 1 — Frontend**: fully static/hardcoded-from-CONTENT.md marketing site, pixel-
  polished, animated, responsive, deployable on its own.
- **Phase 2 — Backend + Admin Panel**: wire the same frontend to a database and an admin
  dashboard so non-technical staff can edit every section, manage the portfolio gallery,
  manage client logos, manage platform/social links, and view inquiry-form submissions.

---

## 1. Brand & Design Direction

**Vibe:** Modern, bold, energetic, premium industrial-creative agency. Think confident
large typography, dark canvas, punchy neon-adjacent accent colors, glassmorphism panels,
and a subtle sense of motion everywhere — this is an advertising/production company, so the
site itself should look and feel like a "showreel."

**Color system** (from the Jaisy logo):
- Background (primary): **black** `#0a0a0a` (near-black, not pure `#000` — use a very
  slightly warm/cool black like `#0a0a0c` for depth) as the dominant surface across the
  entire site.
- Secondary surface: a slightly lifted charcoal `#121214` / `#17171b` for cards and
  sections, to create depth over the pure black background.
- Brand Blue: `#1ab3ff`
- Brand Fuchsia/Pink: `#fe2f94`
- Brand Yellow: `#ffdd07`
- Use the three brand colors as **accent-only** colors — for gradients, glows, underlines,
  icon strokes, hover states, buttons, and section-divider details. Never use them as large
  flat backgrounds that overwhelm the black canvas; the black must stay dominant so the
  colors pop.
- Recommended signature treatment: a diagonal or radial **gradient blend of the three
  colors** (blue → fuchsia → yellow) used sparingly for hero glow, button hover states,
  the preloader ring/spinner, and key CTA accents.
- Text: off-white `#f5f5f7` for headings, `#b8b8c0`/`#9a9aa5` for body copy on dark
  surfaces, ensuring WCAG-friendly contrast throughout.

**Typography (per the business team's own design-reference deck — CONTENT.md §A.10):**
- Headlines: **"Stavok Grotesque"** (Bold weight) — a bold, tight, geometric grotesk. This
  is the actual display font used in the client's approved repositioning/content-plan
  deck, echoing the chunky bold header style seen throughout both source documents
  ("ABOUT JAISY", "Advertising Solutions That Bring Brands to Life", etc.). Check its web
  licensing before embedding; if it isn't freely licensable, substitute a close free
  alternative with the same bold/geometric character — "Space Grotesk", "General Sans", or
  "Archivo Black" at 700–900 weight — rather than blocking the build.
- Body/UI: **"Open Sauce One"** (Regular/Bold) — the body font used in the same deck; it's
  a free, licensed font (available via Fontshare) and should be used directly, self-hosted
  or loaded via `next/font/local`.
- Use big oversized section titles (similar scale to the source decks' giant headers),
  tight letter-spacing, all-caps for section eyebrows/labels.

**Recurring motif:** The portfolio deck uses a thin pink open corner-bracket in the
top-left and bottom-right of every slide. Recreate this as a subtle recurring UI element —
e.g. thin animated corner brackets that appear on hover over cards, or as a fixed decorative
frame element in hero/section corners — to visually tie the site back to the brand deck.

**Logo / icon:** No standalone logo/icon file is provided beyond the portfolio deck. Build
the site so a `Logo` component renders:
  - A wordmark: "**Jaisy**" in a bold rounded/geometric font, in fuchsia (`#fe2f94`), with
    an optional small "360° Brand Execution" script-style sub-tag beneath it on larger
    screens (hide the sub-tag on the compact navbar version).
  - Additionally build a simple abstract monogram icon (a stylized "J" mark, or a
    three-color dot/spark cluster in blue/fuschia/yellow) usable standalone for the
    favicon, preloader, and mobile nav — treat this as a placeholder that the admin can
    later swap out via an "upload logo" field in the admin settings, so don't hardcode it
    in a way that's hard to replace.

---

## 2. Preloader

Build a full-screen preloader shown before the site content is interactive:
- Solid black background, centered Jaisy icon/monogram.
- Animate the icon: e.g. a subtle scale/pulse, a rotating gradient ring around it cycling
  through blue → fuchsia → yellow, or the letters of "JAISY" revealing one by one with a
  colored underline sweeping left→right beneath them.
- Include a slim animated progress indicator (real asset-loading progress if feasible, or a
  timed/simulated progress bar as a fallback), and a percentage or subtle loading label.
- On completion, transition out with a smooth wipe/fade + slight scale, revealing the hero
  underneath (coordinate with the hero's own entrance animation so they feel like one
  continuous motion, not two disconnected animations).
- Must not block indefinitely — cap the max preloader duration (e.g. ~1.2–2.5s) even if
  using simulated progress, and skip/shorten it on repeat visits within the same session
  (store a flag in `sessionStorage`).
- Respect `prefers-reduced-motion`: show a simple fade instead of the full motion sequence.

---

## 3. Site Structure & Sections

Build as a polished **single-page scrolling site** with a sticky/floating anchor navbar
(plus real routes for `/portfolio` detail if you want deep-linkable case studies — optional
enhancement, not required). Populate every section's copy from `CONTENT.md` **Section A**
(authoritative headings/copy/CTAs), supplemented by **Section B** for extended bullet
lists, images, full client list, and contact details, per CONTENT.md §0's priority rule.
Section order:

1. **Navbar** — logo, anchor links (Who We Are, Services, Work, Industries, Clients,
   Contact), a prominent **"Start Your Project"** CTA button (this is the button label the
   business team specified in CONTENT.md §A.8 — reuse it site-wide for the primary
   nav/header CTA, not just the closing section), mobile hamburger menu with a full-screen
   animated overlay menu.
2. **Hero** — exact copy from CONTENT.md §A.2:
   - Headline: "Advertising Solutions That Bring Brands to Life"
   - Subheadline: "From exhibitions and events to signage, activations, and promotional
     solutions, we help brands create visibility through high-quality production and
     execution."
   - Primary CTA: **"View Our Projects"** (→ scrolls to Portfolio/Work)
   - Secondary CTA: **"Contact Us"** (→ scrolls to Contact)
   - Include ambient animated background: soft moving gradient blobs/glow in the three
     brand colors, a faint grid/noise texture, maybe a subtle parallax on scroll. The
     "360° Brand Execution" tagline from the logo lockup can still appear as a small
     eyebrow/label above the headline (it's part of the brand mark), but the H1 itself
     must be the exact headline above — don't replace it with the tagline.
3. **Who We Are** (heading exactly as in CONTENT.md §A.3) — the "Who We Are" copy block,
   presented with a strong pull-quote treatment for the first line, plus a small
   stat/feature strip (e.g. years of experience, industries served count, in-house
   production, etc. — only use numbers if present in CONTENT.md; otherwise use qualitative
   badges like "In-House Production", "End-to-End Execution").
4. **Vision & Mission** (from CONTENT.md §B.3–B.4 — supporting content not restated in the
   repositioning plan, but worth keeping as About-page depth) — two balanced cards/columns,
   icon + heading + copy.
5. **Our Services** (heading + intro exactly as in CONTENT.md §A.4) — 6 cards/tiles in
   this exact order: **Exhibition Booths, Events & Activations, Signage Solutions,
   Promotional Items & Giveaways, Branding & Visual Applications, Production &
   Fabrication.** Each card shows its official one-line description by default (§A.4) and
   expands (on click/hover) to reveal the longer bullet list from the matching §B.6
   sub-section. Include a "View related work" link that filters the portfolio grid below
   to that category. Use a distinct accent color rotation across the 3 brand colors for
   icons/underlines across the 6 cards so the grid feels vibrant, not flat.
6. **Why Brands Choose Jaisy** (heading exactly as in CONTENT.md §A.5) — a **4-point**
   differentiator grid with icons: End-to-End Execution, In-House Production, Custom
   Solutions, Experienced Team (do not add the portfolio's 5th "Reliable Delivery" point
   here — see CONTENT.md §A.5 note).
7. **Portfolio / Our Work** — a filterable image grid/masonry gallery sourced from
   CONTENT.md §B.9, with category filter chips matching the 6 service names from §A.4.
   Each item opens a lightbox/modal with a larger image and its caption. Build this as
   data-driven (array of `{ image, title, category }`) so it can later be swapped for
   admin-managed data with zero markup changes.
8. **Serving Brands Across Industries** (heading exactly as in CONTENT.md §A.6) — chip/tag
   cloud or icon grid of the **10** industries in the exact order given in §A.6 (Retail,
   Food & Beverage, Real Estate, Automotive, Banking, Healthcare, Education, Corporate,
   Hospitality, Events & Exhibitions).
9. **Trusted By Leading Brands** (heading + intro copy exactly as in CONTENT.md §A.7) — an
   infinite auto-scrolling logo marquee (pause on hover) populated from the full client
   list in §B.10. Render logos as clean grayscale wordmark chips that colorize/brighten on
   hover (per the note in §B.10) since individual logo art files aren't provided; make
   this list fully admin-editable later.
10. **CTA Band** — heading **"Let's Build Something Together"** with the supporting copy
    from CONTENT.md §A.8 ("Whether you're planning an event, launching a campaign,
    upgrading your signage, or creating a branded experience, our team is ready to help."),
    full-bleed section with strong gradient/glow background, and a prominent button
    reading **"Start Your Project"** (exact label — not "Let's Build Something Together",
    which is the heading only) linking to the contact form.
11. **Contact** — two-column layout:
    - Left: contact form (see field spec in §5 below), with client-side validation,
      loading/success/error states, and a friendly success message using the portfolio's
      closing line ("Thank you.").
    - Right: phone numbers (tap-to-call on mobile), address (with a "view on map" link/
      embedded map optional) from CONTENT.md §B.12, and a **"Jaisy Platform Links"** block
      — a row/list of icon buttons for social & platform links (Website, Facebook,
      Instagram, LinkedIn, TikTok, WhatsApp, Behance, etc.) that is rendered dynamically
      from data (empty/unset links must not render) so the admin can manage it later.
12. **Footer** — logo, the official tagline from CONTENT.md §A.9 ("Advertising Solutions.
    Production Excellence. Reliable Execution."), anchor nav repeat, contact info,
    platform links repeat (small), copyright line — keep minimal and elegant, not
    cluttered.

---

## 4. Interaction & Animation Requirements

This must feel like an "impressive," awarded-agency-style site, not a template. Required:
- Scroll-triggered reveal animations (fade + slight translate-y, staggered for lists/grids)
  on every major section using an intersection-observer-based approach (e.g. Framer
  Motion's `whileInView`).
- Animated sticky navbar: transparent over hero, condenses to a solid/blurred bar with
  shadow after scrolling past the hero.
- Magnetic/hover-lift micro-interactions on buttons and cards (subtle scale + shadow +
  colored glow border on hover, using the brand gradient).
- Animated underline/highlight sweep on nav links and section eyebrows.
- Marquee/infinite-scroll for the client logos section (CSS animation or a lightweight
  library), pausing on hover, seamlessly looping.
- Portfolio grid: smooth filter transitions (items animate in/out via layout animation,
  e.g. Framer Motion `layout` + `AnimatePresence`) when a category chip is selected.
  Lightbox modal with fade/scale entrance and keyboard (Esc/arrow) navigation.
  Ensure images are lazy-loaded and optimized (use Next.js `<Image>` if using Next.js).
- Number/stat count-up animations where relevant.
- Respect `prefers-reduced-motion: reduce` globally — provide a reduced-motion fallback
  (simple fades, no parallax/blobs) for every animation described above.
- Keep animations tasteful and performant — no jank, no motion so busy it hurts
  readability; everything should reinforce a premium feel, not a gimmicky one.

---

## 5. "Start Your Project" Inquiry Form — Field Spec

Build a single reusable contact/inquiry form component used in the Contact section (and
optionally as a modal triggered from any **"Start Your Project"** CTA button site-wide —
this is the official button label per CONTENT.md §A.8, so use it consistently instead of
generic labels like "Get Help"). Fields:
- Full Name (required)
- Company Name (optional)
- Email (required, validated)
- Phone Number (required, basic format validation; Egypt-friendly but don't hard-restrict
  to only Egyptian numbers)
- Service Interested In (select/dropdown — options = the 6 official service names from
  CONTENT.md §A.4: Exhibition Booths, Events & Activations, Signage Solutions, Promotional
  Items & Giveaways, Branding & Visual Applications, Production & Fabrication — plus an
  "Other" option)
- Project Details / Message (required, textarea)
- Preferred Contact Method (radio/select: Phone, Email, WhatsApp) — optional field, nice
  to have
- Consent/honeypot spam-protection field (invisible honeypot input, not a visible
  checkbox) plus basic rate limiting on the API route.

On submit: validate client-side, POST to an API route, show inline success/error state,
and (once backend exists) persist the submission so the admin can view/manage it (see §7).

---

## 6. Technology Stack (Phase 1 — Frontend)

Use the stack best suited for a modern, animation-rich, SEO-relevant marketing site that
will later gain a full CMS backend — recommended:

- **Framework:** Next.js 14+ (App Router), TypeScript throughout.
- **Styling:** Tailwind CSS, with a small custom design-token config (colors, fonts,
  radii, shadows) matching §1 above. Use `tailwind.config.ts` `extend.colors` for
  `jaisy.blue`, `jaisy.pink`, `jaisy.yellow`, `jaisy.black`, etc.
- **Animation:** Framer Motion for scroll reveals, page/preloader transitions, and
  layout animations; a lightweight CSS/JS marquee for the clients section.
- **UI primitives:** shadcn/ui (Radix-based) for accessible building blocks (dialog/
  modal for the lightbox, form controls, dropdown/select, toast for form feedback) styled
  to match the dark brand theme.
- **Icons:** lucide-react.
- **Images:** Next.js `<Image>` component; store portfolio assets under
  `/public/images/portfolio/...` following the filenames suggested in CONTENT.md §B.9.
- **Fonts:** self-hosted or `next/font` for the chosen headline/body typefaces (avoid
  render-blocking external font requests).
- **Forms/validation:** React Hook Form + Zod.
- **SEO:** proper `<title>`/meta tags, Open Graph image, semantic HTML, sitemap.xml,
  robots.txt.
- **Deployment target:** should build cleanly for Vercel (or any Node host) with
  `next build`.

Deliver Phase 1 as a fully working, responsive (mobile/tablet/desktop), lint-clean,
accessible (proper alt text, focus states, color contrast) site with all content wired
from a local, typed content/data layer (e.g. `/lib/content.ts` or per-section JSON/TS
files mirroring CONTENT.md) — structure this data layer so Phase 2 can swap it for
database-backed fetching with minimal refactor (i.e., components should consume data via
props/hooks, not import hardcoded literals directly inside JSX).

---

## 7. Technology Stack & Requirements (Phase 2 — Backend + Admin Panel)

Only start this phase after Phase 1 is fully complete and polished. Goal: a small, clean
admin panel so Jaisy staff (non-technical) can update the entire site's content without
touching code.

**Recommended stack:**
- **Database:** PostgreSQL (e.g. via Neon/Supabase/Railway) accessed with **Prisma ORM**.
  (SQLite is acceptable only for local dev/demo; design the Prisma schema to be
  Postgres-ready for production.)
- **Auth:** NextAuth.js (Credentials provider) or Lucia/Auth.js — simple email+password
  login restricted to admin users only (no public signup). Protect all `/admin/*` routes
  and API mutation routes with session/middleware checks.
- **API layer:** Next.js Route Handlers (`/app/api/...`) or Server Actions for all CRUD
  operations; validate every input with Zod on the server too (never trust client
  validation alone).
- **Image uploads:** integrate a storage provider (e.g. Vercel Blob, Cloudinary, or
  Supabase Storage) for admin-uploaded portfolio images, client logos, and the
  logo/favicon asset; store just the resulting URL in the DB.
- **Email notifications (optional but recommended):** send the admin an email (e.g. via
  Resend) whenever a new inquiry-form submission arrives, in addition to storing it in
  the DB.

**Data model (Prisma schema) — at minimum, model these entities:**
- `SiteSettings` — singleton row: logo URL, favicon URL, site tagline, phone numbers,
  address, SEO meta defaults.
- `AboutContent` / `VisionMissionContent` — editable rich-text/plain-text blocks for the
  About, Vision, Mission, and "What We Do" copy.
- `Service` — `title`, `slug`, `intro`, `bullets` (string array or related `ServiceBullet`
  rows), `iconKey`, `accentColor`, `order`.
- `WhyJaisyPoint` — `title`, `description`, `iconKey`, `order`.
- `PortfolioItem` — `title`, `imageUrl`, `category` (relation to `Service` or its own enum
  matching the 6 categories), `order`, `published` boolean.
- `Industry` — `name`, `order`.
- `Client` — `name`, `logoUrl` (nullable — fallback to text chip if empty), `order`.
- `PlatformLink` — `platform` (enum: website, facebook, instagram, linkedin, tiktok,
  whatsapp, behance, other), `url`, `visible` boolean, `order`.
- `InquirySubmission` — all fields from §5, `status` (New/In Progress/Closed), `createdAt`,
  internal `notes` field editable by admin.
- `AdminUser` — `email`, `hashedPassword`, `name`, `role`.

**Admin panel screens (under `/admin`, gated by login):**
1. **Dashboard** — quick stats (new inquiries count, total portfolio items, total
   clients) and a recent-submissions preview.
2. **Content Editor** — forms to edit About/Vision/Mission/What-We-Do copy, and
   SiteSettings (logo/favicon upload, tagline, phone numbers, address, SEO defaults).
3. **Services Manager** — CRUD list/reorder for the 6 (or more, if they add one later)
   services, including their bullet lists and icon/color pickers.
4. **Why Jaisy Manager** — CRUD/reorder for the differentiator points.
5. **Portfolio Manager** — CRUD for portfolio items: upload image, set title/category/
   order/published toggle; supports drag-to-reorder.
6. **Industries Manager** — simple CRUD/reorder list.
7. **Clients Manager** — CRUD/reorder for client names + optional logo upload.
8. **Platform Links Manager** — CRUD for social/platform links with a visibility toggle
   per link (so an empty/unused platform simply doesn't render on the live site).
9. **Inquiries Inbox** — table/list of form submissions with search/filter by status and
   service, a detail view per submission, status update, and internal notes.
10. **Admin Users** (optional, nice-to-have) — manage which admin accounts can log in.

Every admin CRUD screen should:
- Use optimistic UI or clear loading/success/error states.
- Validate on both client (Zod + React Hook Form) and server.
- Support reordering (drag handles or simple up/down controls) wherever an `order` field
  exists, since the frontend renders lists in that order.
- Be fully responsive enough to use on a tablet, even if optimized primarily for desktop.

Once the backend exists, refactor the Phase 1 frontend's data layer to fetch from the
database (server components/route handlers) instead of the static content files, keeping
the exact same visual design and animations — the public site's look must not regress when
the CMS is wired in.

---

## 8. Architecture & Design Patterns

Follow these explicit architectural conventions for both phases — this is what keeps the
codebase maintainable once the CMS is wired in, not just "make it work."

### 8.1 Frontend architecture (Next.js App Router)

- **Feature-based folder structure**, not one giant `components/` dump:
  ```
  /app
    /(site)/page.tsx            → composes section components only, no business logic
    /admin/...                  → Phase 2 admin routes (route-grouped, separate layout)
    /api/...                    → route handlers (Phase 2)
  /components
    /sections/hero, /sections/about, /sections/services, ...  → one folder per section
    /ui/                        → shadcn/ui primitives + shared atoms (button, badge, etc.)
    /layout/                    → navbar, footer, preloader, page-shell
  /lib
    /content/                   → Phase 1 typed static content modules (mirrors CONTENT.md)
    /data/                      → Phase 2 data-access functions (see 8.2) — same function
                                   signatures as /content so swapping is a one-line change
    /validation/                → shared Zod schemas (form + API, reused both sides)
    /utils/                     → formatting, animation variants, constants
  /hooks/                       → custom hooks (useInView reveal, useLightbox, useMarquee)
  ```
- **Server Components by default**; opt into Client Components (`"use client"`) only for
  interactive leaves (form, filter chips, lightbox, mobile menu, marquee, animated
  counters). Keep section components as Server Components that fetch/receive data and
  delegate interactivity to small client "islands" — don't make an entire section
  `"use client"` just because one button inside it needs state.
- **Presentational vs. data-bound separation**: every section component receives its
  content as typed props (e.g. `<ServicesSection services={services} />`), and never
  imports CONTENT.md/DB calls directly inside JSX. The page (`app/(site)/page.tsx`) is the
  only place that calls the data layer and passes props down. This is what makes the
  Phase 1 → Phase 2 swap (static import → DB query) a change in one file, not a rewrite.
- **Data-access indirection**: define one function per content type up front (e.g.
  `getServices()`, `getPortfolioItems(category?)`, `getClients()`, `getSiteSettings()`) in
  `/lib/data`. In Phase 1 these read from `/lib/content`; in Phase 2 the *same* function
  signatures read from Prisma instead. Components/pages only ever call `/lib/data`
  functions, never the underlying source directly.
- **Custom hooks** for reusable interaction logic (`useScrollReveal`, `useMarquee`,
  `usePortfolioFilter`, `useLightbox`) instead of duplicating animation/state logic per
  component.
- **Design tokens over inline magic values**: colors, spacing, radii, and animation
  durations/easings live in `tailwind.config.ts` and a small `/lib/motion.ts` (shared
  Framer Motion variants), not hardcoded per component.
- **Error/empty states as first-class**: every data-driven section (portfolio, clients,
  platform links) must render sensibly with zero items (important once the DB starts
  empty in Phase 2) — design placeholder/empty states now, don't bolt them on later.

### 8.2 Backend architecture (Phase 2)

Use a **layered architecture** so route handlers stay thin and logic is testable/reusable:

```
Route Handler (app/api/.../route.ts)
   → parses request, calls one Service function, shapes the HTTP response
Service layer (/lib/services/*.ts)
   → business logic: authorization checks, orchestration, calls Repository
Repository / data-access layer (/lib/repositories/*.ts, thin wrapper over Prisma)
   → the only place `prisma.*` calls happen
Zod schemas (/lib/validation/*.ts)
   → shared input/output validation, reused by both API routes and client forms
```

- **Never call `prisma` directly from a route handler or a React Server Component** —
  always go through a repository function (e.g. `getPublishedPortfolioItems()`,
  `createInquiry(input)`, `updateService(id, input)`). This keeps DB access swappable and
  centrally testable, and stops query logic from leaking into UI/route code.
- **Consistent API response envelope**: `{ success: boolean, data?: T, error?: { message,
  code } }` for every route handler, so the frontend has one predictable shape to handle.
- **Validate at the boundary, twice**: Zod on the client (React Hook Form) for instant UX
  feedback, and the *same* Zod schema again inside the Service layer on the server —
  never trust client validation alone.
- **AuthN/AuthZ as middleware, not per-route checks copy-pasted everywhere**: a single
  `withAdminAuth()` wrapper/middleware around all `/api/admin/*` and `/admin/*` routes
  that verifies the session and short-circuits with a 401/redirect otherwise.
- **Separate public vs. admin API surfaces**: `/api/public/*` (read-only, used by the live
  site — e.g. submitting an inquiry) vs `/api/admin/*` (full CRUD, auth-gated). Don't mix
  public and privileged mutations on the same route.
- **Rate limiting & spam protection** on the public inquiry-submission route specifically
  (honeypot field + simple IP/time-window rate limit) since it's the one endpoint exposed
  to anonymous traffic.
- **Ordering/reordering as an explicit concern**: entities with an `order` field expose a
  dedicated `reorder(ids: string[])` repository/service function (bulk update) rather than
  N individual update calls from the admin UI.
- **Centralized error handling**: a small `handleApiError()` helper used in every route's
  catch block so error shape/logging is consistent, instead of ad-hoc try/catch bodies
  per route.
- **Environment/config isolation**: all secrets (DB URL, auth secret, storage keys, email
  API key) read only via a validated `/lib/env.ts` (Zod-parsed `process.env`) — never
  `process.env.X` scattered through the codebase — so misconfiguration fails fast and
  loudly at boot instead of silently at runtime.

Following 8.1/8.2 is what allows the Phase 1 → Phase 2 transition described at the end of
§7 to happen as a targeted swap of the data layer, with no changes to section components,
animations, or visual design.

---

## 9. Quality, Testing & Operational Practices

Round out the engineering rigor with these practical, professional-grade practices so the
project isn't just well-architected on paper but verifiably solid in operation.

### 9.1 Testing strategy
- **Unit tests** (Vitest or Jest) for the Service and Repository layers (§8.2) and for any
  non-trivial utility/formatting logic — these are pure functions and cheap to test.
- **Component tests** (React Testing Library) for the components with real logic: the
  inquiry form (validation states, honeypot, submit success/error), the portfolio filter
  (`usePortfolioFilter`), and the lightbox keyboard navigation.
- **E2E smoke tests** (Playwright) covering the critical user paths: (1) homepage loads,
  preloader completes, hero renders; (2) submitting the inquiry form succeeds and shows
  the success state; (3) admin login → create/edit/delete a portfolio item → change is
  reflected on the public site. Wire this into CI so a broken deploy is caught before it
  ships.
- Tests are not optional polish — at minimum the three E2E flows above and unit tests for
  the Repository layer must exist before Phase 2 is considered "done" per the checklist in
  §11.

### 9.2 CI/CD
- Set up a GitHub Actions workflow (or equivalent) that runs on every PR/push: install →
  lint → typecheck → unit/component tests → `next build`. Block merges on failure.
- Add a separate, lightweight job to run the Playwright E2E suite against a preview
  deployment (e.g. Vercel preview URL) once Phase 2 is live.
- Provide a `.env.example` listing every required environment variable (DB URL, auth
  secret, storage provider keys, email API key) with placeholder values and short
  comments — never commit real secrets.

### 9.3 Security hardening
- Hash admin passwords with bcrypt or argon2 (never plaintext, never reversible
  encryption); enforce a minimum password length when creating admin users.
- Set standard security headers via `next.config.js`/middleware: `Content-Security-Policy`
  (scoped to allow the chosen font/analytics/storage domains), `X-Frame-Options: DENY`,
  `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`.
- Rely on NextAuth's built-in CSRF protection for admin session actions; don't hand-roll
  session/cookie handling.
- Sanitize/validate all rich-text or free-text fields (About copy, inquiry messages)
  before rendering to prevent stored XSS — if any field allows HTML, sanitize server-side
  before persisting, not just before display.
- Keep dependencies current; add a `npm audit`/`pnpm audit` (or Dependabot) check to CI.

### 9.4 Observability & maintainability
- Basic structured logging (e.g. `pino` or even structured `console.*` with request IDs)
  in the Service layer, especially around inquiry submission, admin auth, and any
  external calls (storage upload, email send).
- Wire a lightweight error-tracking integration (e.g. Sentry) for both the public site and
  the admin panel, so failed inquiry submissions or admin CRUD errors surface immediately
  rather than silently.
- A simple `/api/health` route (DB connectivity check) useful for uptime monitoring.

### 9.5 Content freshness without redeploys
- Once Phase 2 is wired in, use Next.js ISR/on-demand revalidation (`revalidatePath` /
  `revalidateTag`) so that saving content in the admin panel invalidates only the
  relevant public page/section cache — admins should see their edits live within seconds,
  without needing a full redeploy.

### 9.6 Git & repo hygiene
- Conventional commits (or an equivalent clear convention), feature branches, and a short
  `README.md` documenting local setup, environment variables, `npm run dev`/`build`/
  `test` scripts, and how to run Prisma migrations/seed data.
- Provide a Prisma `seed.ts` that populates the database with the exact content from
  CONTENT.md, so a fresh clone is immediately demo-able instead of starting empty.

---

## 10. Non-Functional Requirements

- **Responsive:** flawless across mobile (360px+), tablet, and desktop breakpoints; test
  the marquee, nav overlay, and portfolio grid specifically at small widths.
- **Performance:** optimize images (proper `sizes`/`priority` usage), avoid layout shift,
  aim for good Core Web Vitals; lazy-load below-the-fold media and heavy animation
  libraries where sensible.
- **Accessibility:** semantic landmarks, keyboard-navigable nav/menu/lightbox/form,
  visible focus states, sufficient color contrast for text over the black background,
  meaningful alt text for all images (derive from CONTENT.md captions), reduced-motion
  support as noted in §4.
- **SEO:** descriptive title/meta description per CONTENT.md content, Open Graph/Twitter
  card tags, semantic heading hierarchy (one `h1` in the hero, `h2` per major section),
  sitemap.xml and robots.txt once routes exist.
- **Code quality:** TypeScript strict mode, ESLint + Prettier configured and passing,
  sensible component decomposition (no giant monolithic page files), clear folder
  structure (`/app`, `/components`, `/lib`, `/prisma` once Phase 2 starts).
- **No placeholder "lorem ipsum" anywhere** — every string must come from CONTENT.md (or,
  for genuinely unavailable data like exact client logo art or live social URLs, from a
  clearly-marked, easily-editable placeholder that the admin can replace, per the notes in
  CONTENT.md).

---

## 11. Deliverable Checklist

Phase 1 is "done" when:
- [ ] Preloader implemented and polished per §2.
- [ ] All sections in §3 are implemented, fully responsive, and populated from
      CONTENT.md.
- [ ] All animation/interaction requirements in §4 are implemented with reduced-motion
      support.
- [ ] The inquiry form in §5 works end-to-end against a local API route (can still be a
      stub that just logs/echoes until Phase 2 wires persistence).
- [ ] Lighthouse/basic performance and accessibility checks pass reasonably well.
- [ ] The project builds cleanly (`next build`) with no type or lint errors.

Phase 2 is "done" when:
- [ ] Prisma schema from §7 is implemented and migrated.
- [ ] Admin auth works and all `/admin` routes/APIs are protected.
- [ ] All 10 admin screens in §7 are implemented and functional (create/edit/delete/
      reorder as applicable).
- [ ] The public frontend now reads all editable content from the database instead of
      static files, with zero visual regression from Phase 1.
- [ ] The inquiry form persists submissions to `InquirySubmission` and they appear in the
      Inquiries Inbox (email notification is a nice-to-have, not blocking).

Proceed autonomously through both phases using the content and specification above;
only ask a clarifying question if something in this prompt or in CONTENT.md is genuinely
ambiguous or contradictory — otherwise make the best professional judgment call and keep
building.
