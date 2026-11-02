import { Clock, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/sections/ContactForm";
import { site } from "@/data/site";

interface Detail {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}

const details: Detail[] = [
  { icon: MapPin, label: "Visit us", value: site.address },
  { icon: Phone, label: "Call us", value: site.phone, href: site.phoneHref },
  {
    icon: Mail,
    label: "Write to us",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  { icon: Clock, label: "We're in", value: site.hours },
];

export function ContactSection() {
  return (
    <section
      id="contact"
      className="bg-sand py-24 md:py-32"
      aria-labelledby="contact-title"
    >
      <Container className="grid gap-12 lg:grid-cols-5 lg:gap-16">
        <div data-reveal className="lg:col-span-2">
          <p className="eyebrow text-teal">Chapter 06 — The Departure</p>
          <h2 id="contact-title" className="mt-3 text-section">
            Let&rsquo;s talk about your trip.
          </h2>
          <p className="mt-4 text-lg">
            Tell us a little, or a lot. A real person reads every note and
            replies within one working day.
          </p>

          <ul className="mt-10 space-y-6">
            {details.map(({ icon: Icon, label, value, href }) => (
              <li key={label} className="flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white text-teal shadow-soft">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-bold tracking-wide text-ink/70 uppercase">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className="font-medium text-ink transition-colors hover:text-teal"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="font-medium text-ink">{value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal className="lg:col-span-3">
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
