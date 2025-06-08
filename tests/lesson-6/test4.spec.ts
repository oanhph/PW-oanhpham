import test from "@playwright/test";
import { PersonalNote } from "../../page/personal-note-page";

test("Ex4: Personal note", async ({ page }) => {
    let personalNote = new PersonalNote(page);
    let titles, contents;

    await test.step("Clone data from VNExpress", async () => {
        await page.goto("https://vnexpress.net/khoa-hoc", { waitUntil: "domcontentloaded" });
        titles = await page.locator("//h3[@class='title-news']/a").allTextContents();
        contents = await page.locator("//p[@class='description']/a").allTextContents();
        console.log(titles);
    })

    await test.step("Navigate to Personal Notes page", async () => {
        await personalNote.openMaterialPage("https://material.playwrightvn.com/");
        await personalNote.gotoPage("personal note");
    })

    await test.step("Add 5 notes", async () => {
        for (let i = 0; i <= 4; i++) {
            await personalNote.fillTitle(titles[i]);
            await personalNote.fillContent(contents[i]);
            await personalNote.clickAddNote()
        }
    })
    //     let notes: { title: string, content: string }[] = [];
})