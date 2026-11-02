"use client";

import { useRef, type ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Gives a server-rendered section its own scroll-reveal scope without turning
 * the section itself into a client component. It adds no layout box.
 */
export function RevealScope({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);
  useScrollReveal(scope);

  return (
    <div ref={scope} className="contents">
      {children}
    </div>
  );
}
