import { ElementHandle, Locator, Page } from "@playwright/test";
import { MaterialBasePage } from "./base-page";

export class TodoPage extends MaterialBasePage {
    inputTask: Locator;
    btnAddTask: Locator;
    elmTask: Locator;
    listTask: Locator;

    constructor(page: Page) {
        super(page);
        this.inputTask = page.locator("//input[@id='new-task']");
        this.btnAddTask = page.locator("//button[@id='add-task']");
        this.listTask = page.locator("//ul[@id='task-list']");
        // this.btnDeleteTask = page.locator(`//button[@id='todo-${i}-delete']`);
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

    // Get all tasks
    // async getAllTasks() {
    //     return this.listTask.locator("//li"); 
    // }

    // Get all tasks
    async getAllTasks() {
        return this.listTask.locator("//li"); 
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



    // Delete odd numbered items
    // async deleteOddTasks() {
    //     // this.page.on("dialog", async dialog => dialog.accept());

    //     let countTasks = await this.listTask.elementHandles();

    //     for (let i = 0; i < countTasks.length; i += 2) {
    //         countTasks = await this.listTask.elementHandles();
            
    //         const oddTask = countTasks[i];
    //         console.log(countTasks);
    //         const btnOddDelete = await oddTask.$("button[id$='-delete']");
    //         if (btnOddDelete !== null) {
    //             await btnOddDelete.click();
    //         }
    //     }
    // }










// this.page.on("dialog", async dialog => dialog.accept());
// let countTasks = await this.listTask.count();
// for (let i = countTasks -1 ; i>=0; i -= 2) {
//     let oddTask = this.listTask.nth(i);
//     let btnOddDelete = oddTask.locator("button[id$='-delete']").first();
//     await btnOddDelete.click();
//     await this.page.waitForTimeout(500);
//         countTasks = await this.listTask.count();
// };