# CHS Tours – Version 2

Premium travel website for CHS Tours, built with **React 19 + Vite 8 + TypeScript + React Router 8 (framework mode)**.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Start the local site at http://localhost:5173 (auto-reloads as you edit) |
| `npm run build` | Type-check, then build the final site into `build/client/` |
| `npm run preview` | Preview the built site locally |
| `npm run typecheck` | Check TypeScript types only |
| `npm run lint` | Check code for common mistakes (oxlint) |

## How the project is organised

```
app/
  root.tsx           HTML shell shared by every page (fonts, global CSS, <head> tags)
  routes.ts          THE SITEMAP: every URL and the page file it uses
  routes/            one file per page
  components/        reusable UI (ui/, layout/, cards/, sections/, package/, forms/, motion/)
  content/           ALL business content (later replaced by Sanity CMS)
  lib/               helpers: seo.ts (page titles/meta), later content.ts, whatsapp.ts
  types/             TypeScript shapes for content (Package, Destination, …)
  styles/            tokens.css (colours/type/spacing) + global.css
react-router.config.ts   ssr: false + prerender → every page is built as real HTML for SEO
```

### Key ideas
- **Pre-rendering:** `npm run build` creates a real HTML file for each page, so Google and WhatsApp link previews see full content.
- **Design tokens:** always use CSS variables from `app/styles/tokens.css` (e.g. `var(--color-accent)`), never raw colours.
- **CSS Modules:** each component has its own `Name.module.css`, so styles never clash.
- **Content is separate from UI:** business details live in `app/content/`. Placeholders are clearly marked `PLACEHOLDER`.
- **Page titles/SEO:** each page exports `meta` using `buildMeta()` from `app/lib/seo.ts`.

## Status
Phase 1 (setup and architecture) is complete. See the full plan for Phases 2–10.
