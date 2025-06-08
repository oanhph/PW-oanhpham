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
    async getAllInfoNewestInTable() {
        const numberOfRows = await this.page.locator("//tbody/tr").count();
        let productInfo: { productName: String, quantity: Number , total: Number}[] = [];
        for (let i = 1; i <= numberOfRows; i++) {
            let productName = await this.page.locator(`//tbody/tr[${i}]/td[1]`).textContent();
            let quantity = await this.page.locator(`//tbody/tr[${i}]/td[3]`).textContent();
            let total = await this.page.locator(`//tbody/tr[${i}]/td[4]`).textContent();

            productInfo.push({
                productName: productName?.trim() || "",
                quantity: Number(quantity),
                total: Number(total)
            });
        }
        return productInfo;
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