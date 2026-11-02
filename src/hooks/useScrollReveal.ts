"use client";

import type { RefObject } from "react";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";

const CLEAR = "transform,opacity,visibility";

/**
 * Fades and lifts every [data-reveal] element inside `scope` as it enters the
 * viewport, once, with siblings that arrive together staggered. Without JS or
 * under reduced motion nothing is hidden, so content is always readable.
 */
export function useScrollReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const targets = gsap.utils.toArray<HTMLElement>("[data-reveal]", root);
        if (targets.length === 0) return;

        gsap.set(targets, { y: 36, autoAlpha: 0 });
        ScrollTrigger.batch(targets, {
          start: "top 88%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              y: 0,
              autoAlpha: 1,
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.08,
              overwrite: true,
              clearProps: CLEAR,
            }),
        });
      });
    },
    { scope },
  );
}
