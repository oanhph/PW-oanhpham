import { test, expect } from "@playwright/test";

let xpathUserName = "//input[@id='user_login']";
let xpathPassword = "//input[@id='user_pass']";
let xpathBtnLogin = "//input[@id='wp-submit']";
let xpathMenuMedia = "//div[contains(text(),'Media')]";
let xpathMenuLibrary = "//a[contains(text(),'Library')]";
let xpathHeadingMediaLibrary = "//h1[text()='Media Library']";
let xpathBtnAddNewMediaFile = "//a[@role='button' and text()='Add New Media File']";
let xpathBtnSelectFile = "//input[@type='file']";
let xpathBtnBulkSelect = "//button[text()='Bulk select']";
let xpathBtnDeletePermanently = "//button[@class='button media-button button-primary button-large delete-selected-button']";

let usernameValid = "k11-trang";
let passwordValid = "TCKoQJ4S3hKFyEamNgM0OwMK";

test.describe("MEDIA - Media", async () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin");
        await page.locator(xpathUserName).fill(usernameValid);
        await page.locator(xpathPassword).fill(passwordValid);
        await page.click(xpathBtnLogin);

        await expect(page).toHaveURL(/wp-admin/);

        await page.hover(xpathMenuMedia);
        await page.click(xpathMenuLibrary);

        await expect(page.locator(xpathHeadingMediaLibrary)).toBeVisible();
    });

    test("@MEDIA_FILES_001: Media - upload file success", async ({ page }) => {
        await test.step("Upload file", async () => {
            await page.click(xpathBtnAddNewMediaFile);
            await page.locator(xpathBtnSelectFile).setInputFiles("tests/lesson-5/data-media.txt");
            await page.waitForTimeout(2000);

            await expect(page.locator("//div[text()='data-media.txt']")).toBeVisible();
        });

        await test.step("F5 page", async () => {
            await page.reload();

            await expect(page.locator("//div[text()='data-media.txt']")).toBeVisible();
        });

        await test.step("Remove file", async () => {
            await page.click(xpathBtnBulkSelect);
            await page.locator("//li[@aria-label='data-media']").check();

            page.on("dialog", async dialog => dialog.accept());
            await page.click(xpathBtnDeletePermanently);

            await page.locator(xpathBtnBulkSelect).waitFor({ state: 'visible' });
        });
    });
});
