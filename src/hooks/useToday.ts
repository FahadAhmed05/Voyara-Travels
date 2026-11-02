"use client";

import { useSyncExternalStore } from "react";
import { toISODate } from "@/lib/booking";

const subscribe = () => () => {};

/**
 * Today's date as yyyy-mm-dd. Empty on the server so the statically rendered
 * HTML never bakes in the build date; the client value arrives on hydration.
 */
export function useToday(): string {
  return useSyncExternalStore(
    subscribe,
    () => toISODate(new Date()),
    () => "",
  );
}
