import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { unsplash } from "@/data/images";

export function Hero() {
  return (
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
          <span className="line-mask block overflow-hidden pb-[0.12em]">
            <span data-hero="line" className="line block">
              The world is waiting.
            </span>
          </span>
          <span className="line-mask block overflow-hidden pb-[0.12em]">
            <span data-hero="line" className="line block text-gold italic">
              Go beautifully.
            </span>
          </span>
        </h1>
        <p
          data-hero="sub"
          className="mt-6 max-w-xl text-lg text-on-dark md:text-xl"
        >
          Tell us where your heart is pointing — we&rsquo;ll handle every visa,
          flight, hotel and mile between here and there.
        </p>
      </Container>

      <p className="absolute bottom-24 left-5 text-xs font-semibold tracking-wide text-on-dark/80 uppercase md:bottom-28 md:left-8">
        Scroll — the journey continues <span aria-hidden="true">↓</span>
      </p>
    </section>
  );
}
