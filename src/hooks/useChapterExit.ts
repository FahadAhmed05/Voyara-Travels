"use client";

import type { RefObject } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

/**
 * As the next chapter slides over this section's bottom edge, the section
 * eases back (scale about its bottom) like a card being covered. Scrubbed, so
 * it reverses on scroll up. `scope` is any element inside the section.
 */
export function useChapterExit(
  scope: RefObject<HTMLElement | null>,
  enabled = true,
) {
  useGSAP(
    () => {
      const section = scope.current?.closest("section");
      if (!enabled || !section) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.to(section, {
          scale: 0.94,
          transformOrigin: "50% 100%",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "bottom 92%",
            end: "bottom 8%",
            scrub: 1,
          },
        });
      });
    },
    { scope, dependencies: [enabled] },
  );
}
