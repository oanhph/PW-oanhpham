import { test, expect } from "@playwright/test";

const usernameInvalid = "frank";
const passwordInvalid = "123456";
const usernameValid = "k11-trang";
const passwordValid = "TCKoQJ4S3hKFyEamNgM0OwMK";

test.describe("Authentication", async () => {
    test("@AUTH_001: Login fail", async ({ page }) => {
        await page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin");

        await test.step("Input invalid values to username, password", async () => {
            await page.locator("//input[@id='user_login']").fill(usernameInvalid);
            await page.locator("//input[@id='user_pass']").fill(passwordInvalid);
        });

        await test.step("Submit invalid data", async () => {
            await page.click("//input[@id='wp-submit']");
            await expect(page.getByText("Error: The username frank is not registered on this site. If you are unsure of your username, try your email address instead.")).toBeVisible();
        });
    });

    test("@AUTH_002: Login success", async ({ page }) => {
        await page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin");

        await test.step("Input valid values", async () => {
            await page.locator("//input[@id='user_login']").fill(usernameValid);
            await page.locator("//input[@id='user_pass']").fill(passwordValid);
        });

        await test.step("Submit valid data", async () => {
            await page.click("//input[@id='wp-submit']");
            await expect(page).toHaveURL(/wp-admin/);
            await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
            await expect(page.getByRole("heading", { name: "At a Glance" })).toBeVisible();
            await expect(page.getByRole("heading", { name: "Activity" })).toBeVisible();
        })
    })
});
