import { Locator, Page } from "@playwright/test";

export class MaterialBasePage {
    page: Page;
    xpathRegisterPage: string;
    xpathProductPage: string;
    cssTodoPage: string;
    personalNote: Locator;

    constructor(page: Page) {
        this.page = page;
        this.xpathRegisterPage = "//a[@href='01-xpath-register-page.html']";
        this.xpathProductPage = "//a[@href='02-xpath-product-page.html']";
        this.cssTodoPage = "a[href='03-xpath-todo-list.html']";
        this.personalNote = page.locator("//a[@href='04-xpath-personal-notes.html']");
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
            case "personal note":
                await this.personalNote.click();
        }
    }
}