import { test, expect } from "@playwright/test";

let usernameValid = "k11-trang";
let passwordValid = "TCKoQJ4S3hKFyEamNgM0OwMK";

test.describe("MEDIA - Media", async () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin");
        await page.locator("//input[@id='user_login']").fill(usernameValid);
        await page.locator("//input[@id='user_pass']").fill(passwordValid);
        await page.click("//input[@id='wp-submit']");

        await expect(page).toHaveURL(/wp-admin/);

        await page.hover("//div[contains(text(),'Media')]");
        await page.click("//a[contains(text(),'Library')]");

        await expect(page.locator("//h1[text()='Media Library']")).toBeVisible();
    });

    test("@MEDIA_FILES_001: Media - upload file success", async ({ page }) => {
        await test.step("Upload file", async () => {
            await page.click("//a[@role='button' and text()='Add New Media File']");
            await page.locator("//input[@type='file']").setInputFiles("tests/lesson-5/data-media.txt");
            await page.waitForTimeout(2000);

            await expect(page.locator("//div[text()='data-media.txt']")).toBeVisible();
        });

        await test.step("F5 page", async () => {
            await page.reload();

            await expect(page.locator("//div[text()='data-media.txt']")).toBeVisible();
        });

        await test.step("Remove file", async () => {
            await page.click("//button[text()='Bulk select']");
            await page.locator("//li[@aria-label='data-media']").check();

            page.on("dialog", async dialog => dialog.accept());
            await page.click("//button[@class='button media-button button-primary button-large delete-selected-button']");

            await page.locator("//button[text()='Bulk select']").waitFor({ state: 'visible' });
        });
    });
});
