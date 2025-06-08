import { Page } from "@playwright/test";
import { MaterialBasePage } from "./base-page";

export class ProductPage extends MaterialBasePage {

    constructor(page: Page) {
        super(page);
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

    // async getInfoNewestInTable() {
    //     const numberOfRows = await this.page.locator("//tbody/tr").count();
    //     const actualUsername = await this.page.locator(`//tbody/tr[${numberOfRows}]/td[2]`).textContent();
    //     let userInfo = {
    //         username: actualUsername,
    //         email: await this.page.locator(`//tbody/tr[${numberOfRows}]/td[3]`).textContent(),
    //         infomation: await this.page.locator(`//tbody/tr[${numberOfRows}]/td[4]`).textContent(),
    //     }

    //     return userInfo;
    // }

    // async addProductById(productId: number, quantity: number) {
    //     const xpath = this.getAddButtonXpathByProductId(productId);
    //     for (let i = 0; i < quantity; i++) {
    //         await this.page.click(xpath);
    //         await this.page.waitForTimeout(200);
    //     }
    // }

    // // Add more product based on config 
    // async addProductsFromConfig(productConfig: Record<number, number>) {
    //     for (const [id, quantity] of Object.entries(productConfig)) {
    //         await this.addProductById(Number(id), quantity);
    //     }
    // }

}