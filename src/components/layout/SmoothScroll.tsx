"use client";

import { useEffect, type ReactNode } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

// Touch keeps the OS scroller: smoothing it fights the platform and feels laggy.
const LENIS_OPTIONS = {
  lerp: 0.095,
  wheelMultiplier: 1,
  smoothWheel: true,
  syncTouch: false,
  autoRaf: false,
};

/**
 * Drives Lenis from GSAP's ticker so smooth scrolling and ScrollTrigger share
 * a single animation loop instead of competing requestAnimationFrame calls.
 */
function GsapBridge() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(raf);
    };
  }, [lenis]);

  return null;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) return <>{children}</>;

  return (
    <ReactLenis root options={LENIS_OPTIONS}>
      <GsapBridge />
      {children}
    </ReactLenis>
  );
}
