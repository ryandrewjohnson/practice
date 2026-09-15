// Mock data layer simulating an existing application.
// No backend needed - everything is an in-memory module.

export type Contribution = {
  contributorName: string;
  amountCents: number;
};

export type GiftCampaign = {
  id: string;
  itemName: string;
  priceCents: number;
  imageUrl: string;
  contributions: Contribution[];
};

export const campaigns: GiftCampaign[] = [
  {
    id: "camp_stroller",
    itemName: "Premium Stroller",
    priceCents: 89900,
    imageUrl: "https://placehold.co/160x160?text=Stroller",
    contributions: [
      { contributorName: "Aunt Dana", amountCents: 15000 },
      { contributorName: "Grandma Ruth", amountCents: 20000 },
      { contributorName: "Marcus", amountCents: 7000 },
    ],
  },
  {
    id: "camp_carseat",
    itemName: "Infant Car Seat",
    priceCents: 34900,
    imageUrl: "https://placehold.co/160x160?text=Car+Seat",
    contributions: [
      { contributorName: "The Nguyens", amountCents: 25000 },
      { contributorName: "Priya", amountCents: 12500 },
    ],
  },
  {
    id: "camp_crib",
    itemName: "Convertible Crib",
    priceCents: 64900,
    imageUrl: "https://placehold.co/160x160?text=Crib",
    contributions: [
      { contributorName: "Work Team", amountCents: 30000 },
      { contributorName: "Sarah K.", amountCents: 5000 },
      { contributorName: "Uncle Jim", amountCents: 10000 },
      { contributorName: "Neighbors", amountCents: 8000 },
    ],
  },
  {
    id: "camp_monitor",
    itemName: "Baby Monitor",
    priceCents: 19900,
    imageUrl: "https://placehold.co/160x160?text=Monitor",
    contributions: [{ contributorName: "College Friends", amountCents: 22000 }],
  },
];
