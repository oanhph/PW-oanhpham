import { test, expect } from "@playwright/test";
import { ProductPage } from "../../page/product-page";

test("Ex2: Product Page", async ({ page }) => {
    const productPage = new ProductPage(page);
    const arrProducts = [
        {
            name: "Product 1",
            id: 1,
            price: 10,
            quantity: 2
        },
        {
            name: "Product 2",
            id: 2,
            price: 20,
            quantity: 3
        },
        {
            name: "Product 3",
            id: 3,
            price: 30,
            quantity: 1
        }
    ]

    await test.step("Navigate to Product page", async () => {
        await productPage.openMaterialPage("https://material.playwrightvn.com/");
        await productPage.gotoPage("product");
    })

    await test.step("Add product to cart", async () => {
        for (let i = 0; i < arrProducts.length; i++) {
            await productPage.addProductToCart(arrProducts[i].id, arrProducts[i].quantity);
        }
    })

    await test.step("Verify quantity", async () => {
        for (let i = 0; i < arrProducts.length; i++) {
            const actualQtyProduct = (await productPage.getInfoProductInTable(arrProducts[i].name)).quantity;
            const expectQtyProduct = arrProducts[i].quantity;
            expect(actualQtyProduct).toBe(expectQtyProduct);
        }
    })

    await test.step("Verify total price", async() => {
        const actualTotalPrice = await productPage.getAllInfoNewestInTable(producIn)
    })
})