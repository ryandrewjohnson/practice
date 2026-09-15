import { test, expect, type Page } from "@playwright/test";
import { campaigns, type GiftCampaign } from "../src/lib/gift-data";

function formatPrice(cents: number) {
  const sign = cents < 0 ? "-" : "";
  return `${sign}$${(Math.abs(cents) / 100).toFixed(2)}`;
}

// Independent of the app's sort helper on purpose: highest amount first,
// ties by name A–Z.
function expectedRows(campaign: GiftCampaign) {
  return [...campaign.contributions]
    .sort(
      (a, b) =>
        b.amountCents - a.amountCents ||
        a.contributorName.localeCompare(b.contributorName, "en"),
    )
    .map((c) => `${c.contributorName}${formatPrice(c.amountCents)}`);
}

function card(page: Page, campaign: GiftCampaign) {
  return page
    .locator("main > ul > li")
    .filter({ has: page.getByText(campaign.itemName, { exact: true }) });
}

test.describe("Task 2.1 — contributor details", () => {
  test("every campaign's contributor list is collapsed by default", async ({ page }) => {
    await page.goto("/");

    for (const campaign of campaigns) {
      const details = card(page, campaign).locator("details");
      await expect(details).not.toHaveAttribute("open");
      await expect(details.locator("li").first()).toBeHidden();
    }
  });

  test("expanding shows contributors sorted by amount, highest first", async ({ page }) => {
    await page.goto("/");

    for (const campaign of campaigns) {
      const campaignCard = card(page, campaign);
      const n = campaign.contributions.length;
      await campaignCard
        .getByText(`${n} ${n === 1 ? "contribution" : "contributions"}`, { exact: true })
        .click();

      const rows = campaignCard.locator("details li");
      await expect(rows.first()).toBeVisible();
      await expect(rows).toHaveText(expectedRows(campaign));
    }
  });

  test("clicking the summary again collapses the list", async ({ page }) => {
    await page.goto("/");
    const campaignCard = card(page, campaigns[0]);
    const summary = campaignCard.locator("summary");

    await summary.click();
    await expect(campaignCard.locator("details li").first()).toBeVisible();
    await summary.click();
    await expect(campaignCard.locator("details li").first()).toBeHidden();
  });

  test("regression: stroller order matches hand-checked values", async ({ page }) => {
    await page.goto("/");
    const stroller = page
      .locator("main > ul > li")
      .filter({ has: page.getByText("Premium Stroller", { exact: true }) });

    await stroller.locator("summary").click();
    await expect(stroller.locator("details li")).toHaveText([
      "Grandma Ruth$200.00",
      "Aunt Dana$150.00",
      "Marcus$70.00",
    ]);
  });
});
