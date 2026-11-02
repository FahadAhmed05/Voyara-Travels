"use client";

import { useCallback, useState } from "react";

/** The set of result ids the traveller has added to their trip plan. */
export function useTripPlan() {
  const [planned, setPlanned] = useState<ReadonlySet<string>>(new Set());

  /** Returns true when the item was added, false when it was removed. */
  const toggle = useCallback(
    (id: string): boolean => {
      const adding = !planned.has(id);
      setPlanned((current) => {
        const next = new Set(current);
        if (adding) next.add(id);
        else next.delete(id);
        return next;
      });
      return adding;
    },
    [planned],
  );

  const clear = useCallback(() => setPlanned(new Set()), []);

  return { planned, toggle, clear };
}
