import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  max?: number;
  className?: string;
}

export function RatingStars({ rating, max = 5, className }: RatingStarsProps) {
  const clamped = Math.min(Math.max(rating, 0), max);
  const stars = Array.from({ length: max }, (_, index) => index);

  return (
    <span
      role="img"
      aria-label={`Rated ${clamped.toFixed(1)} out of ${max}`}
      className={cn("inline-flex items-center gap-0.5", className)}
    >
      {stars.map((index) => {
        const fill = Math.min(Math.max(clamped - index, 0), 1) * 100;
        return (
          <span key={index} className="relative inline-block size-4">
            <Star
              className="absolute inset-0 size-4 text-gold/30"
              aria-hidden="true"
            />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill}%` }}
            >
              <Star className="size-4 fill-gold text-gold" aria-hidden="true" />
            </span>
          </span>
        );
      })}
    </span>
  );
}
