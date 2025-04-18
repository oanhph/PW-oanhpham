import { test, expect } from "@playwright/test";

let xpathUserName = "//input[@id='user_login']";
let xpathPassword = "//input[@id='user_pass']";
let xpathBtnLogin = "//input[@id='wp-submit']";

const usernameInvalid = "frank";
const passwordInvalid = "123456";
const usernameValid = "k11-trang";
const passwordValid = "TCKoQJ4S3hKFyEamNgM0OwMK";

test.describe("AUTH - Authentication", async () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin");
    });


    test("@AUTH_001: Login fail", async ({ page }) => {
        await test.step("Input invalid values to username, password", async () => {
            await page.locator(xpathUserName).fill(usernameInvalid);
            await page.locator(xpathPassword).fill(passwordInvalid);
        });

        await test.step("Submit invalid data", async () => {
            await page.click(xpathBtnLogin);

            await expect(page.getByText("Error: The username frank is not registered on this site. If you are unsure of your username, try your email address instead.")).toBeVisible();
        });
    });


    test("@AUTH_002: Login success", async ({ page }) => {
        await test.step("Input valid values", async () => {
            await page.locator(xpathUserName).fill(usernameValid);
            await page.locator(xpathPassword).fill(passwordValid);
        });

        await test.step("Submit valid data", async () => {
            await page.click(xpathBtnLogin);

            await expect(page).toHaveURL(/wp-admin/);
            await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
            await expect(page.getByRole("heading", { name: "At a Glance" })).toBeVisible();
            await expect(page.getByRole("heading", { name: "Activity" })).toBeVisible();
        });
    });
});
