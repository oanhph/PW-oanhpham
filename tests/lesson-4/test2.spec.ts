import { test, expect } from "@playwright/test";

test("Add products to shopping cart", async ({ page }) => {
    await page.goto("https://material.playwrightvn.com/");
    await expect(page).toHaveTitle(/Tài liệu học automation test/);

    await page.click("//a[@href='02-xpath-product-page.html']");
    await expect(page).toHaveTitle(/Simple E-commerce/);

    await page.dblclick("//button[@data-product-id='1']");

    await page.click("//button[@data-product-id='2']", { clickCount: 3 });

    await page.click("//button[@data-product-id='3']");
});
