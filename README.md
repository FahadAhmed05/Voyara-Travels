# Voyara Travels

Voyara is a premium travel-agency website for four services — **Visa Services, Flight Ticket Booking, Hotel Booking and Car Rental**. It is a front-end-only build: there is no backend, and every search runs against typed mock data through pure, unit-tested filter functions.

**The idea:** the page follows the StoryBrand spine — the _traveller_ is the hero and Voyara is the guide: The Dream → The Hassle → The Guide → The Plan → Proof → The Departure. Section eyebrows are chapter markers ("Chapter 03 — The Guide"), and motion marks each chapter turn instead of decorating at random.

- **Live demo:** _add the Vercel URL here after the first deploy_
- **Repository:** https://github.com/FahadAhmed05/Voyara-Travels

## Features at a glance

Mapped 1:1 to the brief's mandatory requirements.

| Requirement                       | Where it lives                                                                                                                                                              | Status |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| Responsive (mobile → desktop)     | Mobile-first Tailwind layouts, checked at 360 / 768 / 1440 px with no horizontal scroll; hero + booking card overlap holds on mobile; the pinned Plan scene is desktop-only | ✅     |
| Functional search forms           | One tabbed card (Flights · Hotels · Cars · Visa), per-tab fields, 600 ms loading state, results grid, validation, empty state, "add to trip plan" confirmation with toast   | ✅     |
| Service cards                     | `Services` — four cards with benefit copy, bullets, "from PKR …" prices computed from the data, and an Explore action that opens the matching booking tab                   | ✅     |
| Popular destinations              | `Destinations` — editorial asymmetric grid; a card opens the Hotels tab with that destination pre-selected                                                                  | ✅     |
| Testimonials                      | `Testimonials` — one featured story plus two cards, specific rather than generic quotes                                                                                     | ✅     |
| Contact + footer                  | `ContactSection` (validated form, success panel thanks you by first name), `Footer` (links, socials, newsletter with its own success state)                                 | ✅     |
| GSAP: scroll reveals              | Every `[data-reveal]` lifts in once, batched with a stagger                                                                                                                 | ✅     |
| GSAP: hero animation              | `SplitText` masked line reveal inside one timeline (bg settle → eyebrow → headline → sub → card → cue) plus background parallax                                             | ✅     |
| GSAP: counters                    | Stats count up once with en-PK grouping (12,000+, 4.9)                                                                                                                      | ✅     |
| GSAP: hover effects               | Card lift and image zoom (CSS transform/opacity), stepper and tab micro-interactions                                                                                        | ✅     |
| Reusable components, clean layout | `ui/` primitives, `booking/` widget parts, `sections/` page chapters, data and logic kept out of components (see structure below)                                           | ✅     |
| Extras                            | Pinned "Plan" scene (desktop), smooth scrolling via Lenis, full reduced-motion support, skip link, generated Open Graph image                                               | ✅     |

## Tech stack

| Tool                                       | Version | Why                                                                                                                                                                                     |
| ------------------------------------------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Next.js (App Router, Turbopack)            | 16.4    | A fully static page with `next/image`, `next/font` and metadata handled for us; deploys to Vercel with no configuration                                                                 |
| React                                      | 19.3    | Current stable; the booking state lives in plain hooks, no state library needed                                                                                                         |
| TypeScript (strict)                        | 5.9     | Domain and query types are defined once in `src/types` and shared by data, logic and UI; no `any`                                                                                       |
| Tailwind CSS                               | 4.3     | CSS-first: design tokens (`ink`, `teal`, `sand`, `gold`, …) are declared in `@theme` inside `globals.css`. There is no `tailwind.config.js`                                             |
| GSAP + `@gsap/react`                       | 3.15    | `ScrollTrigger` and `SplitText` ship in the free package. Plugins are registered once in `src/lib/gsap.ts`; every animation runs inside `useGSAP` with a scope, so cleanup is automatic |
| Lenis                                      | 1.3     | Smooth scrolling that shares GSAP's ticker (see below) so scroll position and triggers never drift                                                                                      |
| lucide-react                               | 1.66    | Consistent icon set; brand logos are small inline SVGs because lucide no longer ships them                                                                                              |
| Vitest                                     | 5.0     | The search, booking and contact logic are pure functions, so they are tested without a DOM                                                                                              |
| ESLint, Prettier (+ Tailwind class plugin) | 9 / 3.9 | One enforced style; classes sorted automatically                                                                                                                                        |

