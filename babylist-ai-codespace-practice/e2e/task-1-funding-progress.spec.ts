import { test, expect } from "@playwright/test";
import { campaigns, type GiftCampaign } from "../src/lib/gift-data";

function totalContributed(campaign: GiftCampaign) {
  return campaign.contributions.reduce((sum, c) => sum + c.amountCents, 0);
}

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

function expectedFor(campaign: GiftCampaign) {
  const raised = totalContributed(campaign);
  const percent = (raised / campaign.priceCents) * 100;
  const overageCents = raised - campaign.priceCents;
  return {
    percentText: `${percent.toFixed(1)}% funded`,
    barWidthPercent: Math.min(percent, 100),
    isOverfunded: overageCents > 0,
    overageLabel: overageCents > 0 ? `+${formatPrice(overageCents)} over` : null,
  };
}

// Pending until sub-task 1.2 implements the indicator — remove `.fixme` then.
test.describe.fixme("Task 1 — funding progress indicator", () => {
  test("data fixture contains both a normal and an overfunded campaign", () => {
    const percents = campaigns.map((c) => expectedFor(c));
    expect(percents.some((p) => !p.isOverfunded)).toBe(true);
    expect(percents.some((p) => p.isOverfunded)).toBe(true);
  });

  test("every campaign renders a progress bar with correct percent text", async ({ page }) => {
    await page.goto("/");

    for (const campaign of campaigns) {
      const expected = expectedFor(campaign);
      const card = page.getByText(campaign.itemName, { exact: true }).locator("..").locator("..");

      await expect(card.getByText(expected.percentText)).toBeVisible();

      const barWidth = await card.locator(".bg-emerald-500").evaluate((el) => (el as HTMLElement).style.width);
      expect(parseFloat(barWidth)).toBeCloseTo(expected.barWidthPercent, 3);
    }
  });

  test("normal (not overfunded) campaigns show no overage label", async ({ page }) => {
    await page.goto("/");
    const normal = campaigns.filter((c) => !expectedFor(c).isOverfunded);
    expect(normal.length).toBeGreaterThan(0);

    for (const campaign of normal) {
      const card = page.getByText(campaign.itemName, { exact: true }).locator("..").locator("..");
      await expect(card.getByText("over")).toHaveCount(0);
    }
  });

  test("overfunded campaigns cap the bar at 100% and show a +$X over label", async ({ page }) => {
    await page.goto("/");
    const overfunded = campaigns.filter((c) => expectedFor(c).isOverfunded);
    expect(overfunded.length).toBeGreaterThan(0);

    for (const campaign of overfunded) {
      const expected = expectedFor(campaign);
      const card = page.getByText(campaign.itemName, { exact: true }).locator("..").locator("..");

      const barWidth = await card.locator(".bg-emerald-500").evaluate((el) => (el as HTMLElement).style.width);
      expect(barWidth).toBe("100%");
      await expect(card.getByText(expected.overageLabel!, { exact: false })).toBeVisible();
    }
  });

  test("regression: known overfunded campaigns match hand-checked values", async ({ page }) => {
    await page.goto("/");

    const carSeatCard = page.getByText("Infant Car Seat", { exact: true }).locator("..").locator("..");
    await expect(carSeatCard.getByText("107.4% funded")).toBeVisible();
    await expect(carSeatCard.getByText("+$26.00 over", { exact: false })).toBeVisible();

    const monitorCard = page.getByText("Baby Monitor", { exact: true }).locator("..").locator("..");
    await expect(monitorCard.getByText("110.6% funded")).toBeVisible();
    await expect(monitorCard.getByText("+$21.00 over", { exact: false })).toBeVisible();
  });
});
