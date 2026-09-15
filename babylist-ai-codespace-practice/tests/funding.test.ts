import { describe, expect, it } from "vitest";
import {
  formatPercent,
  formatPrice,
  overageCents,
  percentFunded,
  totalContributed,
} from "@/lib/funding";
import type { GiftCampaign } from "@/lib/gift-data";

function campaign(priceCents: number, amounts: number[]): GiftCampaign {
  return {
    id: "test",
    itemName: "Test Item",
    priceCents,
    imageUrl: "",
    contributions: amounts.map((amountCents, i) => ({
      contributorName: `Contributor ${i}`,
      amountCents,
    })),
  };
}

describe("funding helpers", () => {
  it("handles a partially funded campaign", () => {
    // Stroller: $420.00 of $899.00
    const c = campaign(89900, [15000, 20000, 7000]);
    expect(totalContributed(c)).toBe(42000);
    expect(formatPercent(percentFunded(c))).toBe("46.7%");
    expect(overageCents(c)).toBe(0);
  });

  it("does not cap an overfunded campaign and reports the overage", () => {
    // Car seat: $375.00 of $349.00
    const c = campaign(34900, [25000, 12500]);
    expect(percentFunded(c)).toBeGreaterThan(100);
    expect(formatPercent(percentFunded(c))).toBe("107.4%");
    expect(formatPrice(overageCents(c))).toBe("$26.00");
  });

  it("treats exactly 100% as funded with no overage", () => {
    const c = campaign(10000, [6000, 4000]);
    expect(formatPercent(percentFunded(c))).toBe("100.0%");
    expect(overageCents(c)).toBe(0);
  });

  it("handles a campaign with no contributions", () => {
    const c = campaign(10000, []);
    expect(formatPercent(percentFunded(c))).toBe("0.0%");
    expect(overageCents(c)).toBe(0);
  });

  it("formats percent to one decimal", () => {
    expect(formatPercent(61.5)).toBe("61.5%");
    expect(formatPercent(81.664)).toBe("81.7%");
    expect(formatPercent(50)).toBe("50.0%");
  });
});
