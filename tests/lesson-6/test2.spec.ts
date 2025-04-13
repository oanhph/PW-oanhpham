import { test, expect } from "@playwright/test";
import { ProductPage } from "../../page/product-page";

test("Ex2: Product Page", async ({ page }) => {
    const productPage = new ProductPage(page);

    await test.step("Navigate to Product page", async () => {
        await productPage.openMaterialPage("https://material.playwrightvn.com/");
        await productPage.gotoPage("product");
    })

    await test.step("Add product", async () => {
        let productConfig = {
            1: 2,
            2: 3,
            3: 1
        }
        await productPage.addProductsFromConfig(productConfig);
    })
})