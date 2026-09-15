import type { GiftCampaign } from "@/lib/gift-data";

// Sign goes before the currency symbol: -500 -> "-$5.00", not "$-5.00".
export function formatPrice(cents: number) {
  const sign = cents < 0 ? "-" : "";
  return `${sign}$${(Math.abs(cents) / 100).toFixed(2)}`;
}

export function totalContributed(campaign: GiftCampaign) {
  return campaign.contributions.reduce((sum, c) => sum + c.amountCents, 0);
}

// Uncapped above: an overfunded campaign returns more than 100. Floored at 0 so
// refunds that push the total negative can't produce a negative percent.
// Returns null when the price isn't a positive number (0, negative, NaN) —
// there's nothing meaningful to divide by.
export function percentFunded(campaign: GiftCampaign): number | null {
  if (!(campaign.priceCents > 0)) return null;
  return (Math.max(totalContributed(campaign), 0) / campaign.priceCents) * 100;
}

// Amount raised beyond the price; 0 when not overfunded.
export function overageCents(campaign: GiftCampaign) {
  return Math.max(totalContributed(campaign) - campaign.priceCents, 0);
}

// One decimal, e.g. 61.5 -> "61.5%".
export function formatPercent(percent: number) {
  return `${percent.toFixed(1)}%`;
}
