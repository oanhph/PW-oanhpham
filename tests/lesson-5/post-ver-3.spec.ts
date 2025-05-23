import { test, expect } from "@playwright/test";

function getXpathNameInTable(name: string) {
    return `//tbody//a[contains(text(),'${name}')]`;
}

function getXpathSlugInTable(slug: string) {
    const convertToSlug = slug
        .replace(/Đ/g, "D")
        .replace(/đ/g, "d")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
    return `//td[text()='${convertToSlug}']`
}

function getXpathBtnDelete(name: string) {
    return `//a[@aria-label='Delete “${name}”']`
}

let xpathUserName = "//input[@id='user_login']";
let xpathPassword = "//input[@id='user_pass']";
let xpathBtnLogin = "//input[@id='wp-submit']";
let xpathMenuPosts = "//div[contains(text(),'Posts')]";
let xpathMenuTags = "//a[contains(text(),'Tags')]";
let xpathHeadingTags = "//h1[text()='Tags']";
let xpathInputName = "//input[@id='tag-name']";
let xpathInputSlug = "//input[@id='tag-slug']";
let xpathBtnAddNew = "//input[@id='submit']";
let xpathMsgRequiredTagName = "//p[text()='A name is required for this term.']";
let xpathMsgExisTagName = "//p[text()='A term with the name provided already exists in this taxonomy.']";
let xpathMsgTagAdded = "//p[text()='Tag added.']";
let xpathMenuCategories = "//a[text()='Categories']";
let xpathMsgCategoryAdded = "//p[text()='Category added.']";
let xpathSelectParent = "//select[@id='parent']";

let username = "k11-trang";
let password = "TCKoQJ4S3hKFyEamNgM0OwMK";
let tagName3 = "tag Oanh Pham 03";
let validSlug3 = "Đây là tag đặc biệt @100 $200";
// let categorySlug3 = "Đây là category đặc biệt @100 $200"; let expectedCategorySlug3 = convert(categorySlug3);
// let categoryName3 = "category Oanh Pham 03";
// let categoryName4 = "category Oanh Pham 04"; let expectedCategorySlug4 = convert(categoryName4);


