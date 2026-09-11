# Task 1 — Group and show completion

The registry page currently shows every item in one flat list. Two changes:

1. **Group items by category** (Feeding, Sleeping, Bathing, Diapering, Nursery),
   with a heading per group.
2. **Show at a glance whether each item is fully purchased.** `quantityPurchased`
   vs `quantityWanted` already exists on each item — use it. A completed item
   should look visibly different from an incomplete one (not just smaller text).

No new data needed. This is a rendering/organization change on top of what's
already in `src/lib/registry-data.ts`.

## What "done" looks like

- Categories appear as distinct sections, not one long list
- A viewer can tell at a glance which items still need something
- Existing item data (price, name, image) still displays correctly

## Worth deciding out loud

- Fixed category order, or alphabetical, or order-of-appearance? There's no
  "right" answer — but say which you picked and why.
- Should an empty category (no items) show at all, or be hidden?
