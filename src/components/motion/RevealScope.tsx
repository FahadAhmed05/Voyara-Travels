"use client";

import { useRef, type ReactNode } from "react";
import { useChapterExit } from "@/hooks/useChapterExit";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Gives a server-rendered section its own scroll-reveal scope without turning
 * the section itself into a client component. It adds no layout box.
 */
export function RevealScope({
  children,
  exit,
}: {
  children: ReactNode;
  /** Let the next section slide over this one (see useChapterExit). */
  exit?: boolean;
}) {
  const scope = useRef<HTMLDivElement>(null);
  useScrollReveal(scope);
  useChapterExit(scope, exit);

  return (
    <div ref={scope} className="contents">
      {children}
    </div>
  );
}
