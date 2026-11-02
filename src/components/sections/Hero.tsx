"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { unsplash } from "@/data/images";
import { gsap, MOTION_OK, SplitText, TABLET_UP, useGSAP } from "@/lib/gsap";

const CLEAR = "transform,opacity,visibility";

/**
 * The hero and the booking card that overlaps its bottom edge. The card is
 * passed in as children so the whole opening sequence shares one scope.
 */
export function Hero({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const pick = (name: string) =>
        root.querySelector<HTMLElement>(`[data-hero="${name}"]`);
      const section = root.querySelector<HTMLElement>("#home");
      const bg = pick("bg");
      const image = bg?.querySelector("img");
      const [eyebrow, title, sub, card, cue] = [
        "eyebrow",
        "title",
        "sub",
        "card",
        "cue",
      ].map(pick);
      if (!section || !bg || !image) return;
      if (!eyebrow || !title || !sub || !card || !cue) return;

      const mm = gsap.matchMedia();

      // Signature intro: bg settles, then the headline rises line by line
      // out of its mask, followed by the supporting pieces.
      mm.add(MOTION_OK, (_context, contextSafe) => {
        let cancelled = false;

        gsap.set([eyebrow, sub, cue], { autoAlpha: 0, y: 24 });
        gsap.set(card, { autoAlpha: 0, y: 56 });
        gsap.set(title, { autoAlpha: 0 });
        gsap.fromTo(
          image,
          { scale: 1.15 },
          { scale: 1, duration: 1.8, ease: "power2.out" },
        );

        // Split only once fonts are loaded, or the lines would re-break.
        const start = contextSafe!(() => {
          if (cancelled) return;
          gsap.set(title, { autoAlpha: 1 });
          let built = false;
          SplitText.create(title, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            onSplit: (self) => {
              if (built) return;
              built = true;
              gsap
                .timeline({ defaults: { ease: "power3.out" } })
                .to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.2)
                .from(
                  self.lines,
                  { yPercent: 110, duration: 1.1, stagger: 0.12 },
                  0.35,
                )
                .to(sub, { autoAlpha: 1, y: 0, duration: 0.9 }, ">-0.6")
                .to(
                  card,
                  { autoAlpha: 1, y: 0, duration: 1, clearProps: CLEAR },
                  ">-0.55",
                )
                .to(cue, { autoAlpha: 1, y: 0, duration: 0.8 }, ">-0.3");
            },
          });
        });
        void document.fonts.ready.then(() => start());

        return () => {
          cancelled = true;
        };
      });

      // Parallax: the photo drifts slower than the page as the hero leaves.
      mm.add(TABLET_UP, () => {
        gsap.to(bg, {
          yPercent: 14,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    },
    { scope },
  );

  return (
    <div ref={scope}>
      <section
        id="home"
        className="relative flex min-h-[100svh] items-end overflow-hidden bg-gradient-to-br from-ink via-teal-dark to-teal pt-32 pb-32 md:pb-40"
      >
        <div data-hero="bg" className="absolute inset-0">
          <Image
            src={unsplash("1573843981267-be1999ff37cd")}
            alt="Aerial view of overwater villas and a long jetty on a turquoise Maldivian lagoon"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/55 via-transparent to-transparent" />
        </div>

        <Container className="relative">
          <p data-hero="eyebrow" className="eyebrow text-gold">
            ✦ Rated 4.9 by 12,000+ travellers
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