**Why Lenis + GSAP on one ticker.** Lenis runs with `autoRaf: false` and is driven from `gsap.ticker` (`lenis.raf(time * 1000)`), with `ScrollTrigger.update` on Lenis's scroll event and `lagSmoothing(0)`. Two competing `requestAnimationFrame` loops are the usual cause of jittery pins and triggers that fire a frame late; one loop removes the problem. The wiring lives in `components/layout/SmoothScroll.tsx`.

**Why SplitText masked reveals.** A headline reads in lines, so the lines are the unit of motion. `SplitText` with `mask: "lines"` gives the premium "rise from behind a ruler" effect using transforms only, keeps the heading accessible through its built-in `aria-label`, and re-splits cleanly on resize with `autoSplit`. The split waits for `document.fonts.ready`, otherwise lines break against the fallback font.

**Why pure functions + unit tests.** Filtering is `filterFlights(flights, query)` → new array, no React, no mutation. Empty, blank and "Any" criteria mean "no filter". That keeps the rules in one place and testable in milliseconds.

## Project structure

```
src/
  app/                layout (fonts, metadata, providers), thin page composition, global styles + tokens, icon, OG image
  components/
    ui/               design-system primitives: Button, Container, SectionHeading, EmptyState, Toast, RatingStars, PriceTag, TextField
    layout/           Navbar, MobileMenu, Footer, NewsletterForm, SmoothScroll (Lenis ↔ GSAP), ScrollRefresh
    motion/           RevealScope — scroll-reveal scope for server-rendered sections
    sections/         one component per story chapter (Hero, HassleStrip, Services, Destinations, ThePlan, Stats, …)
    booking/          the search widget: tabs, per-tab fields, steppers, results grid and cards, empty state
  data/               typed mock data — the only place content lives (flights, hotels, cars, visas, destinations, …)
  hooks/              state and behaviour: useBookingSearch, useScrollReveal, useHeroIntro, useScrollTo, …
  lib/                pure logic: search filters, booking validation, formatting, GSAP registration, cn()
  types/              shared domain, query and form types — defined once
PLAN.md               the plan, milestones and decisions this build followed
```

## Getting started

**Prerequisites:** Node.js 20.9 or newer and npm.

```bash
npm install
npm run dev      # http://localhost:3000
```

| Script              | Purpose                               |
| ------------------- | ------------------------------------- |
| `npm run dev`       | Development server                    |
| `npm run build`     | Production build (the page is static) |
| `npm start`         | Serve the production build            |
| `npm run lint`      | ESLint                                |
| `npm run typecheck` | TypeScript, no emit                   |
| `npm test`          | Vitest unit tests (33 tests)          |
| `npm run format`    | Prettier                              |

## Architecture and decisions

### Data flow

```
src/data  →  src/lib (pure filters + validation)  →  src/hooks (state)  →  components
```

Components never hold content or filtering rules. `useBookingSearch` owns the active tab, one form object per tab (so values persist when you switch away and back), the loading status and the results. `lib/booking.ts` validates and runs the search through `lib/search.ts`; the UI only renders what comes back. Swapping in a real API later means replacing the functions in `lib/` — the components do not change.

Default dates (today + 7 / + 14) are computed on the client. The page is statically rendered, so doing this at build time would bake the build date into every visitor's form; `useToday` returns an empty string on the server and the booking widget is keyed on it, so the defaults appear on hydration without a mismatch or an effect.

Sections talk to the booking card through a small typed window event (`lib/booking-intent.ts`): a service or destination card requests a tab, the widget switches, and Lenis scrolls to it.

### Animation architecture

- **Scoped by construction.** Every animation sits in `useGSAP(..., { scope })` inside its own component or hook. There are no page-global selectors and no raw `useEffect` GSAP, so React StrictMode cannot double-fire anything (checked in dev: one split, one pin spacer).
- **`gsap.matchMedia()` owns responsiveness and reduced motion.** Intro and reveals run only under `prefers-reduced-motion: no-preference`; the pinned Plan scene only at ≥ 1024 px; parallax from 768 px. matchMedia cleans up after itself on resize — there are no hand-written resize handlers.
- **Only `transform` and `opacity`.** Masked reveals use `overflow` wrappers; nothing animates width, height or position.
- **Content works without the animation.** Initial hidden states are set with `gsap.set` _inside_ `useGSAP`, never in CSS. With JavaScript off, or with reduced motion on, every section is fully visible and Lenis is not mounted.
- **Refresh discipline.** `ScrollRefresh` calls `ScrollTrigger.refresh()` after the window `load` event and after `document.fonts.ready`.

