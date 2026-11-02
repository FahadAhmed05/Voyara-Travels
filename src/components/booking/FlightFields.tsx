import {
  cabinOptions,
  flightDestinations,
  flightOrigins,
} from "@/data/booking-options";
import { DateField, SelectField } from "@/components/booking/FormControls";
import { Stepper } from "@/components/booking/Stepper";
import { cn } from "@/lib/utils";
import type { FlightForm, TripType } from "@/types";

interface FlightFieldsProps {
  form: FlightForm;
  today: string;
  errorId?: string;
  onChange: (patch: Partial<FlightForm>) => void;
}

const tripOptions: { value: TripType; label: string }[] = [
  { value: "round-trip", label: "Round trip" },
  { value: "one-way", label: "One way" },
];

export function FlightFields({
  form,
  today,
  errorId,
  onChange,
}: FlightFieldsProps) {
  const oneWay = form.trip === "one-way";

  return (
    <div className="space-y-5">
      <div
        role="radiogroup"
        aria-label="Trip type"
        className="inline-flex rounded-full bg-mist p-1"
      >
        {tripOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={form.trip === option.value}
            onClick={() => onChange({ trip: option.value })}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-semibold transition-[background-color,color] duration-200",
              form.trip === option.value
                ? "bg-ink text-white"
                : "text-ink hover:text-teal",
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        <SelectField
          label="From"
          value={form.from}
          options={flightOrigins}
          onChange={(from) => onChange({ from })}
          className="lg:col-span-2"
        />
        <SelectField
          label="To"
          value={form.to}
          options={flightDestinations}
          onChange={(to) => onChange({ to })}
          className="lg:col-span-2"
        />
        <SelectField
          label="Class"
          value={form.cabin}
          options={cabinOptions}
          onChange={(cabin) => onChange({ cabin })}
          className="lg:col-span-2"
        />
        <DateField
          label="Depart"
          value={form.depart}
          min={today}
          errorId={errorId}
          onChange={(depart) => onChange({ depart })}
          className="lg:col-span-2"
        />
        <DateField
          label="Return"
          value={oneWay ? "" : form.returnDate}
          min={form.depart || today}
          disabled={oneWay}
          errorId={errorId}
          onChange={(returnDate) => onChange({ returnDate })}
          className="lg:col-span-2"
        />
        <Stepper
          label="Passengers"
          value={form.passengers}
          min={1}
          max={9}
          onChange={(passengers) => onChange({ passengers })}
          className="lg:col-span-2"
        />
      </div>
    </div>
  );
}
