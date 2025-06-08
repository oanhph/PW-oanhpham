import { ElementHandle, Locator, Page } from "@playwright/test";
import { MaterialBasePage } from "./base-page";

export class TodoPage extends MaterialBasePage {
    inputTask: Locator;
    btnAddTask: Locator;

    constructor(page: Page) {
        super(page);
        this.inputTask = page.locator("//input[@id='new-task']");
        this.btnAddTask = page.locator("//button[@id='add-task']");
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
