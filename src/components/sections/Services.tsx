"use client";

import {
  BedDouble,
  CarFront,
  Plane,
  Stamp,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { cars } from "@/data/cars";
import { flights } from "@/data/flights";
import { hotels } from "@/data/hotels";
import { services } from "@/data/services";
import { visas } from "@/data/visas";
import { useStartBooking } from "@/hooks/useStartBooking";
import type { TabId } from "@/types";

const icons: Record<TabId, LucideIcon> = {
  visa: Stamp,
  flights: Plane,
  hotels: BedDouble,
  cars: CarFront,
};

const cheapest = (prices: number[]) => Math.min(...prices);

const pricing: Record<TabId, { from: number; unit: string }> = {
  visa: { from: cheapest(visas.map((v) => v.fee)), unit: "per application" },
  flights: {
    from: cheapest(flights.map((f) => f.pricePerPerson)),
    unit: "per person",
  },
  hotels: {
    from: cheapest(hotels.map((h) => h.pricePerNight)),
    unit: "per night",
  },
  cars: { from: cheapest(cars.map((c) => c.pricePerDay)), unit: "per day" },
};

export function Services() {
  const startBooking = useStartBooking();

  return (
    <section
      id="services"
      className="bg-sand py-24 md:py-32"
      aria-labelledby="services-title"
    >
      <Container>
        <SectionHeading
          eyebrow="Chapter 03 — The Guide"
          title="Everything handled, end to end."
          titleId="services-title"
          description="Four ways we take the hassle off your shoulders — so the only thing left to decide is where to go."
        />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              icon={icons[service.id]}
              fromPrice={pricing[service.id].from}
              priceUnit={pricing[service.id].unit}
              onExplore={() => startBooking({ tab: service.id })}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
