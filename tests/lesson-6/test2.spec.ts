import { test, expect } from "@playwright/test";
import { ProductPage } from "../../page/product-page";

test("Ex2: Product Page", async ({ page }) => {
    let productPage = new ProductPage(page);
    let productConfig = {
        1: 2,
        2: 3,
        3: 1
    };
    let productNameToQuantity = {
        "Product 1": 2,
        "Product 2": 3,
        "Product 3": 1
    };

    await test.step("Navigate to Product page", async () => {
        await productPage.openMaterialPage("https://material.playwrightvn.com/");
        await productPage.gotoPage("product");
    })

    await test.step("Add product", async () => {
        await productPage.addProductsFromConfig(productConfig);
    })

    await test.step("Verify items in card", async () => {
        await productPage.verifyCartItems(productNameToQuantity);
    })

    await test.step("Verify total", async () => {
        await productPage.verifyTotalFromProductConfig(productConfig);
    })
})
