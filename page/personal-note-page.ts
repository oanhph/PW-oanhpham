import { Page } from "@playwright/test";
import { MaterialBasePage } from "./base-page";

export class PersonalNote extends MaterialBasePage {

    constructor(page: Page) {
        super(page);
    }
}