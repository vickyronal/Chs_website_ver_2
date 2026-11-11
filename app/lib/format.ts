/** "5N / 6D" */
export function formatDuration(nights: number, days: number): string {
  return `${nights}N / ${days}D`;
}

/**
 * "From ₹45,000" or "Price on request".
 * A null price means CHS hasn't confirmed one, so we never show a made-up number.
 */
export function formatPrice(amount: number | null, currency: "INR" = "INR"): string {
  if (amount === null) return "Price on request";
  const formatted = new Intl.NumberFormat("en-IN", { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
  return `From ${formatted}`;
}
