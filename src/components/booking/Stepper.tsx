import { useId } from "react";
import { Minus, Plus } from "lucide-react";
import { Field } from "@/components/booking/FormControls";

interface StepperProps {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  className?: string;
}

const buttonClass =
  "grid size-11 place-items-center rounded-full bg-mist text-ink transition-[transform,background-color,color] duration-150 hover:bg-teal hover:text-white active:scale-90 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-mist disabled:hover:text-ink";

export function Stepper({
  label,
  value,
  min,
  max,
  onChange,
  className,
}: StepperProps) {
  const id = useId();
  const clamp = (next: number) => onChange(Math.min(Math.max(next, min), max));

  return (
    <Field label={label} htmlFor={id} className={className}>
      <div
        role="group"
        aria-label={label}
        className="flex items-center justify-between rounded-2xl border border-ink/10 bg-white px-2 py-1.5"
      >
        <button
          type="button"
          aria-label={`Decrease ${label.toLowerCase()}`}
          disabled={value <= min}
          onClick={() => clamp(value - 1)}
          className={buttonClass}
        >
          <Minus className="size-4" aria-hidden="true" />
        </button>
        <output
          id={id}
          aria-live="polite"
          className="min-w-8 text-center text-sm font-bold text-ink"
        >
          {value}
        </output>
        <button
          type="button"
          aria-label={`Increase ${label.toLowerCase()}`}
          disabled={value >= max}
          onClick={() => clamp(value + 1)}
          className={buttonClass}
        >
          <Plus className="size-4" aria-hidden="true" />
        </button>
      </div>
    </Field>
  );
}
