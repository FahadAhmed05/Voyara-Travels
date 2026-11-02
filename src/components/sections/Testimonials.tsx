import { RevealScope } from "@/components/motion/RevealScope";
import { Container } from "@/components/ui/Container";
import { RatingStars } from "@/components/ui/RatingStars";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types";

const avatarColours = ["bg-teal", "bg-ink", "bg-teal-dark"];

function Traveller({
  testimonial,
  index,
  dark,
}: {
  testimonial: Testimonial;
  index: number;
  dark?: boolean;
}) {
  return (
    <figcaption className="mt-6 flex items-center gap-4">
      <span
        aria-hidden="true"
        className={cn(
          "grid size-12 shrink-0 place-items-center rounded-full text-sm font-bold text-white",
          avatarColours[index % avatarColours.length],
        )}
      >
        {testimonial.initials}
      </span>
      <div>
        <p className={cn("font-bold", dark ? "text-white" : "text-ink")}>
          {testimonial.name}
        </p>
        <p className={cn("text-sm", dark && "text-on-dark")}>
          {testimonial.trip}
        </p>
      </div>
      <RatingStars rating={testimonial.rating} className="ml-auto" />
    </figcaption>
  );
}

export function Testimonials() {
  const [featured, ...others] = testimonials;

  return (
    <section
      id="stories"
      className="relative -mt-10 rounded-t-[2.5rem] bg-white py-24 md:py-32"
      aria-labelledby="stories-title"
    >
      <RevealScope exit>
        <Container>
          <SectionHeading
            eyebrow="Chapter 05 — Their Stories"
            title="Travellers who simply went."
            titleId="stories-title"
            description="Real trips, in their own words — the small details are the point."
          />

          <div className="mt-16 grid gap-6 lg:grid-cols-5">
            <figure
              data-reveal
              className="rounded-3xl bg-ink p-8 shadow-lift md:p-12 lg:col-span-3"
            >
              <blockquote
                data-split
                className="font-display text-2xl leading-snug text-white italic md:text-3xl"
              >
                &ldquo;{featured.quote}&rdquo;
              </blockquote>
              <Traveller testimonial={featured} index={0} dark />
            </figure>

            <div className="grid gap-6 lg:col-span-2">
              {others.map((testimonial, index) => (
                <figure
                  key={testimonial.id}
                  data-reveal
                  className="rounded-3xl bg-sand p-6 shadow-soft md:p-8"
                >
                  <blockquote>&ldquo;{testimonial.quote}&rdquo;</blockquote>
                  <Traveller testimonial={testimonial} index={index + 1} />
                </figure>
              ))}
            </div>
          </div>
        </Container>
      </RevealScope>
    </section>
  );
}
