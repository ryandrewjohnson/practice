import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FundingProgress } from "@/components/FundingProgress";
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

function fillWidth() {
  return (screen.getByRole("progressbar").firstElementChild as HTMLElement).style.width;
}

describe("FundingProgress — happy path", () => {
  it("renders a partial bar and percent text", () => {
    render(<FundingProgress campaign={campaign(10000, [4250])} />);
    expect(fillWidth()).toBe("42.5%");
    expect(screen.getByText("42.5% funded")).toBeInTheDocument();
    expect(screen.queryByText(/over$/)).not.toBeInTheDocument();
  });

  it("caps the bar at 100% but not the text when overfunded", () => {
    render(<FundingProgress campaign={campaign(34900, [25000, 12500])} />);
    expect(fillWidth()).toBe("100%");
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "100");
    expect(screen.getByText("107.4% funded")).toBeInTheDocument();
    expect(screen.getByText("+$26.00 over")).toBeInTheDocument();
  });
});

describe("FundingProgress — unhappy path", () => {
  it.each([
    ["zero", 0],
    ["negative", -500],
  ])("shows an unavailable message and no bar for a %s price", (_, price) => {
    render(<FundingProgress campaign={campaign(price, [5000])} />);
    expect(screen.getByText("Funding progress unavailable")).toBeInTheDocument();
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    expect(screen.queryByText(/NaN|Infinity/)).not.toBeInTheDocument();
  });

  it("renders an empty bar (not a full one) when the total is negative", () => {
    render(<FundingProgress campaign={campaign(10000, [2000, -2500])} />);
    expect(fillWidth()).toBe("0%");
    expect(screen.getByText("0.0% funded")).toBeInTheDocument();
  });

  it("renders an empty bar with no contributions", () => {
    render(<FundingProgress campaign={campaign(10000, [])} />);
    expect(fillWidth()).toBe("0%");
    expect(screen.getByText("0.0% funded")).toBeInTheDocument();
  });
});
