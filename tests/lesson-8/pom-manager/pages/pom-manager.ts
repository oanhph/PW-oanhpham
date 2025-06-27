import { Page } from "@playwright/test";
import { RegisterPage } from "../../pages/register-page-pom-manager";
import { ProductPage } from "../../pages/product-page-pom-manager";
import { TodoPage } from "../../pages/todo-page-pom-manager";
import { PersonalNotePage } from "./personal-note-page-pom-manager";

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