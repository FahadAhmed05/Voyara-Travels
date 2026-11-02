"use client";

import type { RefObject } from "react";
import { gsap, MOTION_OK, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";

/**
 * The shared scroll language for a section, written once:
 *  - every h2 / [data-split] is split into masked lines that rise when it
 *    arrives (split only after fonts load, reverted by useGSAP cleanup);
 *  - each eyebrow's gold rule [data-rule] is drawn by scroll;
 *  - every [data-reveal] is scrubbed in on ONE timeline per section, so scroll
 *    position is the playhead and scrolling back reverses it.
 * Without JS or under reduced motion nothing is hidden. Only transform and
 * opacity are animated (opacity, not visibility, so focus is never lost).
 */
export function useScrollReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, (_context, contextSafe) => {
        const trigger = root.closest("section") ?? root;
        const items = gsap.utils.toArray<HTMLElement>("[data-reveal]", root);
        const rules = gsap.utils.toArray<HTMLElement>("[data-rule]", root);
        const headings = gsap.utils.toArray<HTMLElement>(
          "h2, [data-split]",
          root,
        );
        let cancelled = false;

        if (items.length > 0) {
          gsap.set(items, { y: 36, opacity: 0 });
          gsap.to(items, {
            y: 0,
            opacity: 1,
            ease: "power2.inOut",
            stagger: 0.12,
            scrollTrigger: {
              trigger,
              start: "top 85%",
              end: "top 35%",
              scrub: 1,
            },
          });
        }

        rules.forEach((rule) => {
          gsap.fromTo(
            rule,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: rule,
                start: "top 92%",
                end: "top 62%",
                scrub: 1,
              },
            },
          );
        });

        const split = contextSafe!(() => {
          if (cancelled) return;
          headings.forEach((heading) => {
            let reveal: ScrollTrigger | undefined;
            let played = false;
            SplitText.create(heading, {
              type: "lines",
              mask: "lines",
              autoSplit: true,
              onSplit: (self) => {
                if (played) return;
                reveal?.kill();
                gsap.set(self.lines, { yPercent: 110 });
                reveal = ScrollTrigger.create({
                  trigger: heading,
                  start: "top 85%",
                  once: true,
                  onEnter: () => {
                    played = true;
                    gsap.to(self.lines, {
                      yPercent: 0,
                      duration: 1.3,
                      stagger: 0.1,
                      ease: "expo.out",
                    });
                  },
                });
              },
            });
          });
        });
        void document.fonts.ready.then(() => split());

        return () => {
          cancelled = true;
        };
      });
    },
    { scope },
  );
}
