import { Page } from "@playwright/test";
import { RegisterPage } from "./register-page-pom-manager";
import { ProductPage } from "./product-page-pom-manager";

export class PersonalNotePage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

}