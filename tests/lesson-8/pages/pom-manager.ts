import { Page } from "@playwright/test";
import { RegisterPage } from "./register-page";

export class POMManager {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    getRegisterPage() {
        return new RegisterPage(this.page);
    }
}