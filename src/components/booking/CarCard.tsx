import { Settings2, UserCheck, Users } from "lucide-react";
import {
  MetaItem,
  ResultCard,
  type CardActionProps,
} from "@/components/booking/ResultCard";
import { PriceTag } from "@/components/ui/PriceTag";
import { formatPKR, pluralise } from "@/lib/format";
import type { Car } from "@/types";

interface CarCardProps extends CardActionProps {
  car: Car;
  days: number;
}

export function CarCard({ car, days, ...action }: CarCardProps) {
  return (
    <ResultCard
      {...action}
      title={car.name}
      subtitle={`${car.type} class`}
      badge={car.type}
      image={{ src: car.image, alt: car.alt }}
      ctaLabel="Book this car"
      meta={
        <>
          <MetaItem icon={Users}>{car.seats} seats</MetaItem>
          <MetaItem icon={Settings2}>{car.transmission}</MetaItem>
          {car.withDriverAvailable ? (
            <MetaItem icon={UserCheck}>Driver available</MetaItem>
          ) : null}
        </>
      }
      price={
        <div>
          <PriceTag
            amount={car.pricePerDay * days}
            suffix={`total · ${pluralise(days, "day")}`}
          />
          <p className="text-xs">
            {formatPKR(car.pricePerDay)} × {pluralise(days, "day")}, all-in
          </p>
        </div>
      }
    />
  );
}
