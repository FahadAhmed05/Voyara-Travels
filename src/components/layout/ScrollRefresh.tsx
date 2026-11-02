"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Recalculates ScrollTrigger positions once images and web fonts have settled,
 * so pinned and scrubbed sections never start from stale measurements.
 */
export function ScrollRefresh() {
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();

    if (document.readyState === "complete") refresh();
    else window.addEventListener("load", refresh, { once: true });
    void document.fonts.ready.then(refresh);

    return () => window.removeEventListener("load", refresh);
  }, []);

  return null;
}
