import { test, expect } from "@playwright/test";
import { execSync } from "child_process";

const usernameValid = "k11-trang";
const passwordValid = "TCKoQJ4S3hKFyEamNgM0OwMK";
const existsName = "lesson tag";
let validName1 = "tag Oanh Pham";
let validName2 = "tag Oanh Pham 02";
let validSlug2 = "tag-OanhPham-02".toLowerCase();
0
test.describe("Post", async () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin");
        await page.locator("//input[@id='user_login']").fill(usernameValid);
        await page.locator("//input[@id='user_pass']").fill(passwordValid);
        await page.click("//input[@id='wp-submit']");
        await expect(page).toHaveURL(/wp-admin/);

        await page.hover("//div[contains(text(),'Posts')]");
        await page.click("//a[contains(text(),'Tags')]");
        await expect(page.locator("//h1[text()='Tags']")).toBeVisible();
    });

    test("@POST_TAG_001: Tag - add tag failed", async ({ page }) => {
        await test.step("Click button [Add New Tag]", async () => {
            await page.click("//input[@id='submit']");
            await expect(page.locator("//p[text()='A name is required for this term.']")).toBeVisible();
        });

        await test.step("Submit the already exists name", async () => {
            await page.locator("//input[@id='tag-name']").fill(existsName);
            await page.click("//input[@id='submit']");
            await expect(page.locator("//p[text()='A term with the name provided already exists in this taxonomy.']")).toBeVisible();
        })
    });

    test("@POST_TAG_002: Tag - add tag success", async ({ page }) => {
        await test.step("Submit valid name", async () => {
            await page.locator("//input[@id='tag-name']").fill(validName1);
            await page.click("//input[@id='submit']");
            await expect(page.locator("//p[text()='Tag added.']")).toBeVisible();
            await expect(page.locator(`//a[text()='${validName1}']`)).toBeVisible();
        });

        await test.step("Submit valid name & slug", async () => {
            await page.locator("//input[@id='tag-name']").fill(validName2);
            await page.locator("//input[@id='tag-slug']").fill(validSlug2);
            await page.click("//input[@id='submit']");
            await expect(page.locator("//p[text()='Tag added.']")).toBeVisible();
            await expect(page.locator(`//a[text()='${validName2}']`)).toBeVisible();
            await expect(page.locator(`//td[text()='${validSlug2}']`)).toBeVisible();
        });

        await test.step("Remove tag", async () => {
            await page.hover(`//a[text()='${validName1}']`);
            page.on("dialog", async dialog => dialog.accept());
            await page.click(`//a[@aria-label='Delete “${validName1}”']`);
            await expect(page.locator(`//a[text()='${validName1}']`)).toBeHidden();

            await page.hover(`//a[text()='${validName2}']`);
            await page.click(`//a[@aria-label='Delete “${validName2}”']`);
            await expect(page.locator(`//a[text()='${validName2}']`)).toBeHidden();
        });
    });
});

