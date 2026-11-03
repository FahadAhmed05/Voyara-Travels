"use client";

import type { RefObject } from "react";
import { gsap, MOTION_OK, SplitText, TABLET_UP, useGSAP } from "@/lib/gsap";

/**
 * The hero's load-in and its scroll "camera". Both only run from tablet width
 * up, with motion allowed. On phones (where mobile LCP matters most) the text
 * is never hidden: only the photo settles and the scroll camera runs. Under
 * reduced motion the hero is simply there from the first paint. Nothing pins
 * the page, and the booking card is never hidden.
 * Expects `scope` to contain #home and data-hero="bg|eyebrow|title|sub|cue".
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
      const [eyebrow, title, sub, cue] = ["eyebrow", "title", "sub", "cue"].map(
        pick,
      );
      if (!section || !bg || !image) return;
      if (!eyebrow || !title || !sub || !cue) return;

      const mm = gsap.matchMedia();

      mm.add(`(max-width: 767px) and ${MOTION_OK}`, () => {
        gsap.fromTo(
          image,
          { scale: 1.15 },
          { scale: 1, duration: 1.8, ease: "power2.out" },
        );
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          })
          .to(bg, { yPercent: 12, scale: 1.08, duration: 1 }, 0)
          .to(cue, { opacity: 0, duration: 0.15 }, 0)
          .to(title, { yPercent: -10, opacity: 0.35, duration: 1 }, 0);
      });

      mm.add(TABLET_UP, (_context, contextSafe) => {
        let cancelled = false;

        gsap.set([eyebrow, sub, cue], { autoAlpha: 0, y: 24 });
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
                .to(cue, { autoAlpha: 1, y: 0, duration: 0.8 }, ">-0.3");

              // Scroll camera: the photo drifts slower than the page and the
              // headline lines peel away at two speeds. Reverses on scroll up.
              const masks = Array.from(title.children);
              gsap
                .timeline({
                  defaults: { ease: "none" },
                  scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1.2,
                  },
                })
                .to(bg, { yPercent: 12, scale: 1.08, duration: 1 }, 0)
                .to(cue, { opacity: 0, duration: 0.15 }, 0)
                .to(masks[0], { yPercent: -18, opacity: 0.3, duration: 1 }, 0)
                .to(masks[1], { yPercent: -30, opacity: 0.3, duration: 1 }, 0);
            },
          });
        });
        void document.fonts.ready.then(() => start());

        return () => {
          cancelled = true;
        };
      });
    },
    { scope },
  );
}
