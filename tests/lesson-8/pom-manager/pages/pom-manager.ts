import { Page } from "@playwright/test";
import { PersonalNotePage } from "./personal-note-page-pom-manager";
import { TodoPage } from "./todo-page-pom-manager";
import { ProductPage } from "./product-page-pom-manager";
import { RegisterPage } from "./register-page-pom-manager";

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

    getTodoPage() {
        return new TodoPage(this.page);
    }

    getPersonalNotePage() {
        return new PersonalNotePage(this.page);
    }
}