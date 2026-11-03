import Image from "next/image";
import { ArrowRight, Check, type LucideIcon } from "lucide-react";
import { formatPKR } from "@/lib/format";
import type { ServiceOffer } from "@/data/services";

interface ServiceCardProps {
  service: ServiceOffer;
  icon: LucideIcon;
  fromPrice: number;
  priceUnit: string;
  onExplore: () => void;
}

export function ServiceCard({
  service,
  icon: Icon,
  fromPrice,
  priceUnit,
  onExplore,
}: ServiceCardProps) {
  return (
    // The article is animated by GSAP (which writes an inline `translate: none`),
    // so the hover lift lives on the inner card where CSS can still move it.
    <article data-reveal className="group flex">
      <div className="flex w-full flex-col overflow-hidden rounded-3xl bg-white shadow-soft transition-[translate,box-shadow] duration-300 contain-card hover:-translate-y-1.5 hover:shadow-lift">
        <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-teal-dark to-ink">
          <Image
            src={service.image}
            alt={service.alt}
            fill
            quality={72}
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>

        <div className="flex flex-1 flex-col px-6 pb-6">
          <span className="relative z-10 -mt-7 grid size-14 place-items-center rounded-2xl bg-teal text-white shadow-soft">
            <Icon className="size-7" aria-hidden="true" />
          </span>
          <h3 className="mt-4 line-clamp-2 text-2xl font-semibold">
            {service.title}
          </h3>
          <p className="mt-2">{service.description}</p>

          <ul className="mt-5 space-y-2 text-sm">
            {service.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2">
                <Check
                  className="mt-0.5 size-4 shrink-0 text-teal"
                  aria-hidden="true"
                />
                {bullet}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex items-center justify-between gap-3 border-t border-ink/10 pt-5">
            <p className="text-sm">
              from{" "}
              <span className="font-display text-lg font-semibold text-teal-dark">
                {formatPKR(fromPrice)}
              </span>{" "}
              {priceUnit}
            </p>
            <button
              type="button"
              onClick={onExplore}
              aria-label={`Explore ${service.title}`}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-2 text-sm font-bold text-teal transition-colors hover:text-teal-dark"
            >
              Explore
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
