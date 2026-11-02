import { hotelDestinations } from "@/data/booking-options";
import { DateField, SelectField } from "@/components/booking/FormControls";
import { Stepper } from "@/components/booking/Stepper";
import type { HotelForm } from "@/types";

interface HotelFieldsProps {
  form: HotelForm;
  today: string;
  errorId?: string;
  onChange: (patch: Partial<HotelForm>) => void;
}

export function HotelFields({
  form,
  today,
  errorId,
  onChange,
}: HotelFieldsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <SelectField
        label="Destination"
        value={form.destination}
        options={hotelDestinations}
        onChange={(destination) => onChange({ destination })}
        className="sm:col-span-2"
      />
      <DateField
        label="Check-in"
        value={form.checkIn}
        min={today}
        errorId={errorId}
        onChange={(checkIn) => onChange({ checkIn })}
      />
      <DateField
        label="Check-out"
        value={form.checkOut}
        min={form.checkIn || today}
        errorId={errorId}
        onChange={(checkOut) => onChange({ checkOut })}
      />
      <Stepper
        label="Guests"
        value={form.guests}
        min={1}
        max={8}
        onChange={(guests) => onChange({ guests })}
        className="lg:col-span-2"
      />
      <Stepper
        label="Rooms"
        value={form.rooms}
        min={1}
        max={4}
        onChange={(rooms) => onChange({ rooms })}
        className="lg:col-span-2"
      />
    </div>
  );
}
