"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useStartBooking } from "@/hooks/useStartBooking";

export function CtaBanner() {
  const startBooking = useStartBooking();
  const scope = useRef<HTMLElement>(null);
  useScrollReveal(scope);

  return (
    <section
      ref={scope}
      aria-labelledby="cta-title"
      className="bg-gradient-to-br from-teal-dark via-teal to-teal-dark py-24 md:py-28"
    >
      <Container className="text-center">
        <p data-reveal className="eyebrow text-gold">
          Chapter 06 — The Departure
        </p>
        <h2 id="cta-title" data-reveal className="mt-3 text-section text-white">
          Your story starts here.
        </h2>
        <p data-reveal className="mx-auto mt-4 max-w-xl text-lg text-on-dark">
          Two minutes to tell us the dream. We&rsquo;ll take care of the rest.
        </p>
        <div data-reveal className="mt-10">
          <Button
            variant="light"
            size="lg"
            onClick={() => startBooking({ tab: "flights" })}
          >
            Plan my trip
          </Button>
        </div>
      </Container>
    </section>
  );
}
