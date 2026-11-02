import type {
  Car,
  CarQuery,
  Flight,
  FlightQuery,
  Hotel,
  HotelQuery,
  VisaPackage,
  VisaQuery,
} from "@/types";

const ANY = "any";

function normalise(value: string): string {
  return value.trim().toLowerCase();
}

/** True when the criterion is absent, blank or "Any", i.e. it should not filter. */
function isUnset(criterion: string | undefined): criterion is undefined {
  return criterion === undefined || ["", ANY].includes(normalise(criterion));
}

function matches(value: string, criterion: string | undefined): boolean {
  return isUnset(criterion) || normalise(value) === normalise(criterion);
}

export function filterFlights(
  flights: readonly Flight[],
  query: FlightQuery,
): Flight[] {
  return flights.filter(
    (flight) =>
      matches(flight.from, query.from) &&
      matches(flight.to, query.to) &&
      matches(flight.cabin, query.cabin),
  );
}

export function filterHotels(
  hotels: readonly Hotel[],
  query: HotelQuery,
): Hotel[] {
  return hotels.filter((hotel) => matches(hotel.city, query.city));
}

export function filterCars(cars: readonly Car[], query: CarQuery): Car[] {
  return cars.filter((car) => matches(car.type, query.type));
}

export function filterVisas(
  visas: readonly VisaPackage[],
  query: VisaQuery,
): VisaPackage[] {
  return visas.filter(
    (visa) =>
      matches(visa.country, query.country) && matches(visa.type, query.type),
  );
}
