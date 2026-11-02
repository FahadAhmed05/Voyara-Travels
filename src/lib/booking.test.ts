import { describe, expect, it } from "vitest";
import { visas } from "@/data/visas";
import {
  applyProcessing,
  createDefaultForms,
  resultsHeading,
  runSearch,
  validateForm,
} from "@/lib/booking";

const forms = createDefaultForms("2026-11-02");

describe("createDefaultForms", () => {
  it("defaults flight dates to today + 7 and today + 14", () => {
    expect(forms.flights.depart).toBe("2026-11-09");
    expect(forms.flights.returnDate).toBe("2026-11-16");
  });

  it("leaves dates blank until the client date is known", () => {
    expect(createDefaultForms("").flights.depart).toBe("");
  });
});

describe("validateForm", () => {
  it("accepts the defaults on every tab", () => {
    for (const tab of ["flights", "hotels", "cars", "visa"] as const) {
      expect(validateForm(tab, forms)).toEqual([]);
    }
  });

  it("flags identical departure and arrival cities", () => {
    const issues = validateForm("flights", {
      ...forms,
      flights: { ...forms.flights, from: "Dubai", to: "Dubai" },
    });

    expect(issues).toHaveLength(1);
    expect(issues[0].field).toBe("route");
  });

  it("flags a return date before departure only for round trips", () => {
    const early = { ...forms.flights, returnDate: "2026-11-01" };

    expect(validateForm("flights", { ...forms, flights: early })).toHaveLength(
      1,
    );
    expect(
      validateForm("flights", {
        ...forms,
        flights: { ...early, trip: "one-way" },
      }),
    ).toEqual([]);
  });

  it("requires check-out after check-in and drop-off not before pickup", () => {
    const sameDay = { ...forms.hotels, checkOut: forms.hotels.checkIn };
    expect(validateForm("hotels", { ...forms, hotels: sameDay })).toHaveLength(
      1,
    );

    const sameDayCar = { ...forms.cars, dropoffDate: forms.cars.pickupDate };
    expect(validateForm("cars", { ...forms, cars: sameDayCar })).toEqual([]);
  });
});

describe("runSearch and resultsHeading", () => {
  it("finds Karachi → Dubai economy flights", () => {
    const outcome = runSearch("flights", forms);

    expect(outcome.items.length).toBe(2);
    expect(resultsHeading(outcome)).toBe("2 journeys found · Karachi → Dubai");
  });

  it("returns an empty outcome for a route without flights", () => {
    const outcome = runSearch("flights", {
      ...forms,
      flights: { ...forms.flights, from: "Lahore", to: "London" },
    });

    expect(outcome.items).toEqual([]);
  });

  it("labels hotel results with the destination name", () => {
    const outcome = runSearch("hotels", {
      ...forms,
      hotels: { ...forms.hotels, destination: "Malé" },
    });

    expect(resultsHeading(outcome)).toBe("2 stays in Maldives");
  });

  it("summarises visa results by country and type", () => {
    expect(resultsHeading(runSearch("visa", forms))).toBe("UAE — Tourist visa");
  });
});

describe("applyProcessing", () => {
  const uae = visas.find((v) => v.id === "visa-uae-tourist")!;

  it("keeps standard days and fee", () => {
    expect(applyProcessing(uae, "Standard")).toEqual({ days: 5, fee: 18500 });
  });

  it("halves the days (rounded up) and multiplies the fee by 1.5 for express", () => {
    expect(applyProcessing(uae, "Express")).toEqual({ days: 3, fee: 27750 });
  });
});
