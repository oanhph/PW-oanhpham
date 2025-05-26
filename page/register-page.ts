import { Locator, Page } from "@playwright/test";
import { MaterialBasePage } from "./base-page";

export class RegisterPage extends MaterialBasePage {
    xpathUserName: string;
    xpathEmail: string;
    xpathGenderMale: string;
    xpathGenderFemale: string;
    xpathBtnRegister: string;
    thUserName: Locator;

    constructor(page: Page) {
        super(page);
        this.xpathUserName = "//input[@id='username']";
        this.xpathEmail = "//input[@id='email']";
        this.xpathGenderFemale = "//input[@id='female']";
        this.xpathGenderMale = "//input[@id='male']";
        this.xpathBtnRegister = "//button[text()='Register']";
        this.thUserName = page.locator("//th[text()='Username']");
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

    async submitRegister() {
        await this.page.locator(this.xpathBtnRegister).click();
    }
}