import { cars } from "@/data/cars";
import { flights } from "@/data/flights";
import { hotelDestinations } from "@/data/booking-options";
import { hotels } from "@/data/hotels";
import { visas } from "@/data/visas";
import { pluralise } from "@/lib/format";
import {
  filterCars,
  filterFlights,
  filterHotels,
  filterVisas,
} from "@/lib/search";
import type {
  BookingForms,
  Processing,
  SearchOutcome,
  TabId,
  VisaPackage,
} from "@/types";

const DAY_MS = 24 * 60 * 60 * 1000;
const EXPRESS_FEE_MULTIPLIER = 1.5;

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

/** Plain-language problems that stop a search. ISO dates compare as strings. */
export function validateForm(tab: TabId, forms: BookingForms): string[] {
  if (tab === "flights") {
    const { from, to, trip, depart, returnDate } = forms.flights;
    const issues: string[] = [];
    if (from === to) {
      issues.push(
        "Departure and arrival are the same city — pick two different cities.",
      );
    }
    if (trip === "round-trip" && depart && returnDate && returnDate < depart) {
      issues.push("Your return date can't be before your departure date.");
    }
    return issues;
  }
  if (tab === "hotels") {
    const { checkIn, checkOut } = forms.hotels;
    return checkIn && checkOut && checkOut <= checkIn
      ? ["Check-out must be at least one day after check-in."]
      : [];
  }
  if (tab === "cars") {
    const { pickupDate, dropoffDate } = forms.cars;
    return pickupDate && dropoffDate && dropoffDate < pickupDate
      ? ["Drop-off can't be before pickup."]
      : [];
  }
  return [];
}

export function runSearch(tab: TabId, forms: BookingForms): SearchOutcome {
  switch (tab) {
    case "flights": {
      const { from, to, cabin } = forms.flights;
      return {
        tab,
        form: forms.flights,
        items: filterFlights(flights, { from, to, cabin }),
      };
    }
    case "hotels":
      return {
        tab,
        form: forms.hotels,
        items: filterHotels(hotels, { city: forms.hotels.destination }),
      };
    case "cars":
      return {
        tab,
        form: forms.cars,
        items: filterCars(cars, { type: forms.cars.type }),
      };
    case "visa": {
      const { country, type } = forms.visa;
      return {
        tab,
        form: forms.visa,
        items: filterVisas(visas, { country, type }),
      };
    }
  }
}

/** Express halves the days (rounded up) and costs 1.5× per applicant. */
export function applyProcessing(
  visa: VisaPackage,
  processing: Processing,
): { days: number; fee: number } {
  if (processing === "Standard") {
    return { days: visa.processingDays, fee: visa.fee };
  }
  return {
    days: Math.ceil(visa.processingDays / 2),
    fee: Math.round(visa.fee * EXPRESS_FEE_MULTIPLIER),
  };
}

export function resultsHeading(outcome: SearchOutcome): string {
  const count = outcome.items.length;
  switch (outcome.tab) {
    case "flights":
      return `${count} ${count === 1 ? "journey" : "journeys"} found · ${outcome.form.from} → ${outcome.form.to}`;
    case "hotels": {
      const label =
        hotelDestinations.find((d) => d.value === outcome.form.destination)
          ?.label ?? outcome.form.destination;
      return `${pluralise(count, "stay")} in ${label}`;
    }
    case "cars":
      return `${pluralise(count, "car")} in ${outcome.form.pickupCity}`;
    case "visa":
      return `${outcome.form.country} — ${outcome.form.type} visa`;
  }
}
