import { test, expect } from "@playwright/test";

let xpathUserName = "//input[@id='user_login']";
let xpathPassword = "//input[@id='user_pass']";
let xpathBtnLogin = "//input[@id='wp-submit']";
let xpathMenuMedia = "//div[contains(text(),'Media')]";
let xpathMenuLibrary = "//a[contains(text(),'Library')]";
let xpathHeadingMediaLibrary = "//h1[text()='Media Library']";
let xpathBtnAddNewMediaFile = "//h1[text()='Media Library']/following-sibling::a";
let xpathBtnSelectFile = "//input[@type='file']";
let xpathBtnBulkSelect = "//button[contains(text(),'Bulk select')]";
let xpathFile = "//h2[text()='Media list']/following::div[contains(text(),'data-media.txt')]"
let xpathBtnDeletePermanently = "//select[@id='media-attachment-filters']/following-sibling::button[contains(text(),'Delete permanently')]";

let username = "k11-trang";
let password = "TCKoQJ4S3hKFyEamNgM0OwMK";

test.describe("MEDIA - Media", async () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin");
        await page.locator(xpathUserName).fill(username);
        await page.locator(xpathPassword).fill(password);
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

            await expect(page.locator(xpathFile)).toBeVisible();
        });

        await test.step("F5 page", async () => {
            await page.reload();

            await expect(page.locator(xpathFile)).toBeVisible();
        });

        await test.step("Remove file", async () => {
            await page.click(xpathBtnBulkSelect);
            await page.locator(xpathFile).check();

            page.on("dialog", async dialog => dialog.accept());
            await page.click(xpathBtnDeletePermanently);

            await page.locator(xpathBtnBulkSelect).waitFor({ state: 'visible' });
        });
    });
});