test.describe("POST - Post", async () => {
    test.beforeEach(async ({ page }) => {
        await test.step("Go to Tag page", async () => {
            await page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin");
            await page.locator(xpathUserName).fill(username);
            await page.locator(xpathPassword).fill(password);
            await page.click(xpathBtnLogin);
            await page.waitForLoadState("load");
            await page.hover(xpathMenuPosts);
            await page.click(xpathMenuTags);
            await expect(page.locator(xpathHeadingTags)).toBeVisible();
        })
    });

    let existsName = "lesson tag";
    test("@POST_TAG_001: Tag - add tag failed", async ({ page }) => {
        await test.step("Click button [Add New Tag]", async () => {
            await page.click(xpathBtnAddNew);

            await expect(page.locator(xpathMsgRequiredTagName)).toBeVisible();
        });

        await test.step("Submit the already exists name", async () => {
            await page.locator(xpathInputName).fill(existsName);
            await page.click(xpathBtnAddNew);

            await expect(page.locator(xpathMsgExisTagName)).toBeVisible();
        })
    });

    let name1 = "tag Oanh Pham";
    let name2 = "Rennie Pham";
    let slug2 = "rennie-pham";
    test("@POST_TAG_002: Tag - add tag success", async ({ page }) => {
        await test.step("Submit valid name", async () => {
            await page.locator(xpathInputName).fill(name1);
            await page.click(xpathBtnAddNew);

            await expect(page.locator(xpathMsgTagAdded)).toBeVisible();
            await expect(page.locator(getXpathNameInTable(name1))).toBeVisible();
        });

        await test.step("Submit valid name & slug", async () => {
            await page.locator(xpathInputName).fill(name2);
            await page.locator(xpathInputSlug).fill(slug2);
            await page.click(xpathBtnAddNew);

            await expect(page.locator(xpathMsgTagAdded)).toBeVisible();
            await expect(page.locator(getXpathNameInTable(name2))).toBeVisible();
            await expect(page.locator(getXpathSlugInTable(slug2))).toBeVisible();
        });

        await test.step("Remove tag", async () => {
            page.on("dialog", async dialog => dialog.accept());

            await page.locator(getXpathNameInTable(name1)).hover();
            await page.locator(getXpathBtnDelete(name1)).click();
            await expect(page.locator(getXpathNameInTable(name1))).toBeHidden();

            await page.locator(getXpathNameInTable(name2)).hover();
            await page.locator(getXpathBtnDelete(name2)).click();
            await expect(page.locator(getXpathNameInTable(name2))).toBeHidden();
        });
    });


    // test("@POST_TAG_003: Tag - slug auto remove special character", async ({ page }) => {
    //     await test.step("Submit slug with special character", async () => {
    //         await page.locator(xpathInputName).fill(tagName3);
    //         await page.locator(xpathInputSlug).fill(validSlug3);
    //         await page.click(xpathBtnAddNewTag);

    //         await expect(page.locator(xpathMsgTagAdded)).toBeVisible();
    //         await expect(page.locator(`//a[text()='${tagName3}']`)).toBeVisible();
    //         await expect(page.locator(`//td[text()='${expectedSlug3}']`)).toBeVisible();
    //     });

    //     await test.step("Remove tag", async () => {
    //         await page.hover(`//a[text()='${tagName3}']`);
    //         page.on("dialog", async dialog => dialog.accept());
    //         await page.click(`//a[@aria-label='Delete “${tagName3}”']`);

    //         await expect(page.locator(`//a[text()='${tagName3}']`)).toBeHidden();
    //     })
    // });

    //         await test.step("Remove category", async () => {
    //             await page.click(xpathMenuCategories);
    //             await page.hover(`//a[text()='${categoryName3}']`);

    //             page.on("dialog", async dialog => dialog.accept());
    //             await page.click(`//a[@aria-label='Delete “${categoryName3}”']`);

    //             await expect(page.locator(`//a[text()='${categoryName3}']`)).toBeHidden();

    //             await page.hover(`//td[text()='${expectedCategorySlug4}']`);
    //             await page.click(`//a[@aria-label='Delete “${categoryName4}”']`);

    //             await expect(page.locator(`//td[text()='${expectedCategorySlug4}']`)).toBeHidden();
    //         });
    //     });
});


test.describe("POST - Category", async () => {
    let arrCategories = [
        {
            name: "category Oanh Pham 03",
            slug: "Đây là category đặc biệt @100 $200",
            expect: "day-la-category-dac-biet-100-200",
            parent: ""
        },
        {
            name: "category Oanh Pham 04",
            slug: "",
            expect: "",
            parent: "k11 class"
        }
    ]

    test.beforeEach(async ({ page }) => {
        await test.step("Go to Category page", async () => {
            await page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin");
            await page.locator(xpathUserName).fill(username);
            await page.locator(xpathPassword).fill(password);
            await page.click(xpathBtnLogin);
            await page.waitForLoadState("load");
            await page.hover(xpathMenuPosts);
            await page.click(xpathMenuCategories);
        })
    });
    test("@POST_CATEGORY_001: Category - create category success", async ({ page }) => {
        for (let i = 0; i < arrCategories.length; i++) {
            await test.step("Add new category", async () => {
                await page.fill(xpathInputName, arrCategories[i].name);
                if (arrCategories[i].slug != "") {
                    await page.fill(xpathInputSlug, arrCategories[i].slug);
                }

                if (arrCategories[i].parent != "") {
                    await page.selectOption(xpathSelectParent, arrCategories[i].parent);
                }

                await page.click(xpathBtnAddNew);

                // verify msg success
                await expect(page.locator(xpathMsgCategoryAdded)).toBeVisible();

                // verify tag name in list tag
                await expect(page.locator(getXpathNameInTable(arrCategories[i].name))).toBeVisible({ timeout: 5000 });

                // verify slug name in list tag
                if (arrCategories[i].slug != "") {
                    await expect(page.locator(getXpathSlugInTable(arrCategories[i].expect))).toBeVisible();
                }
            })
        }
    })
})