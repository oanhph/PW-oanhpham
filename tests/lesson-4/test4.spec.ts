import { test, expect } from "@playwright/test";

test("Add 10 notes and search title", async ({ page }) => {
    await page.goto("https://material.playwrightvn.com/");
    await expect(page).toHaveTitle(/Tài liệu học automation test/);

    await page.click("//a[@href='04-xpath-personal-notes.html']");
    await expect(page).toHaveTitle(/Personal Notes/);

    // Add note
    let dataTest4 = require('./data-lesson-4.json');
    for (let record of dataTest4) {
        await page.fill("//input[@id='note-title']", record.noteTitle);
        await page.fill("//textarea[@id='note-content']", record.noteContent);
        await page.click("//button[@id='add-note']");
    };

    // Search via title
    await page.locator("//input[@id='search']").pressSequentially("Việt Nam - Indonesia ký ý định thư về khoa học công nghệ", {
        delay: 100
    });
});
