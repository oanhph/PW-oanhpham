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

test.describe("POST - Post tag failed", async () => {
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

    test("@POST_TAG_001: Tag - add tag failed", async ({ page }) => {
        let existsName = "lesson tag";

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



    // await test.step("Remove tag", async () => {
    //     page.on("dialog", async dialog => dialog.accept());

    //     await page.locator(getXpathNameInTable(name1)).hover();
    //     await page.locator(getXpathBtnDelete(name1)).click();
    //     await expect(page.locator(getXpathNameInTable(name1))).toBeHidden();

    //     await page.locator(getXpathNameInTable(name2)).hover();
    //     await page.locator(getXpathBtnDelete(name2)).click();
    //     await expect(page.locator(getXpathNameInTable(name2))).toBeHidden();
    // });


});

test.describe("POST - Add Tag success", async () => {
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

    test.afterEach(async ({ page }) => {
        page.on("dialog", async dialog => dialog.accept());

        await page.locator(getXpathNameInTable(name1)).hover();
        await page.locator(getXpathBtnDelete(name1)).click();
        await expect(page.locator(getXpathNameInTable(name1))).toBeHidden();

        await page.locator(getXpathNameInTable(name2)).hover();
        await page.locator(getXpathBtnDelete(name2)).click();
        await expect(page.locator(getXpathNameInTable(name2))).toBeHidden();

        await page.locator(getXpathNameInTable(name3)).hover();
        await page.locator(getXpathBtnDelete(name3)).click();
        await expect(page.locator(getXpathNameInTable(name3))).toBeHidden();
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
    });
    let name3 = "tag Oanh Pham 03";
    let slug3 = "Đây là tag đặc biệt @100 $200";
    test("@POST_TAG_003: Tag add tag with special characters in slug", async ({ page }) => {
        test.step("Submit special tag", async () => {
            await page.locator(xpathInputName).fill(name3);
            await page.locator(xpathInputSlug).fill(slug3);
            await page.click(xpathBtnAddNew);

            await expect(page.locator(xpathMsgTagAdded)).toBeVisible();
            await expect(page.locator(getXpathNameInTable(name3))).toBeVisible();
            await expect(page.locator(getXpathSlugInTable(slug3))).toBeVisible();
        })
    })
})


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

    test.afterEach(async ({ page }) => {
        page.on("dialog", async dialog => dialog.accept());

        for (let i = 0; i < arrCategories.length; i++) {
            await test.step("Remove category", async () => {
                await page.locator(getXpathNameInTable(arrCategories[i].name)).hover();
                await page.locator(getXpathBtnDelete(arrCategories[i].name)).click();

                // Verify delete success 
                await page.reload();
                await expect(page.locator(getXpathNameInTable(arrCategories[i].name))).not.toBeVisible();
            })
        }
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

                // Verify msg success
                await expect(page.locator(xpathMsgCategoryAdded)).toBeVisible();

                // Verify tag name in list tag
                await expect(page.locator(getXpathNameInTable(arrCategories[i].name))).toBeVisible({ timeout: 5000 });

                // Verify slug name in list tag
                if (arrCategories[i].slug != "") {
                    await expect(page.locator(getXpathSlugInTable(arrCategories[i].expect))).toBeVisible();
                }
            })
        }
    })
})