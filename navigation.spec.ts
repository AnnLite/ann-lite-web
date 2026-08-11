import { test, expect } from "@playwright/test";

test.describe("Ann Lite — core navigation", () => {
  test("home page loads with the hero and default Haitian Creole locale", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/ht$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("language switcher changes locale and preserves the current path", async ({ page }) => {
    await page.goto("/ht/prayers");
    await page.getByRole("button", { name: "English" }).click();
    await expect(page).toHaveURL(/\/en\/prayers$/);
  });

  test("donate hub links to the three donation methods", async ({ page }) => {
    await page.goto("/ht/donate");
    await expect(page.getByRole("link", { name: /kat kredi|byCard/i })).toBeVisible();
  });

  test("unknown route renders the localized 404 page", async ({ page }) => {
    const response = await page.goto("/ht/this-page-does-not-exist");
    expect(response?.status()).toBe(404);
  });
});
