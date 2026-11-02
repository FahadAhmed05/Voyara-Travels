import { Settings2, UserCheck, Users } from "lucide-react";
import {
  MetaItem,
  ResultCard,
  type CardActionProps,
} from "@/components/booking/ResultCard";
import { PriceTag } from "@/components/ui/PriceTag";
import type { Car } from "@/types";

interface CarCardProps extends CardActionProps {
  car: Car;
}

export function CarCard({ car, ...action }: CarCardProps) {
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
      price={<PriceTag amount={car.pricePerDay} suffix="per day" />}
    />
  );
}
