import test, { expect } from "@playwright/test";
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

    await test.step("Search note by title", async () => {
        await personalNote.searchNote("Giải thưởng");
    })

    await test.step("Verify all note that has title include the searched keyword", async () => {
        const listTitles = await personalNote.getAllTitleInList();
        for (let i = 0; i < listTitles.length; i++) {
            expect(listTitles[i]).toContain("Giải thưởng");
        }
    })
})
