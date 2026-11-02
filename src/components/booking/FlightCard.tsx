import { Armchair, Clock, Plane, Route } from "lucide-react";
import {
  MetaItem,
  ResultCard,
  type CardActionProps,
} from "@/components/booking/ResultCard";
import { PriceTag } from "@/components/ui/PriceTag";
import { pluralise } from "@/lib/format";
import type { Flight } from "@/types";

interface FlightCardProps extends CardActionProps {
  flight: Flight;
  passengers: number;
}

export function FlightCard({ flight, passengers, ...action }: FlightCardProps) {
  const stops =
    flight.stops === 0 ? "Non-stop" : pluralise(flight.stops, "stop");

  return (
    <ResultCard
      {...action}
      icon={Plane}
      title={flight.airline}
      subtitle={`${flight.from} → ${flight.to}`}
      badge={flight.cabin}
      ctaLabel="Select flight"
      meta={
        <>
          <MetaItem icon={Clock}>{flight.duration}</MetaItem>
          <MetaItem icon={Route}>{stops}</MetaItem>
          <MetaItem icon={Armchair}>{flight.cabin}</MetaItem>
        </>
      }
      price={
        <PriceTag
          amount={flight.pricePerPerson * passengers}
          suffix={`for ${pluralise(passengers, "passenger")}`}
        />
      }
    >
      <div className="flex items-center justify-between rounded-2xl bg-mist px-5 py-4 font-display text-ink">
        <div>
          <p className="text-2xl font-semibold">{flight.departTime}</p>
          <p className="font-sans text-xs">{flight.from}</p>
        </div>
        <div aria-hidden="true" className="mx-4 h-px flex-1 bg-teal/40" />
        <div className="text-right">
          <p className="text-2xl font-semibold">{flight.arriveTime}</p>
          <p className="font-sans text-xs">{flight.to}</p>
        </div>
      </div>
    </ResultCard>
  );
}
