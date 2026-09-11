// Mock data layer simulating an existing application.
// In the real interview this would likely be a real API or DB - here it's
// an in-memory store so the practice repo needs no backend setup.

export type RegistryItem = {
  id: string;
  name: string;
  category: "feeding" | "sleeping" | "bathing" | "diapering" | "nursery";
  priceCents: number;
  quantityWanted: number;
  quantityPurchased: number;
  isEssential: boolean;
  imageUrl: string;
};

export const registryItems: RegistryItem[] = [
  {
    id: "itm_crib",
    name: "Convertible Crib",
    category: "nursery",
    priceCents: 64900,
    quantityWanted: 1,
    quantityPurchased: 1,
    isEssential: true,
    imageUrl: "https://placehold.co/120x120?text=Crib",
  },
  {
    id: "itm_bodysuit",
    name: "Newborn Bodysuits 5-pack",
    category: "diapering",
    priceCents: 2400,
    quantityWanted: 4,
    quantityPurchased: 2,
    isEssential: true,
    imageUrl: "https://placehold.co/120x120?text=Bodysuits",
  },
  {
    id: "itm_monitor",
    name: "Baby Monitor",
    category: "nursery",
    priceCents: 19900,
    quantityWanted: 1,
    quantityPurchased: 0,
    isEssential: true,
    imageUrl: "https://placehold.co/120x120?text=Monitor",
  },
  {
    id: "itm_bottles",
    name: "Bottle Set",
    category: "feeding",
    priceCents: 3200,
    quantityWanted: 2,
    quantityPurchased: 2,
    isEssential: true,
    imageUrl: "https://placehold.co/120x120?text=Bottles",
  },
  {
    id: "itm_tub",
    name: "Baby Bathtub",
    category: "bathing",
    priceCents: 2999,
    quantityWanted: 1,
    quantityPurchased: 0,
    isEssential: false,
    imageUrl: "https://placehold.co/120x120?text=Bathtub",
  },
  {
    id: "itm_towels",
    name: "Hooded Towel Set",
    category: "bathing",
    priceCents: 1899,
    quantityWanted: 2,
    quantityPurchased: 0,
    isEssential: false,
    imageUrl: "https://placehold.co/120x120?text=Towels",
  },
  {
    id: "itm_bottlewarmer",
    name: "Bottle Warmer",
    category: "feeding",
    priceCents: 4499,
    quantityWanted: 1,
    quantityPurchased: 0,
    isEssential: false,
    imageUrl: "https://placehold.co/120x120?text=Warmer",
  },
  {
    id: "itm_sleepsack",
    name: "Sleep Sack 2-pack",
    category: "sleeping",
    priceCents: 3600,
    quantityWanted: 3,
    quantityPurchased: 1,
    isEssential: true,
    imageUrl: "https://placehold.co/120x120?text=Sleep+Sack",
  },
];
