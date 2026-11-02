import { carPickupCities, carTypeOptions } from "@/data/booking-options";
import { DateField, SelectField } from "@/components/booking/FormControls";
import type { CarForm } from "@/types";

interface CarFieldsProps {
  form: CarForm;
  today: string;
  errorId?: string;
  onChange: (patch: Partial<CarForm>) => void;
}

export function CarFields({ form, today, errorId, onChange }: CarFieldsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <SelectField
        label="Pickup city"
        value={form.pickupCity}
        options={carPickupCities}
        onChange={(pickupCity) => onChange({ pickupCity })}
      />
      <DateField
        label="Pickup date"
        value={form.pickupDate}
        min={today}
        errorId={errorId}
        onChange={(pickupDate) => onChange({ pickupDate })}
      />
      <DateField
        label="Drop-off date"
        value={form.dropoffDate}
        min={form.pickupDate || today}
        errorId={errorId}
        onChange={(dropoffDate) => onChange({ dropoffDate })}
      />
      <SelectField
        label="Car type"
        value={form.type}
        options={carTypeOptions}
        onChange={(type) => onChange({ type })}
      />
    </div>
  );
}
