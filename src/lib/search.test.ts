import { describe, expect, it } from "vitest";
import { cars } from "@/data/cars";
import { flights } from "@/data/flights";
import { hotels } from "@/data/hotels";
import { visas } from "@/data/visas";
import { formatPKR, pluralise } from "@/lib/format";
import {
  filterCars,
  filterFlights,
  filterHotels,
  filterVisas,
} from "@/lib/search";

describe("filterFlights", () => {
  it("returns only flights on the exact route", () => {
    const result = filterFlights(flights, { from: "Karachi", to: "Dubai" });

    expect(result.length).toBeGreaterThanOrEqual(2);
    expect(result.every((f) => f.from === "Karachi" && f.to === "Dubai")).toBe(
      true,
    );
  });

  it("matches case-insensitively and ignores surrounding whitespace", () => {
    const result = filterFlights(flights, {
      from: "  kArAcHi ",
      to: "DUBAI",
    });

    expect(result).toEqual(
      filterFlights(flights, { from: "Karachi", to: "Dubai" }),
    );
    expect(result.length).toBeGreaterThan(0);
  });

  it("treats an empty query as no filter", () => {
    expect(filterFlights(flights, {})).toHaveLength(flights.length);
    expect(
      filterFlights(flights, { from: "", to: "", cabin: "Any" }),
    ).toHaveLength(flights.length);
  });

  it("returns an empty array when no flight matches", () => {
    expect(filterFlights(flights, { from: "Skardu", to: "London" })).toEqual(
      [],
    );
  });

  it("narrows by cabin", () => {
    const business = filterFlights(flights, {
      from: "Karachi",
      to: "Dubai",
      cabin: "Business",
    });

    expect(business).toHaveLength(1);
    expect(business[0].cabin).toBe("Business");
  });
});

describe("filterHotels", () => {
  it("matches by city", () => {
    const result = filterHotels(hotels, { city: "malé" });

    expect(result.length).toBeGreaterThan(0);
    expect(result.every((h) => h.city === "Malé")).toBe(true);
  });
});

describe("filterCars", () => {
  it("returns every car when the type is 'Any'", () => {
    expect(filterCars(cars, { type: "Any" })).toHaveLength(cars.length);
  });

  it("returns only cars of the requested type", () => {
    const suvs = filterCars(cars, { type: "SUV" });

    expect(suvs.length).toBeGreaterThan(0);
    expect(suvs.every((c) => c.type === "SUV")).toBe(true);
  });
});

describe("filterVisas", () => {
  it("combines country and visa type", () => {
    const result = filterVisas(visas, { country: "uae", type: "Business" });

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({ country: "UAE", type: "Business" });
  });
});

describe("purity", () => {
  it("does not mutate the input array", () => {
    const input = [...flights];
    const snapshot = structuredClone(input);

    filterFlights(input, { from: "Karachi", cabin: "Economy" });

    expect(input).toEqual(snapshot);
  });
});

describe("format helpers", () => {
  it("formats rupees with a PKR prefix and thousands separators", () => {
    expect(formatPKR(145000)).toBe("PKR 145,000");
    expect(formatPKR(8500)).toBe("PKR 8,500");
  });

  it("pluralises regular words by count", () => {
    expect(pluralise(1, "night")).toBe("1 night");
    expect(pluralise(3, "night")).toBe("3 nights");
    expect(pluralise(0, "guest")).toBe("0 guests");
  });
});
