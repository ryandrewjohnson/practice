import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ContributorList } from "@/components/ContributorList";
import type { Contribution } from "@/lib/gift-data";

function contribution(contributorName: string, amountCents: number): Contribution {
  return { contributorName, amountCents };
}

function rows() {
  return screen.getAllByRole("listitem", { hidden: true }).map((row) => row.textContent);
}

describe("ContributorList — happy path", () => {
  const stroller = [
    contribution("Aunt Dana", 15000),
    contribution("Grandma Ruth", 20000),
    contribution("Marcus", 7000),
  ];

  it("is collapsed by default behind a summary with the count", () => {
    const { container } = render(<ContributorList contributions={stroller} />);
    const details = container.querySelector("details")!;
    expect(details).not.toHaveAttribute("open");
    expect(screen.getByText("3 contributions")).toBeVisible();
    expect(screen.getByText("Grandma Ruth")).not.toBeVisible();
  });

  it("lists contributors highest amount first with formatted amounts", () => {
    render(<ContributorList contributions={stroller} />);
    expect(rows()).toEqual(["Grandma Ruth$200.00", "Aunt Dana$150.00", "Marcus$70.00"]);
  });

  it("reveals the list when expanded", () => {
    const { container } = render(<ContributorList contributions={stroller} />);
    const details = container.querySelector("details")!;
    details.open = true;
    expect(within(details).getByText("Grandma Ruth")).toBeVisible();
  });

  it("uses the singular label for one contribution", () => {
    render(<ContributorList contributions={[contribution("College Friends", 22000)]} />);
    expect(screen.getByText("1 contribution")).toBeInTheDocument();
  });
});

describe("ContributorList — unhappy path", () => {
  it("shows an empty state with nothing to expand when there are no contributions", () => {
    const { container } = render(<ContributorList contributions={[]} />);
    expect(screen.getByText("No contributions yet")).toBeInTheDocument();
    expect(container.querySelector("details")).toBeNull();
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

  it("renders a negative amount as -$X.XX and sorts it last", () => {
    render(
      <ContributorList
        contributions={[contribution("Refund", -500), contribution("Priya", 12500)]}
      />,
    );
    expect(rows()).toEqual(["Priya$125.00", "Refund-$5.00"]);
  });

  it("renders every row when contributor names repeat", () => {
    render(
      <ContributorList
        contributions={[contribution("Marcus", 7000), contribution("Marcus", 9000)]}
      />,
    );
    expect(rows()).toEqual(["Marcus$90.00", "Marcus$70.00"]);
  });
});
