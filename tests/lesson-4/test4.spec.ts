import { test, expect} from "@playwright/test";

test("Add 10 notes and search title", async ({page}) => {
    await page.goto("https://material.playwrightvn.com/");
    await expect(page).toHaveTitle(/Tài liệu học automation test/);

    // function addNote(noteTitle, noteConitent) {
    //     s
    // }

    await page.click("//a[@href='04-xpath-personal-notes.html']");
    await expect(page).toHaveTitle(/Personal Notes/);

    let dataTest4 = require('./data-lesson-4.json');
    for (let record of dataTest4) {
        await page.fill("//input[@id='note-title']", record.noteTitle);
        await page.fill("//textarea[@id='note-content']", record.noteContent);
    };
    
    await page.click("//button[@id='add-note']");
     
});