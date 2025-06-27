import { expect, test } from "@playwright/test";
import { POMManager } from "./pages/pom-manager";
import { RegisterPage } from "../pages/register-page-pom-manager";

let username: string = "marky";
let email: string = "marky@example.com";
let gender: "Male" | "Female" = "Male";
let hobby: "reading" | "traveling" | "cooking" = "cooking";
let interests: "Technology" | "Science" | "Art" | "Music" | "Sports" = "Sports";
let country: "usa" | "canada" | "usk" | "australia" = "australia";
let dateOfBirth: string = "1994-05-11";
let profilePicturePath: string = "tests/lesson-6/test-data/profile-test1.jpg";
let biography: string = "This is Marky";
// let pomManager: POMManager;

test("Ex1: Register Page - POM Manager", async ({ page }) => {
    const pomManager = new POMManager(page);
    const registerPage = pomManager.getRegisterPage();

    await test.step("Go to Register Page", async () => {
        await registerPage.goToRegisterPage();
        expect(registerPage).toBeInstanceOf(RegisterPage);
    });


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

    await test.step("Verify information on the table", async () => {
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
