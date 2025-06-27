import { Page } from "@playwright/test";
export class PersonalNotePage {
    page: Page;
    xpathTitle = "//input[@type='text' and @id='note-title']";
    xpathContent = "//textarea[@id='note-content']";
    xpathBtnAddNote = "//button[@id='add-note']";
    xpathSearchNotes = "//input[@type= 'text' and @id= 'search']";

    constructor(page: Page) {
        this.page = page;
    }

    async goToPersonalNotePage() {
        await this.page.goto("https://material.playwrightvn.com/");
        await this.page.click(`//a[contains(text(),'Personal notes')]`);
    }

    async fillTitle(title: string) {
        await this.page.locator(this.xpathTitle).fill(title);
    }

    async fillContent(content: string) {
        await this.page.locator(this.xpathContent).fill(content);
    }

    async clickAddNote() {
        await this.page.locator(this.xpathBtnAddNote).click();
    }

    async searchNote(keyword: string) {
        await this.page.locator(this.xpathSearchNotes).fill(keyword);
    }

    async getAllTitleInList() {
        let listTitles: string[] = [];
        const countTitles = await this.page.locator("//ul/li/descendant::strong").count();
        for (let i = 1; i <= countTitles; i++) {
            let title = await this.page.locator(`(//ul/li/descendant::strong)[${i}]`).textContent();
            listTitles.push(title || "");
        }

        return listTitles;
    }
}