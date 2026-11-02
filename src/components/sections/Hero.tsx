"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { unsplash } from "@/data/images";
import { useHeroIntro } from "@/hooks/useHeroIntro";

/**
 * The hero and the booking card that overlaps its bottom edge. The card is
 * passed in as children so the whole opening sequence shares one scope.
 */
export function Hero({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useHeroIntro(scope);

  return (
    <div ref={scope}>
      <section
        id="home"
        className="relative flex min-h-[100svh] items-end overflow-hidden bg-gradient-to-br from-ink via-teal-dark to-teal pt-32 pb-32 md:pb-40"
      >
        {/* Oversized so the scroll drift never exposes the edges. */}
        <div data-hero="bg" className="absolute inset-x-0 -top-[13%] h-[126%]">
          <Image
            src={unsplash("1573843981267-be1999ff37cd")}
            alt="Aerial view of overwater villas and a long jetty on a turquoise Maldivian lagoon"
            fill
            quality={72}
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/55 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/55 via-transparent to-transparent" />
        </div>

        {/* Where the page-wide Earth sits while the hero is on screen. */}
        <div
          data-earth-anchor="hero"
          className="pointer-events-none absolute top-[46%] right-[3%] z-0 aspect-square w-[min(44vw,560px)] -translate-y-1/2 max-md:hidden"
        />
        <p
          data-earth-hud
          className="pointer-events-none absolute right-[3%] bottom-36 z-10 w-[min(44vw,560px)] text-center text-[11px] font-bold tracking-[0.2em] text-on-dark uppercase max-md:hidden md:bottom-44"
        >
          Karachi → the world · pick a destination
        </p>

        <Container className="relative z-10">
          <p data-hero="eyebrow" className="eyebrow text-white">
            <span aria-hidden="true" className="text-gold">
              ✦
            </span>{" "}
            Rated 4.9 by 12,000+ travellers
          </p>
          <h1 data-hero="title" className="mt-5 max-w-3xl text-hero text-white">
            The world is waiting.{" "}
            <span className="block text-gold italic">Go beautifully.</span>
          </h1>
          <p
            data-hero="sub"
            className="mt-6 max-w-xl text-lg text-on-dark md:text-xl"
          >
            Tell us where your heart is pointing — we&rsquo;ll handle every
            visa, flight, hotel and mile between here and there.
          </p>
        </Container>

        <p
          data-hero="cue"
          className="absolute bottom-24 left-5 text-xs font-semibold tracking-wide text-on-dark/80 uppercase md:bottom-28 md:left-8"
        >
          Scroll — the journey continues <span aria-hidden="true">↓</span>
        </p>
      </section>

      {/* The booking card overlaps the hero's bottom edge. */}
      <div data-hero="card" className="relative z-10 -mt-16 md:-mt-20">
        {children}
      </div>
    </div>
  );
}
