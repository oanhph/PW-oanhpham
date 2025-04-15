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
    async addProductById(productId: number, quantity: number) {
        const xpath = this.getAddButtonXpathByProductId(productId);
        for (let i = 0; i < quantity; i++) {
            await this.page.click(xpath);
            await this.page.waitForTimeout(200);
        }
    }

    // Add more product based on config 
    async addProductsFromConfig(productConfig: Record<number, number>) {
        for (const [id, quantity] of Object.entries(productConfig)) {
            await this.addProductById(Number(id), quantity);
        }
    }

    // Veridy items in card
    async verifyCartItems(productNameToQuantity: Record<string, number>) {
        for (const [productName, expectedQuantity] of Object.entries(productNameToQuantity)) {
            const xpathQuantity = `//tbody[@id="cart-items"]/tr[td[1][text()="${productName}"]]/td[3]`;
            let actualQuantityText = await this.page.textContent(xpathQuantity);
            let actualQuantity = Number(actualQuantityText);

            if (expectedQuantity === actualQuantity) {
                console.log("Correct quantity");
            }
            else {
                console.log("Incorrect quantity");
            }
        }
    }

    // Verify total
    async verifyTotalFromProductConfig(productConfig: Record<number, number>) {
        let priceTable: Record<number, number> = {
            1: 10,
            2: 20,
            3: 30
        }
        let expectedTotal = 0;
        for (const [productId, quantity] of Object.entries(productConfig)) {
            let id = Number(productId);
            let productPrice = priceTable[id];

            expectedTotal += productPrice * quantity;
        }
        const xpathTotal = "//tfoot/tr/td[2]";
        const totalText = await this.page.textContent(xpathTotal);
        const actualTotal = Number(totalText);

        if (expectedTotal === actualTotal) {
            console.log("Correct total");
        }
        else {
            console.log("Incorrect total");
        }
    }
}


/** verifyCartTotal(productNameToTotal) - productName, expectedTotal
    xpathTotalEachItem
    totalEachItemText 
    totalEachItem 
    expectedTotal 
    actualTotal = 
*/
