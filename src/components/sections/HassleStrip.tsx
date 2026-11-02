import { RevealScope } from "@/components/motion/RevealScope";
import { Container } from "@/components/ui/Container";
import { marqueePlaces } from "@/data/story";

function PlaceList({ hidden }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden}
      className="flex shrink-0 items-center gap-8 pr-8 font-display text-5xl text-ink/30 uppercase md:text-7xl"
    >
      {marqueePlaces.map((place) => (
        <li key={place} className="flex items-center gap-8 whitespace-nowrap">
          {place}
          <span aria-hidden="true" className="text-gold/60">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );
}

export function HassleStrip() {
  return (
    <section
      aria-labelledby="hassle-title"
      className="overflow-hidden bg-white py-24 md:py-32"
    >
      <RevealScope>
        <Container className="text-center">
          <p data-reveal className="eyebrow text-teal">
            Chapter 02 — The Hassle
          </p>
          <h2
            id="hassle-title"
            data-reveal
            className="mx-auto mt-4 max-w-3xl text-section italic"
          >
            Planning a trip shouldn&rsquo;t feel like a second job.
          </h2>
          <p data-reveal className="mx-auto mt-5 max-w-xl text-lg">
            Visas, fares, hotels, drivers — the hundred small things that stand
            between you and the airport.
          </p>
        </Container>

        <div className="group mt-16 flex w-max animate-marquee hover:[animation-play-state:paused]">
          <PlaceList />
          <PlaceList hidden />
        </div>
      </RevealScope>
    </section>
  );
}
