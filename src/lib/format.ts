const number = new Intl.NumberFormat("en-PK", { maximumFractionDigits: 0 });

/** Formats an amount in Pakistani rupees, e.g. "PKR 145,000". */
export function formatPKR(amount: number): string {
  return `PKR ${number.format(amount)}`;
}

/** Returns "1 night" / "3 nights" — regular English plurals only. */
export function pluralise(count: number, word: string): string {
  return `${count} ${count === 1 ? word : `${word}s`}`;
}
