import { campaigns, type GiftCampaign } from "@/lib/gift-data";
import {
  formatPercent,
  formatPrice,
  overageCents,
  percentFunded,
  totalContributed,
} from "@/lib/funding";

// Existing application state. Renders group gift campaigns with no progress
// indicator and no contributor detail - just totals. Rough on purpose; this
// is "the app before your tasks."

// Overfunded campaigns cap the bar at 100% and call out the overage as a
// separate label, so the bar never breaks the card layout.
function FundingProgress({ campaign }: { campaign: GiftCampaign }) {
  const percent = percentFunded(campaign);
  const overage = overageCents(campaign);
  const percentLabel = `${formatPercent(percent)} funded`;
  const overageLabel = overage > 0 ? `+${formatPrice(overage)} over` : null;

  return (
    <div className="mt-2">
      <div
        role="progressbar"
        aria-label={`${campaign.itemName} funding`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.min(percent, 100)}
        aria-valuetext={overageLabel ? `${percentLabel}, ${overageLabel}` : percentLabel}
        className="h-2 w-full rounded-full bg-gray-200 overflow-hidden"
      >
        <div
          className="h-full rounded-full bg-emerald-500"
          style={{ width: `${Math.min(percent, 100)}%` }}
        />
      </div>
      <div className="mt-1 text-xs text-gray-500 flex gap-2">
        <span>{percentLabel}</span>
        {overageLabel && (
          <span className="font-medium text-emerald-700">{overageLabel}</span>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-1">Group Gifts</h1>
      <p className="text-gray-500 mb-6">Chip in with others on something bigger</p>

      <ul className="space-y-4">
        {campaigns.map((campaign) => (
          <li key={campaign.id} className="border rounded-lg p-4 flex gap-4">
            <img
              src={campaign.imageUrl}
              alt={campaign.itemName}
              className="w-20 h-20 rounded object-cover bg-gray-100"
            />
            <div className="flex-1">
              <div className="font-medium">{campaign.itemName}</div>
              <div className="text-sm text-gray-500">
                {formatPrice(totalContributed(campaign))} raised of{" "}
                {formatPrice(campaign.priceCents)}
              </div>
              <FundingProgress campaign={campaign} />
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
