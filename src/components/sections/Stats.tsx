"use client";

import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { stats } from "@/data/story";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { formatNumber } from "@/lib/format";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";

export function Stats() {
  const scope = useRef<HTMLElement>(null);
  useScrollReveal(scope);

  // Each figure counts up from 0 once, when it comes into view. The markup
  // already holds the final value, so nothing depends on this running.
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>("[data-count]", root).forEach((el) => {
          const target = Number(el.dataset.count);
          const decimals = Number(el.dataset.decimals ?? 0);
          const counter = { value: 0 };
          const render = () => {
            el.textContent = formatNumber(counter.value, decimals);
          };

          render();
          ScrollTrigger.create({
            trigger: el,
            start: "top 82%",
            once: true,
            onEnter: () =>
              gsap.to(counter, {
                value: target,
                duration: 2,
                ease: "power2.out",
                snap: { value: 10 ** -decimals },
                onUpdate: render,
              }),
          });
        });
      });
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      id="proof"
      aria-labelledby="stats-title"
      className="bg-ink py-24 md:py-28"
    >
      <Container>
        <div className="text-center">
          <Eyebrow tone="gold">Chapter 05 — The Proof</Eyebrow>
          <h2 id="stats-title" className="mt-3 text-section text-white">
            Numbers we&rsquo;re proud of — and still counting.
          </h2>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              data-reveal
              className="flex flex-col-reverse text-center"
            >
              <dt className="mt-2 text-sm font-semibold tracking-wide text-on-dark uppercase">
                {stat.label}
              </dt>
              <dd className="font-display text-5xl font-semibold text-white md:text-6xl">
                <span data-count={stat.value} data-decimals={stat.decimals}>
                  {formatNumber(stat.value, stat.decimals)}
                </span>
                <span className="text-gold">{stat.suffix}</span>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
