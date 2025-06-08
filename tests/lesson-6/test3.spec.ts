import {test, expect } from "@playwright/test";
import { TodoPage } from "../../page/todo-page";

test("Ex3: Todo page", async ({ page }) => {
    let todoPage = new TodoPage(page);

    await test.step("Navigate to Todo page", async () => {
        await todoPage.openMaterialPage("https://material.playwrightvn.com/");
        await todoPage.gotoPage("todo");
    })

    await test.step("Add 100 todo items", async () => {
        for (let i = 1; i <= 100; i++) {
            await todoPage.addTasks(`Todo ${i}`);
        }
    })

    await test.step("Delete odd numbered tasks", async () => {
        page.on("dialog", async dialog => dialog.accept());
        for (let i = 1; i <= 100; i += 2) {
            await todoPage.deleteTask(`Todo ${i}`);
        }
    })

    await test.step('Kiểm tra todo có số thứ tự 90 nằm trong viewport', async () => {
        const xpathTodo90 = todoPage.getLocatorTask("Todo 90");
        await expect(xpathTodo90).toBeInViewport({ timeout: 5000 });
    })

    // await test.step("Verify Todo 21 in DOM", async () => {
    //     let result = await todoPage.verifyElementInDOM(21);
    //     console.log(result);
    // })
})