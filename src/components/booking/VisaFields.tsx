import {
  processingOptions,
  visaCountries,
  visaTypeOptions,
} from "@/data/booking-options";
import { SelectField } from "@/components/booking/FormControls";
import { Stepper } from "@/components/booking/Stepper";
import type { VisaForm } from "@/types";

interface VisaFieldsProps {
  form: VisaForm;
  onChange: (patch: Partial<VisaForm>) => void;
}

export function VisaFields({ form, onChange }: VisaFieldsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <SelectField
        label="Country"
        value={form.country}
        options={visaCountries}
        onChange={(country) => onChange({ country })}
      />
      <SelectField
        label="Visa type"
        value={form.type}
        options={visaTypeOptions}
        onChange={(type) => onChange({ type })}
      />
      <div>
        <SelectField
          label="Processing"
          value={form.processing}
          options={processingOptions}
          onChange={(processing) => onChange({ processing })}
        />
        {form.processing === "Express" ? (
          <p className="mt-1.5 text-xs text-teal">
            Express: fee ×1.5, half the days.
          </p>
        ) : null}
      </div>
      <Stepper
        label="Applicants"
        value={form.applicants}
        min={1}
        max={6}
        onChange={(applicants) => onChange({ applicants })}
      />
    </div>
  );
}
