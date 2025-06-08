import { Page } from "@playwright/test";
import { MaterialBasePage } from "./base-page";

export class PersonalNote extends MaterialBasePage {
    xpathTitle = "//input[@type='text' and @id='note-title']";
    xpathContent = "//textarea[@id='note-content']";
    xpathBtnAddNote = "//button[@id='add-note']";
    xpathSearchNotes = "//input[@type= 'text' and @id= 'search']";

    constructor(page: Page) {
        super(page);
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
}