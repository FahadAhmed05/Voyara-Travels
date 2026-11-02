import type { FooterLink, NavLink, SocialLink } from "@/types";

export const site = {
  name: "Voyara",
  tagline: "Your journey, planned with care.",
  phone: "+92 300 1234567",
  phoneHref: "tel:+923001234567",
  email: "hello@voyara.travel",
  copyrightYear: 2026,
  address: "Office 8, Zamzama Boulevard, DHA Phase 5, Karachi, Pakistan",
  hours: "Mon–Sat, 9am – 7pm (PKT)",
} as const;

export const navLinks: readonly NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Destinations", href: "#destinations" },
  { label: "Stories", href: "#stories" },
  { label: "Contact", href: "#contact" },
];

export const footerServices: readonly FooterLink[] = [
  { label: "Visa Services", href: "#services" },
  { label: "Flight Tickets", href: "#services" },
  { label: "Hotel Booking", href: "#services" },
  { label: "Car Rental", href: "#services" },
];

export const footerDestinations: readonly FooterLink[] = [
  { label: "Dubai", href: "#destinations" },
  { label: "Istanbul", href: "#destinations" },
  { label: "Kuala Lumpur", href: "#destinations" },
  { label: "London", href: "#destinations" },
];

export const socialLinks: readonly SocialLink[] = [
  {
    platform: "facebook",
    label: "Voyara on Facebook",
    href: "https://facebook.com",
  },
  {
    platform: "instagram",
    label: "Voyara on Instagram",
    href: "https://instagram.com",
  },
  {
    platform: "youtube",
    label: "Voyara on YouTube",
    href: "https://youtube.com",
  },
  {
    platform: "linkedin",
    label: "Voyara on LinkedIn",
    href: "https://linkedin.com",
  },
];
