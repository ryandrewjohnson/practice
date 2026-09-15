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

// Formats percentFunded for campaigns whose price is valid.
function percentText(c: GiftCampaign) {
  const percent = percentFunded(c);
  if (percent === null) throw new Error("expected a valid price");
  return formatPercent(percent);
}

describe("funding helpers — happy path", () => {
  it("handles a partially funded campaign", () => {
    // Stroller: $420.00 of $899.00
    const c = campaign(89900, [15000, 20000, 7000]);
    expect(totalContributed(c)).toBe(42000);
    expect(percentText(c)).toBe("46.7%");
    expect(overageCents(c)).toBe(0);
  });

  it("does not cap an overfunded campaign and reports the overage", () => {
    // Car seat: $375.00 of $349.00
    const c = campaign(34900, [25000, 12500]);
    expect(percentFunded(c)).toBeGreaterThan(100);
    expect(percentText(c)).toBe("107.4%");
    expect(formatPrice(overageCents(c))).toBe("$26.00");
  });

  it("treats exactly 100% as funded with no overage", () => {
    const c = campaign(10000, [6000, 4000]);
    expect(percentText(c)).toBe("100.0%");
    expect(overageCents(c)).toBe(0);
  });

  it("formats percent to one decimal", () => {
    expect(formatPercent(61.5)).toBe("61.5%");
    expect(formatPercent(81.664)).toBe("81.7%");
    expect(formatPercent(50)).toBe("50.0%");
  });
});

describe("funding helpers — unhappy path", () => {
  it("handles a campaign with no contributions", () => {
    const c = campaign(10000, []);
    expect(percentText(c)).toBe("0.0%");
    expect(overageCents(c)).toBe(0);
  });

  it.each([
    ["zero", 0],
    ["negative", -500],
    ["NaN", Number.NaN],
  ])("returns null percent for a %s price instead of NaN/Infinity", (_, price) => {
    expect(percentFunded(campaign(price, []))).toBeNull();
    expect(percentFunded(campaign(price, [5000]))).toBeNull();
  });

  it("floors the percent at 0 when refunds push the total negative", () => {
    const c = campaign(10000, [2000, -2500]);
    expect(totalContributed(c)).toBe(-500);
    expect(percentText(c)).toBe("0.0%");
    expect(overageCents(c)).toBe(0);
  });

  it("shows 100.0% for 99.96% funded with no overage (accepted rounding edge)", () => {
    const c = campaign(10000, [9996]);
    expect(percentFunded(c)).toBeLessThan(100);
    expect(percentText(c)).toBe("100.0%");
    expect(overageCents(c)).toBe(0);
  });

  it("reports a 1-cent overage", () => {
    const c = campaign(10000, [10001]);
    expect(formatPrice(overageCents(c))).toBe("$0.01");
  });
});

describe("formatPrice", () => {
  it("formats positive amounts and zero", () => {
    expect(formatPrice(42000)).toBe("$420.00");
    expect(formatPrice(1)).toBe("$0.01");
    expect(formatPrice(0)).toBe("$0.00");
  });

  it("puts the sign before the currency symbol for negative amounts", () => {
    expect(formatPrice(-500)).toBe("-$5.00");
    expect(formatPrice(-1)).toBe("-$0.01");
  });

  it("does not show a sign for negative zero", () => {
    expect(formatPrice(-0)).toBe("$0.00");
  });
});
