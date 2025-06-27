import { Locator, Page } from "@playwright/test";

export class TodoPage {
    page: Page;
    inputTask: Locator;
    btnAddTask: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inputTask = page.locator("//input[@id='new-task']");
        this.btnAddTask = page.locator("//button[@id='add-task']");
    }

    async goToRegisterPage() {
        await this.page.goto("https://material.playwrightvn.com/");
        await this.page.click(`//a[contains(text(),'Todo page')]`);
    }

    // add task 
    async addTasks(content: string) {
        await this.inputTask.fill(content);
        await this.btnAddTask.click();
    }

    // delete task
    async deleteTask(content: string) {
        const xpath = (content.replace(" ", "-")).toLowerCase();
        await this.page.locator(`//button[@id="${xpath}-delete"]`).click();
    }

    // get locator task 
    getLocatorTask(taskName: string) {
        return this.page.locator(`//span[contains(text(), "${taskName}")]`)
    }
}