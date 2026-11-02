"use client";

import { SearchPanel } from "@/components/booking/SearchPanel";
import { Container } from "@/components/ui/Container";
import { useBookingSearch } from "@/hooks/useBookingSearch";
import { useToday } from "@/hooks/useToday";

function BookingExperience({ today }: { today: string }) {
  const booking = useBookingSearch(today);

  return (
    <section id="booking" aria-label="Plan your trip" className="py-16">
      <Container>
        <SearchPanel booking={booking} today={today} />
      </Container>
    </section>
  );
}

/**
 * Keyed on today's date so the default dates are computed once the client
 * knows the date, without an effect or a hydration mismatch.
 */
export function BookingSearch() {
  const today = useToday();
  return <BookingExperience key={today} today={today} />;
}
