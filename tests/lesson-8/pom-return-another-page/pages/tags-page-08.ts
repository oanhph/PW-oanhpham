import { Page } from "@playwright/test";

export class TagsPage08 {
    page: Page;
    xpathInputName = "//input[@id='tag-name']";
    xpathInputSlug = "//input[@id='tag-slug']";
    xpathBtnAddNew = "//input[@id='submit']";
    xpathTagsList = "//tbody[@id='the-list']//tr/td";
    xpathBulkAction = "//select[@id='bulk-action-selector-top']";
    xpathApplyBtn = "//input[@id='doaction2']";

    constructor(page: Page) {
        this.page = page;
    }

    async addTag(tag: Tag) {
        await this.page.fill(this.xpathInputName, tag.name);
        await this.page.fill(this.xpathInputSlug, tag.slug);
        await this.page.click(this.xpathBtnAddNew)
    }

    async deleteTags(tagsList: string[]) {
        for (let tagName of tagsList) {
          await this.page.check(
            `//td[@data-colname='Name' and descendant::*[text()='${tagName}']]/preceding-sibling::th/input`
          );
        }
        await this.page.selectOption(this.xpathBulkAction, "Delete");
        await this.page.click(this.xpathApplyBtn);
      }
}

export interface Tag {
    name: string;
    slug: string;
    description: string;
}