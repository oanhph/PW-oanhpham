import { Locator, Page } from "@playwright/test";

export class MaterialBasePage {
    page: Page;
    xpathRegisterPage: string;
    xpathProductPage: string;
    cssTodoPage: string;
    personalNote: Locator;

    constructor(page: Page) {
        this.page = page;
    }

    async openMaterialPage(url: string) {
        await this.page.goto(url);
    }

    async gotoPage(pageName: string) {
        switch (pageName.toLowerCase()) {
            case "register":
                await this.page.locator(this.xpathRegisterPage).click();
                break;
            case "product":
                await this.page.locator(this.xpathProductPage).click();
                break;
            case "todo":
                await this.page.locator(this.cssTodoPage).click();
                break;
        }
    }
}

export class RegisterPage extends MaterialBasePage {
    xpathUserName: string;
    xpathEmail: string;
    xpathGenderMale: string;
    xpathGenderFemale: string;

    constructor(page: Page) {
        super(page);
    }

    async fillUserName(username: string) {
        await this.page.locator(this.xpathUserName).fill(username);
    }

    async fillEmail(email: string) {
        await this.page.locator(this.xpathEmail).fill(email);
    }

    async checkGender(gender: string) {
        if (gender.toLocaleLowerCase() === "male") {
            await this.page.locator(this.xpathGenderMale).check();
        }
        else if (gender.toLocaleLowerCase() === "female") {
            await this.page.locator(this.xpathGenderFemale).check();
        }
    }
}
