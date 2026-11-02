import type { BookingForms } from "@/types";

const DAY_MS = 24 * 60 * 60 * 1000;

/** Local-time yyyy-mm-dd, the format native date inputs use. */
export function toISODate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function daysFrom(today: string, offset: number): string {
  if (today === "") return "";
  const base = new Date(`${today}T12:00:00`);
  return toISODate(new Date(base.getTime() + offset * DAY_MS));
}

/** `today` is "" before the client knows the date, which leaves dates blank. */
export function createDefaultForms(today: string): BookingForms {
  return {
    flights: {
      trip: "round-trip",
      from: "Karachi",
      to: "Dubai",
      depart: daysFrom(today, 7),
      returnDate: daysFrom(today, 14),
      passengers: 1,
      cabin: "Economy",
    },
    hotels: {
      destination: "Dubai",
      checkIn: daysFrom(today, 7),
      checkOut: daysFrom(today, 10),
      guests: 2,
      rooms: 1,
    },
    cars: {
      pickupCity: "Karachi",
      pickupDate: daysFrom(today, 7),
      dropoffDate: daysFrom(today, 10),
      type: "Any",
    },
    visa: {
      country: "UAE",
      type: "Tourist",
      processing: "Standard",
      applicants: 1,
    },
  };
}
