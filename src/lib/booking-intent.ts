import type { TabId } from "@/types";

/**
 * A request, made from anywhere on the page, to open the booking card on a
 * given tab. Sent as a window CustomEvent so sections stay decoupled from the
 * booking widget's state; `destination` is a hotel city and only applies to
 * the hotels tab.
 */
export interface BookingIntent {
  tab: TabId;
  destination?: string;
}

const EVENT_NAME = "voyara:booking-intent";

export function requestBooking(intent: BookingIntent): void {
  window.dispatchEvent(
    new CustomEvent<BookingIntent>(EVENT_NAME, { detail: intent }),
  );
}

/** Subscribes to booking requests; returns the unsubscribe function. */
export function onBookingIntent(
  handler: (intent: BookingIntent) => void,
): () => void {
  const listener = (event: Event) => {
    handler((event as CustomEvent<BookingIntent>).detail);
  };
  window.addEventListener(EVENT_NAME, listener);
  return () => window.removeEventListener(EVENT_NAME, listener);
}
