import { CalendarCheck, MapPin } from "lucide-react";
import {
  MetaItem,
  ResultCard,
  type CardActionProps,
} from "@/components/booking/ResultCard";
import { PriceTag } from "@/components/ui/PriceTag";
import { RatingStars } from "@/components/ui/RatingStars";
import { formatPKR, pluralise } from "@/lib/format";
import type { Hotel } from "@/types";

interface HotelCardProps extends CardActionProps {
  hotel: Hotel;
  nights: number;
  rooms: number;
}

export function HotelCard({ hotel, nights, rooms, ...action }: HotelCardProps) {
  return (
    <ResultCard
      {...action}
      title={hotel.name}
      subtitle={`${hotel.stars}-star stay`}
      badge={hotel.city}
      image={{ src: hotel.image, alt: hotel.alt }}
      ctaLabel="Reserve"
      meta={
        <>
          <MetaItem icon={MapPin}>{hotel.city}</MetaItem>
          {hotel.freeCancellation ? (
            <MetaItem icon={CalendarCheck}>Free cancellation</MetaItem>
          ) : null}
        </>
      }
      price={
        <div>
          <PriceTag
            amount={hotel.pricePerNight * nights * rooms}
            suffix={`total · ${pluralise(nights, "night")}`}
          />
          <p className="text-xs">
            {formatPKR(hotel.pricePerNight)} × {pluralise(nights, "night")}
            {rooms > 1 ? ` × ${pluralise(rooms, "room")}` : ""}, all-in
          </p>
        </div>
      }
    >
      <p className="flex items-center gap-2 text-sm">
        <RatingStars rating={hotel.rating} />
        <span>
          {hotel.rating.toFixed(1)} · {hotel.reviews.toLocaleString("en-PK")}{" "}
          reviews
        </span>
      </p>
      <ul className="flex flex-wrap gap-2">
        {hotel.amenities.map((amenity) => (
          <li
            key={amenity}
            className="rounded-full bg-mist px-3 py-1 text-xs font-semibold text-teal-dark"
          >
            {amenity}
          </li>
        ))}
      </ul>
    </ResultCard>
  );
}
