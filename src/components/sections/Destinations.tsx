"use client";

import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DestinationCard } from "@/components/sections/DestinationCard";
import { destinationHotelCity } from "@/data/booking-options";
import { destinations } from "@/data/destinations";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useStartBooking } from "@/hooks/useStartBooking";
import { gsap, MOTION_OK, ScrollTrigger, TABLET_UP, useGSAP } from "@/lib/gsap";

const WIDE = {
  className: "lg:col-span-2 aspect-[4/3] lg:aspect-[16/10]",
  sizes:
    "(min-width: 1280px) 640px, (min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw",
};
const NARROW = {
  className: "aspect-[4/5]",
  sizes:
    "(min-width: 1280px) 320px, (min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
};

/** Editorial rhythm on a 4-column grid: wide, narrow, narrow / narrow, wide, narrow. */
const layout = [WIDE, NARROW, NARROW, NARROW, WIDE, NARROW];

export function Destinations() {
  const startBooking = useStartBooking();
  const scope = useRef<HTMLElement>(null);
  useScrollReveal(scope);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const mm = gsap.matchMedia();

      // Masked reveal: each photo settles inside its overflow-hidden frame
      // as its card arrives.
      mm.add(MOTION_OK, () => {
        gsap.utils
          .toArray<HTMLElement>("[data-image-mask]", root)
          .forEach((mask) => {
            const image = mask.querySelector("img");
            if (!image) return;
            gsap.set(image, { yPercent: 12, scale: 1.15 });
            ScrollTrigger.create({
              trigger: mask,
              start: "top 88%",
              once: true,
              onEnter: () =>
                gsap.to(image, {
                  yPercent: 0,
                  scale: 1,
                  duration: 1.2,
                  ease: "power3.out",
                  clearProps: "transform",
                }),
            });
          });
      });

      // One feature image drifts inside its frame while the page scrolls.
      mm.add(TABLET_UP, () => {
        const drift = root.querySelector<HTMLElement>("[data-parallax]");
        if (!drift?.parentElement) return;
        gsap.fromTo(
          drift,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: drift.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    },
    { scope },
  );

  return (
    <section
      ref={scope}
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
              className={layout[index % layout.length].className}
              sizes={layout[index % layout.length].sizes}
              parallax={index === 0}
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
