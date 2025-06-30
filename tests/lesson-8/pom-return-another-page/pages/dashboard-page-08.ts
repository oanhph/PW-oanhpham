import { Page } from "@playwright/test";
import { TagsPage08 } from "./tags-page-08";
import { MediaPage08 } from "./media-page-08";

export class DashboardPage08 {
    page: Page;
    xpathMenuPosts = "//div[contains(text(),'Posts')]";
    xpathMenuTags = "//a[contains(text(),'Tags')]";
    xpathMenuMedia = "//div[contains(text(),'Media')]";
    xpathMenuLibrary = "//a[contains(text(),'Library')]";

    constructor(page: Page) {
        this.page = page;
    }

    async goToTagsPage() {
        await this.page.click(this.xpathMenuPosts);
        await this.page.click(this.xpathMenuTags);
        return new TagsPage08(this.page);
    }

    async goToMediaPage() {
        await this.page.click(this.xpathMenuMedia);
        await this.page.click(this.xpathMenuLibrary);
        return new MediaPage08(this.page);
    }
}