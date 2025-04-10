import { test, expect } from "@playwright/test";
import { RegisterPage } from "./01-pom";

test("Ex1: Register Page", async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await test.step("Navigate to Register Page", async () => {
        await registerPage.openMaterialPage("https://material.playwrightvn.com/");
        await registerPage.gotoPage("register");
    })

    await test.step("Submit valid data", async () => {
        await registerPage.fillUserName("marky");
        await registerPage.fillEmail("marky@example.com");
        await registerPage.checkGender("Male");
    })
})