"use client";

import { useEffect } from "react";
import { ResultsGrid } from "@/components/booking/ResultsGrid";
import { SearchPanel } from "@/components/booking/SearchPanel";
import { Container } from "@/components/ui/Container";
import { useToast } from "@/components/ui/Toast";
import { useBookingSearch } from "@/hooks/useBookingSearch";
import { useScrollTo } from "@/hooks/useScrollTo";
import { useToday } from "@/hooks/useToday";

function BookingExperience({ today }: { today: string }) {
  const booking = useBookingSearch(today);
  const { status, outcome, plan } = booking;
  const { notify } = useToast();
  const scrollTo = useScrollTo();

  useEffect(() => {
    if (status === "done") scrollTo("#search-results");
  }, [status, scrollTo]);

  const handleToggle = (id: string) => {
    notify(
      plan.toggle(id)
        ? "Added to your trip plan ✓ — our team will confirm shortly."
        : "Removed from your trip plan.",
    );
  };

  return (
    <section id="booking" aria-label="Plan your trip" className="py-16">
      <Container>
        <SearchPanel booking={booking} today={today} />
        {outcome ? (
          <ResultsGrid
            outcome={outcome}
            planned={plan.planned}
            onToggle={handleToggle}
          />
        ) : null}
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
