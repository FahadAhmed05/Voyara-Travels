import { formatPKR } from "@/lib/format";
import { cn } from "@/lib/utils";

interface PriceTagProps {
  amount: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function PriceTag({ amount, suffix, prefix, className }: PriceTagProps) {
  return (
    <p className={cn("flex flex-wrap items-baseline gap-x-1.5", className)}>
      {prefix ? <span className="text-sm text-body">{prefix}</span> : null}
      <span className="font-display text-2xl font-semibold text-teal-dark">
        {formatPKR(amount)}
      </span>
      {suffix ? <span className="text-sm text-body">{suffix}</span> : null}
    </p>
  );
}
