import { unsplash } from "@/data/images";
import type { TabId } from "@/types";

export interface ServiceOffer {
  id: TabId;
  title: string;
  description: string;
  bullets: [string, string, string];
  image: string;
  alt: string;
}

export const services: ServiceOffer[] = [
  {
    id: "visa",
    title: "Visa Services",
    description:
      "40+ countries, document checklist done with you, express lane when you're in a hurry.",
    bullets: [
      "A checklist built around your passport",
      "Every application checked twice",
      "Express processing in half the days",
    ],
    image: unsplash("1488646953014-85cb44e25828"),
    alt: "Field notes, a paper map and a camera laid out while planning a trip",
  },
  {
    id: "flights",
    title: "Flight Tickets",
    description:
      "Domestic + international fares compared across airlines, group rates for families.",
    bullets: [
      "Fares compared across 6 airlines",
      "Economy and Business cabins",
      "Group rates when the whole family flies",
    ],
    image: unsplash("1436491865332-7a61a109cc05"),
    alt: "Aeroplane wing above soft clouds at sunrise",
  },
  {
    id: "hotels",
    title: "Hotel Booking",
    description:
      "Verified stays that look like their photos — many with free cancellation.",
    bullets: [
      "Photos checked against reality",
      "Free cancellation on many stays",
      "Pools, spas and beach access listed up front",
    ],
    image: unsplash("1540541338287-41700207dee6"),
    alt: "Resort pool with parasols above a deep blue sea",
  },
  {
    id: "cars",
    title: "Car Rental",
    description: "With or without a driver, airport pickup included.",
    bullets: [
      "Choose a driver or drive yourself",
      "Airport pickup included",
      "Economy cars to 12-seat vans",
    ],
    image: unsplash("1533473359331-0135ef1b58bf"),
    alt: "White SUV on a gravel road beside red rock cliffs",
  },
];
