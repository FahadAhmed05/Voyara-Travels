"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DestinationCard } from "@/components/sections/DestinationCard";
import { destinationHotelCity } from "@/data/booking-options";
import { destinations } from "@/data/destinations";
import { useStartBooking } from "@/hooks/useStartBooking";

/** Editorial rhythm on a 4-column grid: wide, narrow, narrow / narrow, wide, narrow. */
const layout = [
  "lg:col-span-2 aspect-[4/3] lg:aspect-[16/10]",
  "aspect-[4/5]",
  "aspect-[4/5]",
  "aspect-[4/5]",
  "lg:col-span-2 aspect-[4/3] lg:aspect-[16/10]",
  "aspect-[4/5]",
];

export function Destinations() {
  const startBooking = useStartBooking();

  return (
    <section
      id="destinations"
      className="bg-white py-24 md:py-32"
      aria-labelledby="destinations-title"
    >
      <Container>
        <SectionHeading
          eyebrow="The Dream, continued"
          title="Where will your story begin?"
          titleId="destinations-title"
          description="Six places our travellers keep coming back to. Pick one and we'll start with the stay."
        />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((destination, index) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              className={layout[index % layout.length]}
              onSelect={() =>
                startBooking({
                  tab: "hotels",
                  destination:
                    destinationHotelCity[destination.id] ?? destination.name,
                })
              }
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
