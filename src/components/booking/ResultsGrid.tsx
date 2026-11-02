import { CarCard } from "@/components/booking/CarCard";
import { EmptyResults } from "@/components/booking/EmptyResults";
import { FlightCard } from "@/components/booking/FlightCard";
import { HotelCard } from "@/components/booking/HotelCard";
import { VisaCard } from "@/components/booking/VisaCard";
import { resultsHeading } from "@/lib/booking";
import type { SearchOutcome } from "@/types";

interface ResultsGridProps {
  outcome: SearchOutcome;
  planned: ReadonlySet<string>;
  onToggle: (id: string) => void;
  onReset: () => void;
}

export function ResultsGrid({
  outcome,
  planned,
  onToggle,
  onReset,
}: ResultsGridProps) {
  const action = (id: string) => ({
    selected: planned.has(id),
    onToggle: () => onToggle(id),
  });

  return (
    <div id="search-results" className="pt-12">
      <p className="font-display text-2xl font-semibold text-ink md:text-3xl">
        {resultsHeading(outcome)}
      </p>
      <p className="mt-1 text-sm">Demo data — no real booking is made.</p>

      {outcome.items.length === 0 ? (
        <EmptyResults tab={outcome.tab} onReset={onReset} />
      ) : null}

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {outcome.tab === "flights"
          ? outcome.items.map((flight) => (
              <FlightCard
                key={flight.id}
                flight={flight}
                passengers={outcome.form.passengers}
                {...action(flight.id)}
              />
            ))
          : null}
        {outcome.tab === "hotels"
          ? outcome.items.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} {...action(hotel.id)} />
            ))
          : null}
        {outcome.tab === "cars"
          ? outcome.items.map((car) => (
              <CarCard key={car.id} car={car} {...action(car.id)} />
            ))
          : null}
        {outcome.tab === "visa"
          ? outcome.items.map((visa) => (
              <VisaCard
                key={visa.id}
                visa={visa}
                processing={outcome.form.processing}
                applicants={outcome.form.applicants}
                {...action(visa.id)}
              />
            ))
          : null}
      </div>
    </div>
  );
}
