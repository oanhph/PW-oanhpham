import { Locator, Page } from "@playwright/test";

export class RegisterPage {
    page: Page;
    xpathUserName: string;
    xpathEmail: string;
    xpathGenderMale: string;
    xpathGenderFemale: string;
    xpathInterest: string;
    xpathCountry: string;
    xpathDateOfBirth: string;
    xpathProfilePicture: string;
    xpathBio: string;
    xpathBtnRegister: string;
    thUserName: Locator;
    getXpathOptionHobby(hobby: "reading" | "traveling" | "cooking") {
        return `//input[@id='${hobby}']`
    }

    constructor(page: Page) {
        this.page = page;
        this.xpathUserName = "//input[@id='username']";
        this.xpathEmail = "//input[@id='email']";
        this.xpathGenderFemale = "//input[@id='female']";
        this.xpathGenderMale = "//input[@id='male']";
        this.xpathInterest = "//select[@id='interests']";
        this.xpathCountry = "//select[@id='country']";
        this.xpathDateOfBirth = "//input[@id='dob']";
        this.xpathProfilePicture = "//input[@id='profile']";
        this.xpathBio = "//textarea[@id='bio']";
        this.xpathBtnRegister = "//button[text()='Register']";
        this.thUserName = page.locator("//th[text()='Username']");
    }

    async goToRegisterPage() {
        await this.page.goto("https://material.playwrightvn.com/");
        await this.page.click(`//a[contains(text(),'Register Page')]`);
    }

    async fillUserName(username: string) {
        await this.page.locator(this.xpathUserName).fill(username);
    }

    async fillEmail(email: string) {
        await this.page.locator(this.xpathEmail).fill(email);
    }

    async checkGender(gender: string) {
        if (gender.toLowerCase() === "male") {
            await this.page.locator(this.xpathGenderMale).check();
        }
        else if (gender.toLowerCase() === "female") {
            await this.page.locator(this.xpathGenderFemale).check();
        }
    }

    async checkHobbies(hobby: "reading" | "traveling" | "cooking") {
        await this.page.locator(this.getXpathOptionHobby(hobby)).check();
    }

    async selectInterests(interestValue: "Technology" | "Science" | "Art" | "Music" | "Sports") {
        await this.page.selectOption(this.xpathInterest, interestValue);
    }

    async selectCountry(countryValue: "usa" | "canada" | "usk" | "australia") {
        await this.page.selectOption(this.xpathCountry, countryValue);
    }

    async fillDateOfBirth(dateOfBirth: string) {
        await this.page.locator(this.xpathDateOfBirth).fill(dateOfBirth);
    }

    async chooseProfilePictute(xpathFile: string) {
        await this.page.locator(this.xpathProfilePicture).setInputFiles(xpathFile);
    }

    async fillBio(bio: string) {
        await this.page.locator(this.xpathBio).fill(bio);
    }

    async submitRegister() {
        await this.page.locator(this.xpathBtnRegister).click();
    }

    async getInfoNewestInTable() {
        const numberOfRows = await this.page.locator("//tbody/tr").count();
        const actualUsername = await this.page.locator(`//tbody/tr[${numberOfRows}]/td[2]`).textContent();
        let userInfo = {
            username: actualUsername,
            email: await this.page.locator(`//tbody/tr[${numberOfRows}]/td[3]`).textContent(),
            infomation: await this.page.locator(`//tbody/tr[${numberOfRows}]/td[4]`).textContent(),
        }

        return userInfo;
    }
}