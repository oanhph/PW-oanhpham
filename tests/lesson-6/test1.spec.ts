import { test, expect } from "@playwright/test";
import { RegisterPage } from "../../page/register-page";

let username: string = "marky";
let email: string = "marky@example.com";
let gender: "Male" | "Female" = "Male";
let hobbies: "Reading" | "Traveling" | "Cooking" = "Cooking";
let interests: "Technology" | "Science" | "Art" | "Music" | "Sports" = "Technology";
let country: "USA" | "Canada" | "USK" | "Australia" = "Australia";
let dateOfBirth: string = "11/05/1994";
let profilePicturePath: string = "tests/lesson-6/test-data/profile-test1.jpg";
let biography: string = "This is Marky";

test("Ex1: Register Page", async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await test.step("Navigate to Register Page", async () => {
        await registerPage.openMaterialPage("https://material.playwrightvn.com/");
        await registerPage.gotoPage("register");
    })

    await test.step("Submit valid data", async () => {
        await registerPage.fillUserName(username);
        await registerPage.fillEmail(email);
        await registerPage.checkGender(gender);
        await registerPage.submitRegister();

        await expect(registerPage.thUserName).toBeVisible();
    })
})
