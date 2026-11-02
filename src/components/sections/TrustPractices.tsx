import {
  BadgeCheck,
  Building2,
  ShieldCheck,
  Stamp,
  type LucideIcon,
} from "lucide-react";
import { RevealScope } from "@/components/motion/RevealScope";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/data/site";
import { trustCredentials, trustPractices } from "@/data/trust";

const icons: Record<(typeof trustPractices)[number]["id"], LucideIcon> = {
  price: BadgeCheck,
  visa: Stamp,
  channels: ShieldCheck,
  people: Building2,
};

export function TrustPractices() {
  return (
    <section
      id="trust"
      aria-labelledby="trust-title"
      className="relative -mt-10 rounded-t-[2.5rem] bg-sand py-24 md:py-32"
    >
      <RevealScope exit>
        <Container>
          <SectionHeading
            eyebrow="Chapter 05 — Proof you can check"
            title="Trust is something you verify."
            titleId="trust-title"
            description="Visa fraud is real, and the FIA urges everyone to check an agent before paying. Here is how we make that easy."
          />

          <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trustPractices.map((practice) => {
              const Icon = icons[practice.id];
              return (
                <li
                  key={practice.id}
                  data-reveal
                  className="rounded-3xl bg-white p-7 shadow-soft"
                >
                  <span className="grid size-12 place-items-center rounded-2xl bg-mist text-teal">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold">
                    {practice.title}
                  </h3>
                  <p className="mt-2 text-sm">{practice.description}</p>
                </li>
              );
            })}
          </ul>

          <p
            data-reveal
            className="mx-auto mt-10 max-w-2xl text-center text-sm"
          >
            {trustCredentials.length > 0
              ? trustCredentials
                  .map(({ label, value }) => `${label} — ${value}`)
                  .join(" · ")
              : "Ask for our registration details before you pay — we share them gladly."}{" "}
            Visit us at {site.address}, or call{" "}
            <a
              href={site.phoneHref}
              className="font-semibold text-teal-dark underline-offset-4 hover:underline"
            >
              {site.phone}
            </a>
            .
          </p>
        </Container>
      </RevealScope>
    </section>
  );
}
