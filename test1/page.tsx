import { registryItems } from "@/lib/registry-data";

// Existing application state. This page currently renders every item in one
// flat list, in whatever order the data happens to be in. No grouping, no
// filtering, no way to tell what's already purchased at a glance.
//
// This is intentionally rough - it represents "the app before your tasks."

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-1">Baby Registry</h1>
      <p className="text-gray-500 mb-6">Everything on the list</p>

      <ul className="space-y-3">
        {registryItems.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-4 border rounded-lg p-3"
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-16 h-16 rounded object-cover bg-gray-100"
            />
            <div className="flex-1">
              <div className="font-medium">{item.name}</div>
              <div className="text-sm text-gray-500">
                {formatPrice(item.priceCents)} · wanted {item.quantityWanted},
                purchased {item.quantityPurchased}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
