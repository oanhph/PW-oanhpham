import { Page } from "@playwright/test";
import { RegisterPage } from "./register-page-pom-manager";
import { ProductPage } from "./product-page-pom-manager";

export class PersonalNotePage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goToPersonalNotePage() {
        await this.page.goto("https://material.playwrightvn.com/");
        await this.page.click(`//a[contains(text(),'Personal notes')]`);
    }

}