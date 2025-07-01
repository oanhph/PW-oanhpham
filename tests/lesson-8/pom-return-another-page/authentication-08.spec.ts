import { test, expect } from "@playwright/test";
import { BasePage08 } from "./pages/base-page-08";
import { LoginPage08 } from "./pages/login-page-08";
import { DashboardPage08 } from "./pages/dashboard-page-08";

const usernameInvalid = "frank";
const passwordInvalid = "123456";
const usernameValid = "k11-trang";
const passwordValid = "TCKoQJ4S3hKFyEamNgM0OwMK";

test.describe("AUTH - Authentication", async () => {
    let basePage08: BasePage08;
    let loginPage08: any;
    let dashboardPage08: any;

    test.beforeEach("Go to Login page", async ({ page }) => {
        basePage08 = new BasePage08(page);
        loginPage08 = (await basePage08.navigateToLoginPage()) as LoginPage08;
    });

    test("@AUTH_001: Login fail", async ({ page }) => {
        await test.step("Input invalid values to username, password", async () => {
            await loginPage08.fillUserName(usernameInvalid);
            await loginPage08.fillPassword(passwordInvalid);
        });
        await test.step("Submit invalid data", async () => {
            await loginPage08.clickBtnLogin();

            // verify error message
            await expect(page.getByText("Error: The username frank is not registered on this site. If you are unsure of your username, try your email address instead.")).toBeVisible();
        })
    });

    test("@AUTH_002: Login success", async ({ page }) => {
        await test.step("Submit valid data", async () => {
            await loginPage08.fillUserName(usernameValid);
            await loginPage08.fillPassword(passwordValid);
        });
        await test.step("Submit invalid data", async () => {
            dashboardPage08 = (await loginPage08.clickBtnLogin()) as DashboardPage08;
            await page.waitForLoadState("domcontentloaded");

            // verify url
            await expect(page).toHaveURL(/wp-admin/);

            // verify heading h1 "Dashboard" display
            const isHeading1Display = await page.locator(dashboardPage08.xpathHeadingDashboard).isVisible();
            expect(isHeading1Display).toBeTruthy();

            // verify heading h2 "At a Glance" and "Activity" display
            await expect(page.locator(dashboardPage08.xpathHeadingAtAGlance)).toBeVisible();
            await expect(page.locator(dashboardPage08.xpathHeadingActivity)).toBeVisible();
        })
    })
})