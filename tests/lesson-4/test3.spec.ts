import { test, expect } from "@playwright/test";

test("Add 100 items and delete odd numbered items", async ({ page }) => {
    await page.goto("https://material.playwrightvn.com/");
    await expect(page).toHaveTitle(/Tài liệu học automation test/);

    await page.click("//a[@href='03-xpath-todo-list.html']");
    await expect(page).toHaveTitle(/To-Do List/);

    for (let i = 1; i <= 100; i++) {
        await page.fill("//input[@id='new-task']", "Todo <i>");
        await page.click("//button[@id='add-task']");
    };

    page.on("dialog", async dialog => dialog.accept());
    for (let i = 1; i <= 100; i += 2) {
        await page.click("//button[@id='todo-i--delete']");
    };
});
