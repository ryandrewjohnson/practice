import type { GiftCampaign } from "@/lib/gift-data";

export function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export function totalContributed(campaign: GiftCampaign) {
  return campaign.contributions.reduce((sum, c) => sum + c.amountCents, 0);
}

// Uncapped: an overfunded campaign returns more than 100.
export function percentFunded(campaign: GiftCampaign) {
  return (totalContributed(campaign) / campaign.priceCents) * 100;
}

// Amount raised beyond the price; 0 when not overfunded.
export function overageCents(campaign: GiftCampaign) {
  return Math.max(totalContributed(campaign) - campaign.priceCents, 0);
}

// One decimal, e.g. 61.5 -> "61.5%".
export function formatPercent(percent: number) {
  return `${percent.toFixed(1)}%`;
}
