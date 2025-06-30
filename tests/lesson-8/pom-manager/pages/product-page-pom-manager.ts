import { Page } from "@playwright/test";

export class ProductPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goToProductPage() {
        await this.page.goto("https://material.playwrightvn.com/");
        await this.page.click(`//a[contains(text(),'Product page')]`);
    }

    // Generate xpath based on product ID
    getAddButtonXpathByProductId(productId: number): string {
        return `//button[@class='add-to-cart' and @data-product-id='${productId}']`;
    }

    // Add product by ID
    async addProductToCart(productId: number, quantity: number) {
        const xpath = this.getAddButtonXpathByProductId(productId);
        await this.page.locator(xpath).click({ clickCount: quantity })
    }

    // Get product info
    async getInfoProductInTable(productName: string) {
        const price = await this.page.locator(`//td[contains(text(),'${productName}')]/following::td[1]`).textContent();
        const quantity = await this.page.locator(`//td[contains(text(),'${productName}')]/following::td[2]`).textContent();
        const total = await this.page.locator(`//td[contains(text(),'${productName}')]/following::td[3]`).textContent();
        const infoProduct = {
            price: price?.trim() || "",
            quantity: Number(quantity ?? "0"),
            total: total?.trim() || ""
        };
        return infoProduct;
    }
}