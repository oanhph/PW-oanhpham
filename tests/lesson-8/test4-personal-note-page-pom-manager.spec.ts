import test, { expect } from "@playwright/test";
import { POMManager } from "./pages/pom-manager";
import { PersonalNotePage } from "./pages/personal-note-page-pom-manager";

test("Ex4: Personal note", async ({ page }) => {
    const pomManager = new POMManager(page);
    const personalNotePage = pomManager.getPersonalNotePage();
    let titles, contents;

    await test.step("Clone data from VNExpress", async () => {
        await page.goto("https://vnexpress.net/khoa-hoc", { waitUntil: "domcontentloaded" });
        titles = await page.locator("//h3[@class='title-news']/a").allTextContents();
        contents = await page.locator("//p[@class='description']/a").allTextContents();
        console.log(titles);
    })

    await test.step("Navigate to Personal Notes page", async () => {
        await personalNotePage.goToPersonalNotePage()
        expect(personalNotePage).toBeInstanceOf(PersonalNotePage);
    })

    await test.step("Add 5 notes", async () => {
        for (let i = 0; i <= 4; i++) {
            await personalNotePage.fillTitle(titles[i]);
            await personalNotePage.fillContent(contents[i]);
            await personalNotePage.clickAddNote()
        }
    })

    await test.step("Search note by title", async () => {
        await personalNotePage.searchNote("Giải thưởng");
    })

    await test.step("Verify all note that has title include the searched keyword", async () => {
        const listTitles = await personalNotePage.getAllTitleInList();
        for (let i = 0; i < listTitles.length; i++) {
            expect(listTitles[i]).toContain("Giải thưởng");
        }
    })
})
