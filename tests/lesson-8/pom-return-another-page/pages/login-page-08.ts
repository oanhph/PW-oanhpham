import { Page } from "@playwright/test";
import { DashboardPage08 } from "./dashboard-page-08";

export class LoginPage08 {
    page: Page;
    xpathUserName = "//input[@id='user_login']";
    xpathPassword = "//input[@id='user_pass']";
    xpathBtnLogin = "//input[@id='wp-submit']";

    constructor(page: Page) {
        this.page = page;
    }

    async fillUserName(username: string) {
        await this.page.locator(this.xpathUserName).fill(username);
    }

    async fillPassword(password: string) {
        await this.page.locator(this.xpathPassword).fill(password);
    }

    async clickBtnLogin() {
        await this.page.locator(this.xpathBtnLogin).click();
        return new DashboardPage08(this.page);
    }

    async login(username: string, password: string) {
        await this.fillUserName(username);
        await this.fillPassword(password);
        await this.clickBtnLogin();
        return new DashboardPage08(this.page);
    }
}