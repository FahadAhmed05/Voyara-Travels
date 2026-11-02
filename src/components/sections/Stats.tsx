import { Container } from "@/components/ui/Container";
import { stats } from "@/data/story";

export function Stats() {
  return (
    <section aria-labelledby="stats-title" className="bg-ink py-24 md:py-28">
      <Container>
        <div className="text-center">
          <p data-reveal className="eyebrow text-gold">
            Chapter 05 — The Proof
          </p>
          <h2
            id="stats-title"
            data-reveal
            className="mt-3 text-section text-white"
          >
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
                  {stat.value.toLocaleString("en-PK", {
                    minimumFractionDigits: stat.decimals,
                    maximumFractionDigits: stat.decimals,
                  })}
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
