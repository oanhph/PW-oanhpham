import { Page } from "@playwright/test";

export class MediaPage08 {
    page: Page;
    xpathBtnAddNewMediaFile = "//h1[text()='Media Library']/following-sibling::a";
    xpathBtnSelectFile = "//input[@type='file']";
    xpathBtnBulkSelect = "//button[contains(text(),'Bulk select')]";
    xpathFile = "//h2[text()='Media list']/following::li[contains(@aria-label,'data-media')]"
    xpathBtnDeletePermanently = "//select[@id='media-attachment-filters']/following-sibling::button[contains(text(),'Delete permanently')]";
    xpathUploading = "//li[contains(@class,'uploading')]";

    constructor(page: Page) {
        this.page = page;
    }

    async uploadFile(filePath: string) {
        await this.page.click(this.xpathBtnAddNewMediaFile);
        await this.page.locator(this.xpathBtnSelectFile).setInputFiles(filePath);
    }

    async waitForUploaded() {
        await this.page.waitForSelector(this.xpathUploading, { state: "hidden" });
    }

    async deleteFile() {
        await this.page.click(this.xpathFile);
        await this.page.waitForLoadState("load");
        await this.page.click(this.xpathBtnDeletePermanently);
    }
}