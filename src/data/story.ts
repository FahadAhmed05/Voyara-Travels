export const marqueePlaces = [
  "Dubai",
  "Istanbul",
  "Maldives",
  "Baku",
  "Kuala Lumpur",
  "Hunza",
  "London",
  "Doha",
] as const;

export interface PlanStep {
  number: string;
  title: string;
  description: string;
}

export const planSteps: PlanStep[] = [
  {
    number: "01",
    title: "Tell us the dream",
    description:
      "One call or one short form — about two minutes. Where, when and who's coming is all we need to begin.",
  },
  {
    number: "02",
    title: "We arrange every detail",
    description:
      "Visa, flights, stays and cars, lined up and checked twice, so nothing is left to chance.",
  },
  {
    number: "03",
    title: "You just go",
    description:
      "Your documents and driver details land on your phone before you leave. All that's left is to pack.",
  },
];

export interface Stat {
  value: number;
  suffix: string;
  decimals: number;
  label: string;
}

export const stats: Stat[] = [
  { value: 12000, suffix: "+", decimals: 0, label: "Happy Travellers" },
  { value: 40, suffix: "+", decimals: 0, label: "Destinations" },
  { value: 15, suffix: "", decimals: 0, label: "Years of Service" },
  { value: 4.9, suffix: "", decimals: 1, label: "Average Rating" },
];
