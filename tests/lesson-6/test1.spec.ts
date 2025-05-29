import { test, expect } from "@playwright/test";
import { RegisterPage } from "../../page/register-page";

let username: string = "marky";
let email: string = "marky@example.com";
let gender: "Male" | "Female" = "Male";
let hobby: "reading" | "traveling" | "cooking" = "cooking";
let interests: "Technology" | "Science" | "Art" | "Music" | "Sports" = "Sports";
let country: "usa" | "canada" | "usk" | "australia" = "australia";
let dateOfBirth: string = "1994-05-11";
let profilePicturePath: string = "tests/lesson-6/test-data/profile-test1.jpg";
let biography: string = "This is Marky";

test("Ex1: Register Page", async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await test.step("Navigate to Register Page", async () => {
        await registerPage.openMaterialPage("https://material.playwrightvn.com/");
        await registerPage.gotoPage("register");
    })

    await test.step("Submit valid data", async () => {
        // fill info
        await registerPage.fillUserName(username);
        await registerPage.fillEmail(email);
        await registerPage.checkGender(gender);
        await registerPage.checkHobbies(hobby);
        await registerPage.selectInterests(interests);
        await registerPage.selectCountry(country);
        await registerPage.fillDateOfBirth(dateOfBirth);
        await registerPage.chooseProfilePictute(profilePicturePath);
        await registerPage.fillBio(biography);

        // click button Register
        await registerPage.submitRegister();
    });

    await test.step("Verify information in table", async () => {
        const userInfo = await registerPage.getInfoNewestInTable();
        const actualUsername = userInfo.username;
        const actualEmail = userInfo.email;
        const actualInformation = userInfo.infomation;

        // verify username
        expect(actualUsername).toBe(username);

        // verify email
        expect(actualEmail).toBe(email)

        // verify information
        expect(actualInformation).toContain(gender.toLowerCase());
        expect(actualInformation).toContain(hobby);
        expect(actualInformation).toContain(country);
        expect(actualInformation).toContain(dateOfBirth);
        expect(actualInformation).toContain(biography);
        expect(actualInformation).toContain("No");
    })
})
