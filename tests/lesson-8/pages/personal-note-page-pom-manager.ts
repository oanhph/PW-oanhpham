import { Page } from "@playwright/test";
import { RegisterPage } from "./register-page-pom-manager";
import { ProductPage } from "./product-page-pom-manager";

export class POMManager {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    getRegisterPage() {
        return new RegisterPage(this.page);
    }

    getProductPage() {
        return new ProductPage(this.page);
    }
}