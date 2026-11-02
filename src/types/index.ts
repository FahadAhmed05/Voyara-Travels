export interface NavLink {
  label: string;
  href: `#${string}`;
}

export interface FooterLink {
  label: string;
  href: string;
}

export type SocialPlatform = "facebook" | "instagram" | "youtube" | "linkedin";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
}

export type TabId = "flights" | "hotels" | "cars" | "visa";

export type Cabin = "Economy" | "Business";
export type CarType = "Economy" | "SUV" | "Luxury" | "Van";
export type Transmission = "Automatic" | "Manual";
export type VisaType = "Tourist" | "Business" | "Transit";

export interface Flight {
  id: string;
  airline: string;
  from: string;
  to: string;
  departTime: string;
  arriveTime: string;
  duration: string;
  stops: 0 | 1;
  pricePerPerson: number;
  cabin: Cabin;
}

export interface Hotel {
  id: string;
  name: string;
  city: string;
  stars: number;
  rating: number;
  reviews: number;
  pricePerNight: number;
  image: string;
  alt: string;
  amenities: string[];
  freeCancellation: boolean;
}

export interface Car {
  id: string;
  name: string;
  type: CarType;
  seats: number;
  transmission: Transmission;
  pricePerDay: number;
  image: string;
  alt: string;
  withDriverAvailable: boolean;
}

export interface VisaPackage {
  id: string;
  country: string;
  type: VisaType;
  processingDays: number;
  fee: number;
  successRate: number;
  requirements: string[];
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  rating: number;
  reviews: number;
  fromPrice: number;
  tag: string;
  image: string;
  alt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  initials: string;
  trip: string;
  quote: string;
  rating: number;
}

/** Empty, undefined or "Any" criteria mean "no filter". */
export interface FlightQuery {
  from?: string;
  to?: string;
  cabin?: Cabin | "Any";
}

export interface HotelQuery {
  city?: string;
}

export interface CarQuery {
  type?: CarType | "Any";
}

export interface VisaQuery {
  country?: string;
  type?: VisaType | "Any";
}
