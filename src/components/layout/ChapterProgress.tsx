"use client";

import { useRef } from "react";
import { chapters } from "@/data/story";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * A slim gold rail scrubbed to whole-page scroll plus a chapter label that
 * swaps as each chapter crosses the viewport centre. Both are driven straight
 * from ScrollTrigger onto DOM nodes: scrolling never causes a React render.
 */
export function ChapterProgress() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      const rail = root?.querySelector<HTMLElement>("[data-rail]");
      // The label lives in the navbar so it never sits over page content.
      const label = document.querySelector<HTMLElement>("[data-chapter]");
      if (!root || !rail || !label) return;

      chapters.forEach((chapter) => {
        const section = document.getElementById(chapter.id);
        if (!section) return;
        ScrollTrigger.create({
          trigger: section,
          start: "top 50%",
          end: "bottom 50%",
          onToggle: (self) => {
            if (self.isActive) label.textContent = chapter.label;
          },
        });
      });

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          rail,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: document.documentElement,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.3,
            },
          },
        );
      });
    },
    { scope },
  );

  return (
    <div ref={scope} aria-hidden="true" className="pointer-events-none">
      <div
        data-rail
        className="fixed inset-x-0 top-20 z-40 h-0.5 origin-left scale-x-0 bg-gold"
      />
    </div>
  );
}
