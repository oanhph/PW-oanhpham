import test from "@playwright/test";
import { TodoPage } from "../../page/todo-page";

test("Ex3: Todo page", async ({ page }) => {
    let todoPage = new TodoPage(page);

    await test.step("Navigate to Todo page", async () => {
        await todoPage.openMaterialPage("https://material.playwrightvn.com/");
        await todoPage.gotoPage("todo");
    })

    await test.step("Add 100 todo items", async () => {
        await todoPage.addTasks(4);
    })

    await test.step("Delete odd numbered tasks", async () => {
        page.on("dialog", async dialog => dialog.accept());
        await todoPage.deleteOddTasks();
    })
})