import { ElementHandle, Locator, Page } from "@playwright/test";
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
        this.listTask = page.locator("//ul/li");
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

    // Get all tasks
    // async getAllTasks() {
    //     return this.listTask.locator("//li"); 
    // }

    // Delete odd numbered items
    async deleteOddTasks() {
        this.page.on("dialog", async dialog => dialog.accept());
        let countTasks = await this.listTask.count();
        for (let i = countTasks - 1; i >= 0; i -= 2) {
            let oddTask = this.listTask.nth(i);
            let btnOddDelete = oddTask.locator("button[id$='-delete']").first();
            await btnOddDelete.click();
            countTasks = await this.listTask.count();
        };
    }

    // Verify task is in viewport

    // async verifyTaskInViewport(taskIndex: number) {
    //     const taskLocator = (await this.getAllTasks()).nth(taskIndex);
    //     const taskHandle = await taskLocator.elementHandle() as ElementHandle<HTMLElement>;

    //     if (!taskHandle) {
    //         console.log(`Todo ${taskIndex + 1} không tồn tại hoặc không hiển thị.`);
    //         return;
    //     }

    //     const isInViewport = await taskHandle.isInViewport();

    //     console.log(`Todo ${taskIndex + 1} is ${isInViewport ? "" : "NOT "}in the viewport.`);
    // }





    // async verifyTaskInViewport(taskIndex: number) {
    //     let tasks = await this.getAllTasks(); 
    //     let taskLocator = tasks.nth(taskIndex);
    //     let taskHandle = await taskLocator.elementHandles();
    //     let isInViewport = await taskHandle.isInViewport(); 
    //     if (isInViewport) {
    //         console.log("Is in the viewport");
    //     }
    //     else {
    //         console.log("Not in the viewport");
    //     }

    // }
}














