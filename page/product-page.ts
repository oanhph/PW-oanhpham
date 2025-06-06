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