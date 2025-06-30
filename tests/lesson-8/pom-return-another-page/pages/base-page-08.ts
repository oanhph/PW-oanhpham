import { Page } from "@playwright/test";
import { LoginPage08 } from "./login-page-08";

export class BasePage08 {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToLoginPage(
        url = "https://pw-practice-dev.playwrightvn.com/wp-admin"
    ) {
        await this.page.goto(url);
        return new LoginPage08(this.page);
    }
}