### Storytelling structure

| Chapter | Section                           | Purpose                                                                 |
| ------- | --------------------------------- | ----------------------------------------------------------------------- |
| 1       | Hero + booking card, Destinations | The longing — beauty first, and the plan starts immediately             |
| 2       | Hassle strip + marquee            | One honest line about planning pain                                     |
| 3       | Services                          | "We handle it" — four ways the hassle goes away                         |
| 4       | The Plan                          | Three steps; a pinned, scrubbed scene on desktop, plain steps elsewhere |
| 5       | Stats + traveller stories         | Proof, placed right where doubt appears                                 |
| 6       | CTA + Contact                     | "Your story starts here."                                               |

## Quality

Measured on the production build:

| Check                        | Result                                                                                                                |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `npm run lint` / `typecheck` | 0 errors, 0 warnings                                                                                                  |
| `npm test`                   | 33 / 33 passing                                                                                                       |
| Lighthouse (desktop)         | Performance 99 · Accessibility 100 · Best practices 100 · SEO 100                                                     |
| Lighthouse (mobile)          | Performance 79 · Accessibility 100 · Best practices 100 · SEO 100 (simulated slow 4G + 4× CPU slowdown, local server) |
| Core Web Vitals              | Desktop: LCP 0.8 s, TBT 90 ms, CLS 0. Mobile (throttled): LCP 4.2 s, TBT 310 ms, CLS 0                                |
| First-load JavaScript        | 260.6 kB gzip across 9 files (Next runtime, React, GSAP core + ScrollTrigger + SplitText, Lenis)                      |

Why mobile performance is 79: the hero headline is revealed by the SplitText intro, so on a throttled phone the largest text paints once JavaScript has run. That is the cost of the signature animation, and it is a conscious trade — see below.

Edge cases verified in a real browser: all four tabs with default values, impossible routes (Skardu → London) with reset, same-city / return-before-depart / check-out-before-check-in / drop-off-before-pickup / past and cleared dates, steppers hammered at their limits, searching twice in one tick, tab switching while loading, contact form with apostrophes, Urdu names and a ~9,000-character message, newsletter states, mobile menu → navigate → Lenis resumes, resizing 1440 → 360 mid-scroll, keyboard-only walk, and reduced-motion emulation.

## Trade-offs (24-hour build) and what comes next

**Trade-offs made**

- **Mock data only.** Search results come from 35 typed flight, hotel, car and visa records, so routes and dates are not real inventory. Dates are validated but not matched against availability.
- **Intro vs. mobile LCP.** The hero animation is the signature moment, but it delays the first meaningful paint on slow phones. With more time I would server-render the hero lines unsplit and only enhance them, or shorten the intro on small screens.
- **Initial flash before hydration.** Hidden start states are set by GSAP, per the "content must work without JS" rule, so there is a brief moment when un-hidden content is visible before the intro starts. A tiny inline script adding a class to `<html>` would remove it at the cost of one more moving part.
- **Photos are third-party.** Images come from Unsplash (each photo was checked against its alt text), with gradient fallbacks behind every frame. A production site would host its own licensed photography. The Hunza card uses a generic alpine photo.
- **Forms do not send anything.** The contact and newsletter forms validate and show success states; there is nowhere to deliver them.
- **No i18n and PKR only.** Copy is English; the voice and the Urdu-name handling are tested, but the interface is not translated.

**Next**

1. Real flight, hotel and car APIs behind the existing `lib/` functions, with availability and live prices.
2. A booking flow after "add to trip plan": traveller details, payment and a confirmation page.
3. Server-side form handling (email/CRM) for the contact form and newsletter.
4. Urdu (RTL) localisation and multi-currency pricing.
5. Visual-regression and end-to-end tests (Playwright) on top of the existing unit tests, and self-hosted imagery.

## Deployment

The project is a standard Next.js app; `vercel.json` pins the framework preset. Import the repository in Vercel and deploy — no environment variables are required. The metadata base URL is read from Vercel's `VERCEL_PROJECT_PRODUCTION_URL`.
