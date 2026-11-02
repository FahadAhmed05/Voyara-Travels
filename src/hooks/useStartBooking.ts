"use client";

import { useCallback } from "react";
import { useScrollTo } from "@/hooks/useScrollTo";
import { requestBooking, type BookingIntent } from "@/lib/booking-intent";

/** Opens the booking card on the requested tab and scrolls it into view. */
export function useStartBooking() {
  const scrollTo = useScrollTo();

  return useCallback(
    (intent: BookingIntent) => {
      requestBooking(intent);
      scrollTo("#booking");
    },
    [scrollTo],
  );
}
