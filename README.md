# Lisa Wood Studio

Visual-first artist portfolio for Lisa Wood Studio — a dual-navigation
homepage and routed project pages. Built to the Lisa Wood Studio Master
Build Prompt (2026-05-17).

## Stack

Next.js (App Router) · TypeScript · React · Tailwind CSS · GSAP ScrollTrigger ·
Vercel. Server-rendered for SEO and AI discoverability.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Structure

- `content/` — the data schema (build step 1). `projects.ts`, `practices.ts`,
  `navigation.ts`, `types.ts`. Everything hangs off these. Rows marked
  `status: "placeholder"` are `TODO(Lisa)` scaffolds — swapping in final
  content is a data change only.
- `app/` — App Router. Homepage (`page.tsx`), project routes
  (`work/[slug]/page.tsx`), `sitemap.ts`, `robots.ts`, `llms.txt`.
- `components/` — dual navigation (`SiteHeader`, `BentoSystem`), editorial
  sections, carousel, project page parts, GSAP `Reveal`.
- `lib/` — site constants and JSON-LD builders.
- `public/assets/` — image assets (optimized `.webp`).
- `public/observatory.html` — the original Observatory Sun Valley presentation,
  preserved and still served at `/observatory.html`.

## Navigation

Two intentionally different cuts of the work (do not reconcile them):

1. **Bento** (Path One) — experiential: Conceptual · Writing · Photographs ·
   Installation · Apps.
2. **Editorial top-right nav** (Path Two) — Photographs · Writing · Surface
   Surveys · Luxuriate in Discomfort · Installation — scrolls to anchored
   homepage sections.

## Notes

- The frosted/vellum bento skin is out of scope; bentos render as plain
  placeholder rectangles behind a swappable `data-skin` seam.
- `TODO(Lisa)` markers flag pending content: the 6th Photographs series title,
  full child lists and copy, the "A Veiled Sanctuary" essay link, and whether
  FIELD IMAGES carousels are public.
