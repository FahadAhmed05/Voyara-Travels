import Image from "next/image";
import { RatingStars } from "@/components/ui/RatingStars";
import { formatPKR } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Destination } from "@/types";

interface DestinationCardProps {
  destination: Destination;
  /** Layout classes: column span and aspect ratio. */
  className?: string;
  /** `sizes` for the photo, matching the column span in the grid. */
  sizes: string;
  /** Lets the photo drift inside its frame (set up by the parent section). */
  parallax?: boolean;
  onSelect: () => void;
}

export function DestinationCard({
  destination,
  className,
  sizes,
  parallax,
  onSelect,
}: DestinationCardProps) {
  return (
    <article
      data-reveal
      className={cn(
        "group relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-dark to-ink shadow-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift",
        className,
      )}
    >
      <div data-image-mask className="absolute inset-0 overflow-hidden">
        <div
          data-parallax={parallax ? "" : undefined}
          className={cn(
            "absolute inset-x-0",
            parallax ? "-inset-y-[10%]" : "inset-y-0",
          )}
        >
          <Image
            src={destination.image}
            alt={destination.alt}
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />

      <span className="absolute top-5 left-5 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-ink">
        {destination.tag}
      </span>

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-white">
        <div>
          <h3 className="line-clamp-2 text-3xl font-semibold break-words text-white">
            {destination.name}
          </h3>
          <p className="text-sm text-on-dark">{destination.country}</p>
          <p className="mt-2 flex items-center gap-2 text-sm">
            <RatingStars rating={destination.rating} />
            <span>{destination.rating.toFixed(1)}</span>
          </p>
        </div>
        <p className="text-right text-sm text-on-dark">
          from
          <span className="block font-display text-xl font-semibold text-gold">
            {formatPKR(destination.fromPrice)}
          </span>
        </p>
      </div>

      <button
        type="button"
        onClick={onSelect}
        aria-label={`Plan a stay in ${destination.name}`}
        className="absolute inset-0 z-10 rounded-3xl focus-visible:outline-offset-[-6px]"
      />
    </article>
  );
}
