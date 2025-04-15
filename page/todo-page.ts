import { ElementHandle, Locator, Page } from "@playwright/test";
import { MaterialBasePage } from "./base-page";

export class TodoPage extends MaterialBasePage {
    inputTask: Locator;
    btnAddTask: Locator;
    elmTask: Locator;

    constructor(page: Page) {
        super(page);
        this.inputTask = page.locator("//input[@id='new-task']");
        this.btnAddTask = page.locator("//button[@id='add-task']");
        this.elmTask = page.locator("//ul/li");
    }

    // Add task 
    async addTasks(count: number) {
        for (let i = 1; i <= count; i++) {
            await this.inputTask.fill(`Todo ${i}`);
            await this.btnAddTask.click();
        }
    }

    // Delete odd numbered items
    async deleteOddTasks() {
        this.page.on("dialog", async dialog => dialog.accept());
        let countTasks = await this.elmTask.count();
        for (let i = countTasks - 1; i >= 0; i -= 2) {
            let oddTask = this.elmTask.nth(i);
            let btnOddDelete = oddTask.locator("button[id$='-delete']").first();
            await btnOddDelete.click();
            countTasks = await this.elmTask.count();
        };
    }

    // Verify task is in viewport
    async verifyTaskInViewport(taskIndex: number) {
        let taskLocator = this.elmTask.nth(taskIndex);

        let isInViewport = await taskLocator.evaluate((el) => {
            let rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        });

        console.log(`Task ${taskIndex + 1} ${isInViewport ? "nằm" : "không nằm"} trong viewport.`);
    }

    // Verify task order is in DOM 
    async verifyElementInDOM(taskNumber: number): Promise<boolean> {
        let taskText = this.page.locator(`//li[span[text()='Todo ${taskNumber}']]`);
        let count = await taskText.count();

        if (count === 0) {
            return false;
        } else {
            return true;
        }
    }
}
