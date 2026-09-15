import type { Contribution } from "@/lib/gift-data";

// Highest amount first; ties by contributor name A–Z so order doesn't depend
// on data order. Returns a copy — never sorts the shared campaigns data in place.
export function sortContributions(contributions: readonly Contribution[]) {
  return [...contributions].sort(
    (a, b) =>
      b.amountCents - a.amountCents ||
      a.contributorName.localeCompare(b.contributorName, "en"),
  );
}
