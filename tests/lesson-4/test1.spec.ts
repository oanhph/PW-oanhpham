import { test, expect } from "@playwright/test";

// test("Go to Tài liệu học automation test", async ({ page }) => {
//     await page.goto("https://material.playwrightvn.com/");
//     await expect(page).toHaveTitle(/Tài liệu học automation test/);
// });

// test("Go to User Registration page", async ({page}) => {
//     await page.click("//a[@href='01-xpath-register-page.html']");
//     await expect(page).toHaveTitle(/User Registration/);
// });

test ("Submit valid values in User Registration form", async ({page}) => {
    await page.goto("https://material.playwrightvn.com/");
    await expect(page).toHaveTitle(/Tài liệu học automation test/);

    await page.click("//a[@href='01-xpath-register-page.html']");
    await expect(page).toHaveTitle(/User Registration/);

    await page.locator("//input[@id='username']").pressSequentially("Oanh Pham", {
        delay: 100,
    });

    await page.fill("//input[@id='email']", "test@gmail.com");

    let isChecked;



})





/* import { test, expect } from '@playwright/test';

test('get started link', async ({ page }) => {
  await page.goto('https://material.playwrightvn.com/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Bài học 1: Register Page' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'User Registration' })).toBeVisible();
});
*/