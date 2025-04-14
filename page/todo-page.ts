import { Locator, Page } from "@playwright/test";
import { MaterialBasePage } from "./base-page";

export class TodoPage extends MaterialBasePage {
    inputTask: Locator;
    btnAddTask: Locator;
    listTask: Locator;
    // btnDeleteTask: Locator;

    constructor(page: Page) {
        super(page);
        this.inputTask = page.locator("//input[@id='new-task']");
        this.btnAddTask = page.locator("//button[@id='add-task']");
        this.listTask = page.locator("//ul[@id='task-list']");
        // this.btnDeleteTask = page.locator(`//button[@id='todo-${i}-delete']`);
    }

    // Generate xpath based on text
    // getBtnDeleteTaskXpathByText(i: number): string {
    //     return `//button[@id='todo-${i}-delete']`;
    // }

    // Add task
    async addTasks(count: number) {
        for (let i = 1; i <= count; i++) {
            await this.inputTask.fill(`Todo ${i}`);
            await this.btnAddTask.click();
        }
    }

    // Delete odd numbered items
    async deleteOddTasks() {
        // this.page.on("dialog", async dialog => dialog.accept());

        let countTasks = await this.listTask.elementHandles();

        for (let i = 0; i < countTasks.length; i += 2) {
            countTasks = await this.listTask.elementHandles();
            const oddTask = countTasks[i];
            const btnOddDelete = await oddTask.$("button[id$='-delete']");
            if (btnOddDelete !== null) {
                await btnOddDelete.click();
            }
        }
    }
}














// this.page.on("dialog", async dialog => dialog.accept());
// let countTasks = await this.listTask.count();
// for (let i = countTasks -1 ; i>=0; i -= 2) {
//     let oddTask = this.listTask.nth(i);
//     let btnOddDelete = oddTask.locator("button[id$='-delete']").first();
//     await btnOddDelete.click();
//     await this.page.waitForTimeout(500);
//         countTasks = await this.listTask.count();
// };