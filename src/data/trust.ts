export interface TrustPractice {
  id: "price" | "visa" | "channels" | "people";
  title: string;
  description: string;
}

/**
 * Practices a traveller can check for themselves. They answer what research on
 * online travel trust keeps finding: clear total prices, honest expectations,
 * safe channels and a real, reachable business.
 */
export const trustPractices: TrustPractice[] = [
  {
    id: "price",
    title: "The full price, up front",
    description:
      "Every price you see is the total for your party, in PKR — nights, days and travellers already multiplied. Nothing is added at the last step.",
  },
  {
    id: "visa",
    title: "Honest about visas",
    description:
      "We never promise an approval. Each package shows its real approval rate and the exact documents it needs, so you know the odds before you pay.",
  },
  {
    id: "channels",
    title: "Official channels only",
    description:
      "Applications go through the embassy's own process. Your passport and documents are never collected over a chat app.",
  },
  {
    id: "people",
    title: "A real office, real people",
    description:
      "A street address, a phone that rings and named hours. Walk in, call, or write — someone who knows your file answers.",
  },
];

/**
 * Registration details to show next to the practices. Leave empty until the
 * business has real numbers to publish: an invented licence would defeat the
 * point. Each entry renders as "Label — value".
 */
export const trustCredentials: { label: string; value: string }[] = [];
