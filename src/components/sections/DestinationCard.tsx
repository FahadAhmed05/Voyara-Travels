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
    // GSAP animates the article (inline `translate: none`), so the hover lift
    // sits on the inner frame where CSS can still move it.
    <article data-reveal className={cn("group relative", className)}>
      <div className="absolute inset-0 overflow-hidden rounded-3xl bg-gradient-to-br from-teal-dark to-ink shadow-soft transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift">
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
              quality={72}
              sizes={sizes}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />

        <span className="absolute top-5 left-5 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-ink">
          {destination.tag}
        </span>

        <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-3 p-5 text-white min-[1280px]:flex-row min-[1280px]:items-end min-[1280px]:justify-between min-[1280px]:gap-4 min-[1280px]:p-6 sm:max-[1023px]:flex-row sm:max-[1023px]:items-end sm:max-[1023px]:justify-between sm:max-[1023px]:p-6">
          <div>
            <h3 className="line-clamp-2 text-2xl font-semibold break-words text-white min-[1280px]:text-3xl sm:max-[1023px]:text-3xl">
              {destination.name}
            </h3>
            <p className="text-sm text-on-dark">{destination.country}</p>
            <p className="mt-2 flex items-center gap-2 text-sm">
              <RatingStars rating={destination.rating} />
              <span>{destination.rating.toFixed(1)}</span>
            </p>
          </div>
          <p className="text-sm text-on-dark min-[1280px]:text-right sm:max-[1023px]:text-right">
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
      </div>
    </article>
  );
}
