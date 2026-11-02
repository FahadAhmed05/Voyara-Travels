# Voyara Travels — Implementation Plan

## Goal

Build **Voyara Travels**, a premium travel-agency website offering four services — **Visa Services, Flight Ticket Booking, Hotel Booking and Car Rental**. There is no backend and no real API: all data is typed mock data. Deliverables: a GitHub repository with a readable history, a live Vercel deployment and a professional README.

### Mandatory checklist (from the brief)

- [ ] Fully responsive (mobile → desktop)
- [ ] Functional search forms (flights, hotels, cars, visas) driven by mock data
- [ ] Service cards and popular destinations
- [ ] Testimonials, contact section and footer
- [ ] GSAP animations: scroll reveals, hero animation, animated counters, hover effects
- [ ] Reusable components and a clean project structure

## Brand story spine (StoryBrand)

The **traveller is the hero**; Voyara is the guide. Voice: warm, assured, second person ("your journey"), no jargon. Each section eyebrow doubles as a story chapter ("Chapter 02 — The Plan").

| #   | Story beat    | Page section                                    |
| --- | ------------- | ----------------------------------------------- |
| 1   | The Dream     | Hero (with booking card) + Popular Destinations |
| 2   | The Hassle    | Pain-of-planning section                        |
| 3   | The Guide     | Services (Visa, Flights, Hotels, Cars)          |
| 4   | The Plan      | Three simple steps                              |
| 5   | Proof         | Stats counters + traveller stories              |
| 6   | The Departure | Contact / call to action + footer               |

Background rhythm: white → sand → white → ink (stats) → white.

## Milestones

| Phase | Scope                                                                                      | Done when                                                                                 |
| ----- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| 1     | Plan, scaffold, tokens, fonts, shell (navbar, menu, footer), Lenis provider, UI primitives | `npm run build` green; shell renders; smooth scroll works; lint and format clean          |
| 2     | Typed mock data (`src/data`), shared types, pure filter/format helpers with Vitest tests   | All six entity types populated; `search.ts` and `format.ts` covered by passing unit tests |
| 3     | Booking widget (tabs, forms, result lists, empty states, toasts)                           | All four services searchable end to end against mock data; keyboard accessible            |
| 4     | Page sections (hero, destinations, hassle, services, plan, stats, stories, contact)        | Full page assembled in story order; responsive at 360 / 768 / 1280 px                     |
| 5     | GSAP animation layer (hero SplitText, scroll reveals, counters, hovers)                    | Animations only touch transform/opacity; reduced-motion respected; no layout shift        |
| 6     | Polish, accessibility, performance, README, Vercel deploy                                  | Lighthouse a11y ≥ 95, build green, live URL in README, screenshots added                  |

## Component map

```
src/app/            layout.tsx · page.tsx (thin composition) · globals.css
src/components/ui/        Button · Container · SectionHeading · EmptyState · Toast · RatingStars · PriceTag
src/components/layout/    Navbar · MobileMenu · Footer · SmoothScroll
src/components/sections/  Hero · Destinations · Hassle · Services · Plan · Stats · Stories · Contact   (Phase 4)
src/components/booking/   BookingCard · FlightForm · HotelForm · CarForm · VisaForm · Results           (Phase 3)
src/data/           typed mock data — the only place data lives
src/lib/            gsap.ts · search.ts · format.ts · utils.ts
src/hooks/          custom hooks
src/types/          shared types, defined once
```

## Data model sketch

```ts
Flight       { id, airline, from, to, departTime, arriveTime, durationMins, stops, cabin, pricePkr }
Hotel        { id, name, city, stars, rating, reviews, amenities[], pricePerNightPkr, image }
Car          { id, name, category, seats, transmission, fuel, pricePerDayPkr, image }
VisaPackage  { id, country, type, processingDays, validityDays, entries, feePkr, requirements[] }
Destination  { id, name, country, tagline, startingFromPkr, image }
Testimonial  { id, name, trip, quote, rating, avatar }
```

## Key decisions

- **Lenis + GSAP on one shared ticker.** Lenis runs with `autoRaf: false` and is driven from `gsap.ticker`, with `ScrollTrigger.update` on Lenis's scroll event and `lagSmoothing(0)`. Two competing rAF loops cause scroll jitter and out-of-sync triggers.
- **SplitText masked line reveals for the hero.** Lines are the natural unit for a headline; masking gives a premium "rise" effect while animating only transform.
- **Pure filter functions.** Search logic lives in `src/lib/search.ts` as input → output functions with no React, so it is unit-testable with Vitest.
- **Mock data isolated in `src/data`.** Components never inline data; swapping in a real API later touches one folder.
- **Animations as a separate final layer.** Structure and function ship first (Phases 1–4); motion is added in Phase 5 so it cannot mask broken layout or logic.
- **Tailwind v4 CSS-first.** Theme tokens live in `globals.css` via `@theme`; there is no `tailwind.config.js`.
- **Static-only page.** No `cookies()`/`headers()` or other dynamic APIs, so the whole page prerenders.

## Risks and mitigations

| Risk                               | Mitigation                                                                                  |
| ---------------------------------- | ------------------------------------------------------------------------------------------- |
| Unsplash URLs break or load slowly | Gradient background behind every image container; real alt text; `next/image` only          |
| SplitText flash of unsplit text    | Split inside `document.fonts.ready` with `autoSplit`; hide the target until split completes |
| Pinning misbehaves on mobile       | Pinned scenes are desktop-only via `gsap.matchMedia`                                        |
| Reduced-motion users               | Lenis is not mounted and animations are skipped when `prefers-reduced-motion` matches       |
