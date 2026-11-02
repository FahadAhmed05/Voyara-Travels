# Voyara Travels — Implementation Plan

## Goal

Build **Voyara Travels**, a premium travel-agency website offering four services — **Visa Services, Flight Ticket Booking, Hotel Booking and Car Rental**. There is no backend and no real API: all data is typed mock data. Deliverables: a GitHub repository with a readable history, a live Vercel deployment and a professional README.

### Mandatory checklist (from the brief)

- [x] Fully responsive (mobile → desktop)
- [x] Functional search forms (flights, hotels, cars, visas) driven by mock data
- [x] Service cards and popular destinations
- [x] Testimonials, contact section and footer
- [x] GSAP animations: scroll reveals, hero animation, animated counters, hover effects
- [x] Reusable components and a clean project structure

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

All six phases are complete. Each shipped as small conventional commits; `git log` reads in phase order.

| Phase | Scope                                                                                      | Done when                                                                                 | Status      |
| ----- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- | ----------- |
| 1     | Plan, scaffold, tokens, fonts, shell (navbar, menu, footer), Lenis provider, UI primitives | `npm run build` green; shell renders; smooth scroll works; lint and format clean          | ✅ Complete |
| 2     | Typed mock data (`src/data`), shared types, pure filter/format helpers with Vitest tests   | All six entity types populated; `search.ts` and `format.ts` covered by passing unit tests | ✅ Complete |
| 3     | Booking widget (tabs, forms, result lists, empty states, toasts)                           | All four services searchable end to end against mock data; keyboard accessible            | ✅ Complete |
| 4     | Page sections (hero, destinations, hassle, services, plan, stats, stories, contact)        | Full page assembled in story order; responsive at 360 / 768 / 1440 px                     | ✅ Complete |
| 5     | GSAP animation layer (hero SplitText, scroll reveals, counters, pinned Plan, parallax)     | Only transform/opacity animated; reduced motion respected; nothing left invisible         | ✅ Complete |
| 6     | Hardening, accessibility, performance, README                                              | Build, lint and tests green; edge cases swept; README complete; ready to deploy           | ✅ Complete |

### Outcome against the "done when" criteria

- **Phase 6 target "Lighthouse a11y ≥ 95":** measured 100 (desktop and mobile) on the production build. Performance is 99 on desktop and 79 on throttled mobile — see the README for why.
- **"Live URL in README, screenshots added":** the live URL is added after the first Vercel deploy (the README has the slot); screenshots were not committed.

### Deviations from the original plan

- Section and booking components were named after what they do rather than the sketch below (for example `SearchPanel`, `ResultCard`, `ThePlan`).
- The data model grew as the UI needed it (for example `Flight.duration` as display text, `Hotel.freeCancellation`, `Car.withDriverAvailable`). Types live once in `src/types/index.ts`.
- A typed window event (`lib/booking-intent.ts`) connects service and destination cards to the booking widget instead of a shared store.

## Component map (as built)

```
src/app/            layout.tsx · page.tsx (thin composition) · globals.css · icon.svg · opengraph-image.tsx
src/components/ui/        Button · Container · SectionHeading · EmptyState · Toast · RatingStars · PriceTag · TextField · SocialIcon
src/components/layout/    Navbar · MobileMenu · Footer · NewsletterForm · SmoothScroll · ScrollRefresh
src/components/motion/    RevealScope
src/components/sections/  Hero · BookingSearch · HassleStrip · Services · Destinations · ThePlan · Stats · Testimonials · CtaBanner · ContactSection
src/components/booking/   SearchPanel · SearchTabs · Flight/Hotel/Car/VisaFields · Stepper · FormControls · ResultsGrid · ResultCard · Flight/Hotel/Car/VisaCard · EmptyResults
src/data/           typed mock data — the only place data lives
src/lib/            gsap.ts · search.ts · booking.ts · booking-intent.ts · contact.ts · format.ts · utils.ts
src/hooks/          useBookingSearch · useTripPlan · useToday · useScrollTo · useScrolled · useScrollReveal · useHeroIntro · useStartBooking · usePrefersReducedMotion
src/types/          shared types, defined once
```

## Data model (as built)

```ts
Flight       { id, airline, from, to, departTime, arriveTime, duration, stops: 0|1, pricePerPerson, cabin }
Hotel        { id, name, city, stars, rating, reviews, pricePerNight, image, alt, amenities[], freeCancellation }
Car          { id, name, type, seats, transmission, pricePerDay, image, alt, withDriverAvailable }
VisaPackage  { id, country, type, processingDays, fee, successRate, requirements[] }
Destination  { id, name, country, rating, reviews, fromPrice, tag, image, alt }
Testimonial  { id, name, initials, trip, quote, rating }
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
