import type { Contribution } from "@/lib/gift-data";
import { sortContributions } from "@/lib/contributions";
import { formatPrice } from "@/lib/funding";

// Native <details> keeps this a server component: expand/collapse, keyboard
// and screen-reader support come from the browser with no client JS.
export function ContributorList({
  contributions,
}: {
  contributions: readonly Contribution[];
}) {
  if (contributions.length === 0) {
    return <p className="mt-3 text-sm text-gray-500">No contributions yet</p>;
  }

  const sorted = sortContributions(contributions);
  // Counts contributions, not people: the same name can contribute twice.
  const label = `${sorted.length} ${sorted.length === 1 ? "contribution" : "contributions"}`;

  return (
    <details className="mt-3">
      <summary className="cursor-pointer select-none text-sm text-gray-700">
        {label}
      </summary>
      <ul className="mt-2 divide-y divide-gray-100 text-sm">
        {sorted.map((contribution, index) => (
          <li
            // Index is part of the key because names aren't unique.
            key={`${index}-${contribution.contributorName}`}
            className="flex justify-between gap-4 py-1.5"
          >
            <span>{contribution.contributorName}</span>
            <span className="tabular-nums text-gray-700">
              {formatPrice(contribution.amountCents)}
            </span>
          </li>
        ))}
      </ul>
    </details>
  );
}
