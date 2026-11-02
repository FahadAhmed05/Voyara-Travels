"use client";

import type { RefObject } from "react";
import {
  gsap,
  MOTION_OK,
  ScrollTrigger,
  SplitText,
  TABLET_UP,
  useGSAP,
} from "@/lib/gsap";

const CLEAR = "transform,opacity,visibility";

const SCENE = { start: "top top", end: "+=110%", scrub: 1.2 } as const;

/**
 * The hero's load-in sequence, then (tablet and up) a pinned camera scene that
 * plays on scroll in both directions. Expects `scope` to contain
 * #home and the data-hero="bg|eyebrow|title|sub|card|cue" elements.
 */
export function useHeroIntro(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const pick = (name: string) =>
        root.querySelector<HTMLElement>(`[data-hero="${name}"]`);
      const section = root.querySelector<HTMLElement>("#home");
      const bg = pick("bg");
      const image = bg?.querySelector("img");
      const [eyebrow, title, sub, card, cue] = [
        "eyebrow",
        "title",
        "sub",
        "card",
        "cue",
      ].map(pick);
      if (!section || !bg || !image) return;
      if (!eyebrow || !title || !sub || !card || !cue) return;

      const mm = gsap.matchMedia();

      // Signature intro: bg settles, then the headline rises line by line
      // out of its mask, followed by the supporting pieces.
      mm.add(MOTION_OK, (_context, contextSafe) => {
        let cancelled = false;
        // With the pinned scene the card sits below the pin spacer and is
        // delivered by scroll instead of by the load-in.
        const scene = window.matchMedia(TABLET_UP).matches;

        gsap.set([eyebrow, sub, cue], { autoAlpha: 0, y: 24 });
        if (!scene) gsap.set(card, { autoAlpha: 0, y: 56 });
        gsap.set(title, { autoAlpha: 0 });
        gsap.fromTo(
          image,
          { scale: 1.15 },
          { scale: 1, duration: 1.8, ease: "power2.out" },
        );

        // Split only once fonts are loaded, or the lines would re-break.
        const start = contextSafe!(() => {
          if (cancelled) return;
          gsap.set(title, { autoAlpha: 1 });
          let built = false;
          SplitText.create(title, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            onSplit: (self) => {
              if (built) return;
              built = true;
              const intro = gsap
                .timeline({ defaults: { ease: "power3.out" } })
                .to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.2)
                .from(
                  self.lines,
                  { yPercent: 110, duration: 1.1, stagger: 0.12 },
                  0.35,
                )
                .to(sub, { autoAlpha: 1, y: 0, duration: 0.9 }, ">-0.6");
              if (!scene) {
                intro.to(
                  card,
                  { autoAlpha: 1, y: 0, duration: 1, clearProps: CLEAR },
                  ">-0.55",
                );
              }
              intro.to(cue, { autoAlpha: 1, y: 0, duration: 0.8 }, ">-0.3");
            },
          });
        });
        void document.fonts.ready.then(() => start());

        return () => {
          cancelled = true;
        };
      });

      // Pinned camera scene: the photo pushes in and the headline drifts at
      // two speeds (foreground faster than background = depth) while the page
      // holds still; then the booking card is delivered as the hero lets go.
      mm.add(TABLET_UP, (_context, contextSafe) => {
        let cancelled = false;

        gsap.fromTo(
          card,
          { y: 90, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: card,
              start: "top 100%",
              end: "top 55%",
              scrub: 1.2,
            },
          },
        );

        // Built once fonts are ready, when the headline's line masks exist.
        const build = contextSafe!(() => {
          if (cancelled) return;
          const masks = Array.from(title.children);
          gsap
            .timeline({
              defaults: { ease: "power2.inOut" },
              scrollTrigger: {
                trigger: section,
                ...SCENE,
                pin: true,
                pinSpacing: true,
                anticipatePin: 1,
                // Pins measure first so everything below sees the spacer.
                refreshPriority: 1,
              },
            })
            .fromTo(
              bg,
              { scale: 1.22, yPercent: 0 },
              { scale: 1.02, yPercent: 10, ease: "none", duration: 1 },
              0,
            )
            .to(cue, { opacity: 0, ease: "none", duration: 0.15 }, 0)
            .to(masks[0], { yPercent: -18, opacity: 0.25, duration: 1 }, 0)
            .to(masks[1], { yPercent: -30, opacity: 0.25, duration: 1 }, 0);
          // The pin spacer moves everything below: remeasure once, now.
          ScrollTrigger.refresh();
        });
        void document.fonts.ready.then(() => build());

        return () => {
          cancelled = true;
        };
      });
    },
    { scope },
  );
}
