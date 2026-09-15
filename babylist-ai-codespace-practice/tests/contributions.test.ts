import { describe, expect, it } from "vitest";
import { sortContributions } from "@/lib/contributions";
import type { Contribution } from "@/lib/gift-data";

function contribution(contributorName: string, amountCents: number): Contribution {
  return { contributorName, amountCents };
}

const names = (list: Contribution[]) => list.map((c) => c.contributorName);

describe("sortContributions — happy path", () => {
  it("sorts by amount, highest first", () => {
    // Crib campaign, in data order
    const input = [
      contribution("Work Team", 30000),
      contribution("Sarah K.", 5000),
      contribution("Uncle Jim", 10000),
      contribution("Neighbors", 8000),
    ];
    expect(names(sortContributions(input))).toEqual([
      "Work Team",
      "Uncle Jim",
      "Neighbors",
      "Sarah K.",
    ]);
  });

  it("returns a single contribution unchanged", () => {
    expect(sortContributions([contribution("Priya", 12500)])).toEqual([
      contribution("Priya", 12500),
    ]);
  });
});

describe("sortContributions — unhappy path", () => {
  it("returns an empty list for no contributions", () => {
    expect(sortContributions([])).toEqual([]);
  });

  it("does not mutate the input array", () => {
    const input = [contribution("Low", 100), contribution("High", 900)];
    const snapshot = [...input];
    const sorted = sortContributions(input);
    expect(input).toEqual(snapshot);
    expect(sorted).not.toBe(input);
  });

  it("breaks ties by name A–Z regardless of data order", () => {
    const input = [
      contribution("Zed", 5000),
      contribution("amy", 5000),
      contribution("Bob", 5000),
    ];
    expect(names(sortContributions(input))).toEqual(["amy", "Bob", "Zed"]);
  });

  it("sorts negative amounts (refunds) last", () => {
    const input = [
      contribution("Refund", -2500),
      contribution("Zero", 0),
      contribution("Gift", 2000),
    ];
    expect(names(sortContributions(input))).toEqual(["Gift", "Zero", "Refund"]);
  });

  it("keeps duplicate contributor names as separate entries", () => {
    const input = [contribution("Marcus", 7000), contribution("Marcus", 9000)];
    expect(sortContributions(input)).toEqual([
      contribution("Marcus", 9000),
      contribution("Marcus", 7000),
    ]);
  });
});
