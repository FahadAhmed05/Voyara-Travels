import { Compass, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { NewsletterForm } from "@/components/layout/NewsletterForm";
import {
  footerDestinations,
  footerServices,
  site,
  socialLinks,
} from "@/data/site";
import type { FooterLink } from "@/types";

const columnTitle =
  "font-sans text-sm font-bold tracking-[0.12em] text-white uppercase";

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: readonly FooterLink[];
}) {
  return (
    <div>
      <h2 className={columnTitle}>{title}</h2>
      <ul className="mt-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="inline-flex min-h-11 min-w-11 items-center transition-colors hover:text-gold"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink text-on-dark">
      <Container className="grid gap-12 py-20 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <a href="#home" className="flex min-h-11 items-center gap-2.5">
            <span className="grid size-10 place-items-center rounded-xl bg-teal text-white">
              <Compass className="size-6" aria-hidden="true" />
            </span>
            <span className="font-display text-2xl font-semibold text-white">
              {site.name}
            </span>
          </a>
          <p className="mt-5 max-w-xs">
            {site.tagline} Visas, flights, hotels and cars, handled by people
            who care about your trip.
          </p>
          <ul className="mt-6 flex gap-3">
            {socialLinks.map((social) => (
              <li key={social.platform}>
                <a
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-teal"
                >
                  <SocialIcon platform={social.platform} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <LinkColumn title="Services" links={footerServices} />
        <LinkColumn title="Destinations" links={footerDestinations} />

        <div>
          <h2 className={columnTitle}>Newsletter</h2>
          <p className="mt-5 mb-4">
            Travel notes and quiet fare drops, once a month. Never spam.
          </p>
          <NewsletterForm />
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-4 py-6 text-sm md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {site.copyrightYear} {site.name} Travels. All rights
            reserved.
          </p>
          <ul className="flex flex-col gap-2 sm:flex-row sm:gap-6">
            <li className="inline-flex items-center gap-2">
              <Phone className="size-4 text-gold" aria-hidden="true" />
              <a
                href={site.phoneHref}
                className="inline-flex min-h-11 items-center"
              >
                {site.phone}
              </a>
            </li>
            <li className="inline-flex items-center gap-2">
              <Mail className="size-4 text-gold" aria-hidden="true" />
              <a
                href={`mailto:${site.email}`}
                className="inline-flex min-h-11 items-center"
              >
                {site.email}
              </a>
            </li>
            <li className="inline-flex items-center gap-2">
              <MapPin className="size-4 text-gold" aria-hidden="true" />
              {site.address}
            </li>
          </ul>
        </Container>
      </div>
    </footer>
  );
}
