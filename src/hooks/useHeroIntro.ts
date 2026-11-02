"use client";

import type { RefObject } from "react";
import { gsap, MOTION_OK, SplitText, TABLET_UP, useGSAP } from "@/lib/gsap";

const CLEAR = "transform,opacity,visibility";

/**
 * The hero's opening sequence and scroll parallax. Expects `scope` to contain
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

        gsap.set([eyebrow, sub, cue], { autoAlpha: 0, y: 24 });
        gsap.set(card, { autoAlpha: 0, y: 56 });
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
              gsap
                .timeline({ defaults: { ease: "power3.out" } })
                .to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.2)
                .from(
                  self.lines,
                  { yPercent: 110, duration: 1.1, stagger: 0.12 },
                  0.35,
                )
                .to(sub, { autoAlpha: 1, y: 0, duration: 0.9 }, ">-0.6")
                .to(
                  card,
                  { autoAlpha: 1, y: 0, duration: 1, clearProps: CLEAR },
                  ">-0.55",
                )
                .to(cue, { autoAlpha: 1, y: 0, duration: 0.8 }, ">-0.3");
            },
          });
        });
        void document.fonts.ready.then(() => start());

        return () => {
          cancelled = true;
        };
      });

      // Parallax: the photo drifts slower than the page as the hero leaves.
      mm.add(TABLET_UP, () => {
        gsap.to(bg, {
          yPercent: 14,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    },
    { scope },
  );
}
