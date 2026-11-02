"use client";

import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { planSteps } from "@/data/story";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { DESKTOP, gsap, useGSAP } from "@/lib/gsap";

const DONE_OPACITY = 0.6;
const UPCOMING_OPACITY = 0.35;

export function ThePlan() {
  const scope = useRef<HTMLElement>(null);
  useScrollReveal(scope);

  // Desktop only: the section pins while a scrubbed timeline lights each step
  // in turn and draws the progress line. Everywhere else (and under reduced
  // motion) the steps are plain content that reveals like any other section.
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const mm = gsap.matchMedia();

      mm.add(DESKTOP, () => {
        const steps = gsap.utils.toArray<HTMLElement>("[data-plan-step]", root);
        const progress = root.querySelector<HTMLElement>(
          "[data-plan-progress]",
        );
        if (steps.length === 0 || !progress) return;

        gsap.set(steps.slice(1), { opacity: UPCOMING_OPACITY, y: 16 });
        gsap.set(progress, { scaleX: 0 });

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "+=120%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            // Pins measure first so triggers created earlier still see the spacer.
            refreshPriority: 1,
          },
        });

        // The line spans the first to last step, so it reaches each step's
        // centre at 0, 1/2 and 1 of its length.
        const span = steps.length - 1;
        timeline.to(progress, { scaleX: 1, duration: span * 1.5 }, 0);
        steps.forEach((step, index) => {
          if (index === 0) return;
          const at = index * 1.5 - 0.2;
          timeline
            .to(steps[index - 1], { opacity: DONE_OPACITY, duration: 0.4 }, at)
            .to(step, { opacity: 1, y: 0, duration: 0.4 }, at);
        });
        timeline.to({}, { duration: 0.6 }, span * 1.5);
      });
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      id="plan"
      className="bg-sand py-24 md:py-32 lg:flex lg:min-h-screen lg:items-center"
      aria-labelledby="plan-title"
    >
      <Container>
        <SectionHeading
          eyebrow="Chapter 04 — The Plan"
          title="Three steps. That's all it takes."
          titleId="plan-title"
        />

        <div className="relative mt-16 md:mt-20">
          <div
            aria-hidden="true"
            className="absolute top-8 right-[16.6%] left-[16.6%] hidden h-px bg-ink/10 md:block"
          >
            <div data-plan-progress className="h-full origin-left bg-gold" />
          </div>

          <ol className="grid gap-12 md:grid-cols-3 md:gap-8">
            {planSteps.map((step) => (
              <li
                key={step.number}
                data-plan-step
                className="relative text-center"
              >
                <div data-reveal>
                  <span
                    aria-hidden="true"
                    className="relative mx-auto block w-fit bg-sand px-4 font-display text-6xl leading-none font-semibold text-teal-dark md:text-7xl"
                  >
                    {step.number}
                  </span>
                  <h3 className="mt-6 text-2xl font-semibold">{step.title}</h3>
                  <p className="mx-auto mt-3 max-w-xs">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
