import type { Cabin, CarType, SelectOption, VisaType } from "@/types";

const options = <T extends string>(values: readonly T[]): SelectOption<T>[] =>
  values.map((value) => ({ value, label: value }));

export const flightOrigins = options([
  "Karachi",
  "Skardu",
  "Lahore",
  "Islamabad",
  "Dubai",
  "Istanbul",
  "Baku",
]);

export const flightDestinations = options([
  "Dubai",
  "Istanbul",
  "Baku",
  "Kuala Lumpur",
  "Doha",
  "London",
  "Malé",
  "Karachi",
]);

export const cabinOptions = options<Cabin>(["Economy", "Business"]);

/** Values match the `city` field used in the hotel data. */
export const hotelDestinations: SelectOption[] = [
  { value: "Dubai", label: "Dubai" },
  { value: "Istanbul", label: "Istanbul" },
  { value: "Malé", label: "Maldives" },
  { value: "Baku", label: "Baku" },
  { value: "Kuala Lumpur", label: "Kuala Lumpur" },
  { value: "Hunza", label: "Hunza Valley" },
];

export const carPickupCities = options([
  "Karachi",
  "Lahore",
  "Islamabad",
  "Dubai",
  "Istanbul",
]);

export const carTypeOptions = options<CarType | "Any">([
  "Any",
  "Economy",
  "SUV",
  "Luxury",
  "Van",
]);

export const visaCountries = options([
  "UAE",
  "Turkey",
  "Malaysia",
  "Thailand",
  "Schengen",
  "UK",
]);

export const visaTypeOptions = options<VisaType>([
  "Tourist",
  "Business",
  "Transit",
]);

export const processingOptions = options(["Standard", "Express"] as const);

export const bookingTabs = [
  { id: "flights", label: "Flights" },
  { id: "hotels", label: "Hotels" },
  { id: "cars", label: "Cars" },
  { id: "visa", label: "Visa" },
] as const;

/** Hotel city to pre-select when a destination card is chosen. */
export const destinationHotelCity: Record<string, string> = {
  "dest-maldives": "Malé",
  "dest-hunza": "Hunza",
};
