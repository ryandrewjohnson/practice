import { FundingProgress } from "@/components/FundingProgress";
import { campaigns } from "@/lib/gift-data";
import { formatPrice, totalContributed } from "@/lib/funding";

// Existing application state. Renders group gift campaigns with no progress
// indicator and no contributor detail - just totals. Rough on purpose; this
// is "the app before your tasks."

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
