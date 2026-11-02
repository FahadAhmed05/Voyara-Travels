import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { planSteps } from "@/data/story";

export function ThePlan() {
  return (
    <section
      id="plan"
      className="bg-sand py-24 md:py-32"
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
                <span
                  aria-hidden="true"
                  className="relative mx-auto block w-fit bg-sand px-4 font-display text-6xl leading-none font-semibold text-gold md:text-7xl"
                >
                  {step.number}
                </span>
                <h3 className="mt-6 text-2xl font-semibold">{step.title}</h3>
                <p className="mx-auto mt-3 max-w-xs">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
