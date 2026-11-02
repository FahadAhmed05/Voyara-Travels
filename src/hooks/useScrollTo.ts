"use client";

import { useCallback } from "react";
import { useLenis } from "lenis/react";

/**
 * Scrolls to an in-page anchor. Uses Lenis when it is mounted and falls back
 * to an instant native jump (reduced-motion users render without Lenis).
 * Both paths clear the sticky navbar through the global `[id]` scroll-margin.
 */
export function useScrollTo() {
  const lenis = useLenis();

  return useCallback(
    (hash: string) => {
      const target = document.querySelector<HTMLElement>(hash);
      if (!target) return;
      if (lenis) {
        lenis.scrollTo(target, { force: true });
      } else {
        target.scrollIntoView({ behavior: "auto", block: "start" });
      }
    },
    [lenis],
  );
}
