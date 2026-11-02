import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const tones = {
  teal: "text-teal-dark",
  gold: "text-gold",
  light: "text-on-dark",
} as const;

interface EyebrowProps {
  children: ReactNode;
  tone?: keyof typeof tones;
  className?: string;
}

/**
 * Chapter label with a short gold rule. The rule is drawn by scroll (see
 * useScrollReveal) and is simply visible when motion is off.
 */
export function Eyebrow({ children, tone = "teal", className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-3 eyebrow",
        tones[tone],
        className,
      )}
    >
      <span
        aria-hidden="true"
        data-rule
        className="block h-px w-10 origin-left bg-gold"
      />
      {children}
    </p>
  );
}
