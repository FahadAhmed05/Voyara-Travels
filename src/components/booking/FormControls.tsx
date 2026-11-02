import { useId, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import type { SelectOption } from "@/types";
import { cn } from "@/lib/utils";

export const controlClass =
  "w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm font-medium text-ink transition-colors hover:border-teal/50 disabled:cursor-not-allowed disabled:bg-mist disabled:text-body/60";

export function Field({
  label,
  htmlFor,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={htmlFor}
        className="text-xs font-bold tracking-wide text-ink/70 uppercase"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

interface SelectFieldProps<T extends string> {
  label: string;
  value: T;
  options: readonly SelectOption<T>[];
  onChange: (value: T) => void;
  className?: string;
}

export function SelectField<T extends string>({
  label,
  value,
  options,
  onChange,
  className,
}: SelectFieldProps<T>) {
  const id = useId();
  return (
    <Field label={label} htmlFor={id} className={className}>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value as T)}
          className={cn(controlClass, "appearance-none pr-10")}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-teal"
          aria-hidden="true"
        />
      </div>
    </Field>
  );
}

interface DateFieldProps {
  label: string;
  value: string;
  min?: string;
  disabled?: boolean;
  errorId?: string;
  onChange: (value: string) => void;
  className?: string;
}

export function DateField({
  label,
  value,
  min,
  disabled,
  errorId,
  onChange,
  className,
}: DateFieldProps) {
  const id = useId();
  return (
    <Field label={label} htmlFor={id} className={className}>
      <input
        id={id}
        type="date"
        value={value}
        min={min}
        disabled={disabled}
        aria-describedby={errorId}
        aria-invalid={errorId ? true : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={controlClass}
      />
    </Field>
  );
}
