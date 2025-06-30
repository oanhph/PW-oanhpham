import { Page } from "@playwright/test";

export class TagsPage08 {
    page: Page;
    xpathInputName = "//input[@id='tag-name']";
    xpathInputSlug = "//input[@id='tag-slug']";
    xpathBtnAddNew = "//input[@id='submit']";

    constructor(page: Page) {
        this.page = page;
    }

    async addTag(tag: Tag) {
        await this.page.fill(this.xpathInputName, tag.name);
        await this.page.fill(this.xpathInputSlug, tag.slug);
        await this.page.click(this.xpathBtnAddNew)
    }
}

export interface Tag {
    name: string;
    slug: string;
    description: string;
}