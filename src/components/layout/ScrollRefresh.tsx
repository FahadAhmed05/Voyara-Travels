"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Recalculates ScrollTrigger positions once the page, web fonts and hero photo
 * have settled, and at no other time (never on scroll or resize),
 * so pinned and scrubbed sections never start from stale measurements.
 */
export function ScrollRefresh() {
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();

    if (document.readyState === "complete") refresh();
    else window.addEventListener("load", refresh, { once: true });
    void document.fonts.ready.then(refresh);
    // The hero photo sets the page rhythm; remeasure once it has decoded.
    void document
      .querySelector<HTMLImageElement>("#home img")
      ?.decode()
      .then(refresh)
      .catch(() => undefined);

    return () => window.removeEventListener("load", refresh);
  }, []);

  return null;
}
