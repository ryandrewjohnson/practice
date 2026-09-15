import type { GiftCampaign } from "@/lib/gift-data";
import {
  formatPercent,
  formatPrice,
  overageCents,
  percentFunded,
} from "@/lib/funding";

// Overfunded campaigns cap the bar at 100% and call out the overage as a
// separate label, so the bar never breaks the card layout.
export function FundingProgress({ campaign }: { campaign: GiftCampaign }) {
  const percent = percentFunded(campaign);

  if (percent === null) {
    return (
      <div className="mt-2 text-xs text-gray-500">Funding progress unavailable</div>
    );
  }

  const overage = overageCents(campaign);
  const barWidth = Math.min(percent, 100);
  const percentLabel = `${formatPercent(percent)} funded`;
  const overageLabel = overage > 0 ? `+${formatPrice(overage)} over` : null;

  return (
    <div className="mt-2">
      <div
        role="progressbar"
        aria-label={`${campaign.itemName} funding`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={barWidth}
        aria-valuetext={overageLabel ? `${percentLabel}, ${overageLabel}` : percentLabel}
        className="h-2 w-full rounded-full bg-gray-200 overflow-hidden"
      >
        <div
          className="h-full rounded-full bg-emerald-500"
          style={{ width: `${barWidth}%` }}
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
