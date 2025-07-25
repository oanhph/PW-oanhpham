import { test, expect } from "@playwright/test";
import { POMManager } from "./pages/pom-manager";
import { ProductPage } from "./pages/product-page-pom-manager";

test("Ex2: Product Page", async ({ page }) => {
    const pomManager = new POMManager(page);
    const productPage = pomManager.getProductPage();
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
        await productPage.goToProductPage();
        expect(productPage).toBeInstanceOf(ProductPage);
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
            expect(actualQtyProduct).toEqual(expectQtyProduct);
        }
    })

    await test.step("Verify total price", async () => {
        for (let i = 0; i < arrProducts.length; i++) {
            const actualTotalProduct = (await productPage.getInfoProductInTable(arrProducts[i].name)).total;
            const total = arrProducts[i].quantity * arrProducts[i].price;
            const expectTotalProduct = '$' + total.toFixed(2);
            expect(actualTotalProduct).toEqual(expectTotalProduct);
        }
    })
})
