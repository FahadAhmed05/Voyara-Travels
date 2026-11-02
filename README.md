# Voyara Travels

Voyara is a premium travel-agency website offering four services — **Visa Services, Flight Ticket Booking, Hotel Booking and Car Rental**. It is a front-end-only project: there is no backend, and all search and booking flows run against typed mock data.

**Story spine:** The Dream → The Hassle → The Guide → The Plan → Proof → The Departure. The traveller is the hero; Voyara is the guide. See [PLAN.md](PLAN.md) for the full plan and milestones.

## Tech stack

- Next.js 16.4 (App Router, Turbopack) and React 19.3
- TypeScript 5 (strict)
- Tailwind CSS 4.3 (CSS-first `@theme` tokens in `src/app/globals.css`)
- GSAP 3.15 with `@gsap/react` (ScrollTrigger, SplitText)
- Lenis 1.3 smooth scrolling, driven by the GSAP ticker
- lucide-react icons, Vitest for unit tests

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script              | Purpose                    |
| ------------------- | -------------------------- |
| `npm run dev`       | Start the dev server       |
| `npm run build`     | Production build           |
| `npm run lint`      | ESLint                     |
| `npm run typecheck` | TypeScript, no emit        |
| `npm run format`    | Format with Prettier       |
| `npm test`          | Run unit tests with Vitest |

## Project structure

```
src/
  app/          layout, page, global styles and design tokens
  components/   ui · layout · sections · booking
  data/         typed mock data (the only place data lives)
  hooks/        custom hooks
  lib/          gsap setup, utilities, formatting
  types/        shared types
```

## Status

**Phase 1 of 6 complete** — plan, scaffold, design tokens, layout shell, smooth-scroll provider and UI primitives.
