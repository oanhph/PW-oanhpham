import { test, expect } from "@playwright/test";

let xpathUserName = '//input[@id="user_login"]';
let xpathPassword = '//input[@id="user_pass"]';
let xpathBtnSubmit = '//input[@id="wp-submit"]';
let xpathMenuPosts = "//div[text()='Posts']";
let xpathMenuTags = "//a[text()='Tags']";
let xpathInputName = "//input[@id='tag-name']";
let xpathBtnAddNewTag = "//input[@id='submit']";
let xpathInputSlug = "//input[@id='tag-slug']";
let xpathMsgTagAdded = "//p[text()='Tag added.']";
let xpathMsgRequired = "//p[text()='A name is required for this term.']";
let xpathMsgNameExist = "//p[text()='A term with the name provided already exists in this taxonomy.']";
let xpathMenuCategories = "//a[text()='Categories']";
let xpathMesCategoryAdded = "//p[text()='Category added.']";
let xpathBtnAddNewCategory = "//input[@value='Add New Category']";
let xpathSelectParent = "//select[@id='parent']";

const username = "1107-thu";
const password = "HV%MhRjgyljzRDnxZCB(^Wl&";

function getXpathTagNameInTable(name: string) {
    return `//tbody//a[contains(text(),'${name}')]`;
}

function getXpathSlugNameInTable(slug: string) {
    return `//td[text()='${slug}']`
}

function getXpathBtnDelete(name: string) {
    return `//a[@aria-label='Delete “${name}”']`;
}

test.describe("POST - Post Tag failed", async () => {
    test.beforeEach(async ({ page }) => {
        await test.step("Go to menu Tags", async () => {
            await page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin");
            await page.locator(xpathUserName).fill(username);
            await page.locator(xpathPassword).fill(password);
            await page.locator(xpathBtnSubmit).click();
            await page.locator(xpathMenuPosts).click();
            await page.locator(xpathMenuTags).click();
        })
    })

    test("@POST_TAG_001 - Tag - add tag failed", async ({ page }) => {
        await test.step("Click button 'Add New Tag'", async () => {
            await page.locator(xpathBtnAddNewTag).click();

            await expect(page.locator(xpathMsgRequired)).toBeVisible();
        })

        await test.step('Điền thông tin tag: name = "lesson tag", click button "Add New Tag"', async () => {
            await page.locator(xpathInputName).fill("lesson tag");
            await page.locator(xpathBtnAddNewTag).click();

            await expect(page.locator(xpathMsgNameExist)).toBeVisible();
        })
    })
})

test.describe("POST - Post Tag success", async () => {
    const name1 = "tag mentor";
    const slug1 = "";
    const name2 = "tag mentor 02";
    const slug2 = "tag-mentor-02";

    test.beforeEach(async ({ page }) => {
        await test.step("Go to menu Tags", async () => {
            await page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin");
            await page.locator(xpathUserName).fill(username);
            await page.locator(xpathPassword).fill(password);
            await page.locator(xpathBtnSubmit).click();
            await page.locator(xpathMenuPosts).click();
            await page.locator(xpathMenuTags).click();
        })

        page.on('dialog', async dialog => {
            await dialog.accept();
        })
    })

    test.afterEach(async ({ page }) => {
        await page.locator(getXpathTagNameInTable(name1)).hover();
        await page.locator(getXpathBtnDelete(name1)).click();

        await expect(page.locator(getXpathTagNameInTable(name1))).not.toBeVisible();
        await expect(page.locator(getXpathSlugNameInTable(slug1))).not.toBeVisible();

        await page.locator(getXpathTagNameInTable(name2)).hover();
        await page.locator(getXpathBtnDelete(name2)).click();

        await expect(page.locator(getXpathTagNameInTable(name2))).not.toBeVisible();
        await expect(page.locator(getXpathSlugNameInTable(slug2))).not.toBeVisible();
    })

    test("@POST_TAG_002 - Tag - add tag success", async ({ page }) => {
        await test.step('Điền thông tin tag: name = "tag {name}" (name là tên bạn) Click button "Add New Tag"', async () => {
            await page.locator(xpathInputName).fill(name1);
            await page.locator(xpathBtnAddNewTag).click();

            await expect(page.locator(xpathMsgTagAdded)).toBeVisible();
            await expect(page.locator(getXpathTagNameInTable(name1))).toBeVisible();
            // await expect(page.locator(getXpathSlugNameInTable(slug))).toBeVisible();
        });

        await test.step('Điền thông tin tag: name = "tag {name} 02", slug = "tag-${name}-02" Click button "Add New Tag"', async () => {
            await page.locator(xpathInputName).fill(name2);
            await page.locator(xpathInputSlug).fill(slug2);

            await page.locator(xpathBtnAddNewTag).click();

            await expect(page.locator(xpathMsgTagAdded)).toBeVisible();
            await expect(page.locator(getXpathTagNameInTable(name2))).toBeVisible();
            await expect(page.locator(getXpathSlugNameInTable(slug2))).toBeVisible();
        })
    })
})

test.describe("POST - Post Category", async () => {
    let arrCategories = [
        {
            name: "category mentor 03",
            slug: "Đây là category đặc biệt @100 $200",
            expect: "day-la-category-dac-biet-100-200",
            parent: ""
        },
        {
            name: "category mentor 04",
            slug: "",
            expect: "",
            parent: "k11 class"
        }
    ]

    test.beforeEach(async ({ page }) => {
        const username = "k8-ruby";
        const password = "zi%$zl1IlK2zGhcQ2*A)2wKC";

        await test.step("Go to menu Posts", async () => {
            await page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin");
            await page.locator(xpathUserName).fill(username);
            await page.locator(xpathPassword).fill(password);
            await page.click(xpathBtnSubmit);
            await page.click(xpathMenuPosts);
        })

        page.on('dialog', async dialog => {
            await dialog.accept();
        })
    })

    test.afterEach(async ({ page }) => {
        for (let i = 0; i < arrCategories.length; i++) {
            await test.step("Clear data test", async () => {
                await page.locator(getXpathTagNameInTable(arrCategories[i].name)).hover();
                await page.locator(getXpathBtnDelete(arrCategories[i].name)).click();

                // verify delete success
                await page.reload();
                await expect(page.locator(getXpathTagNameInTable(arrCategories[i].name))).not.toBeVisible();
            })
        }
    })

    test("@POST_CATEGORY_001 - Category - create category success", async ({ page }) => {
        await test.step("Go to Category page", async () => {
            await page.click(xpathMenuCategories);
        })

        for (let i = 0; i < arrCategories.length; i++) {
            await test.step("Fill tag name and add new tag", async () => {
                await page.fill(xpathInputName, arrCategories[i].name);
                if (arrCategories[i].slug != "") {
                    await page.fill(xpathInputSlug, arrCategories[i].slug);
                }

                if (arrCategories[i].parent != "") {
                    await page.selectOption(xpathSelectParent, arrCategories[i].parent);
                }

                await page.click(xpathBtnAddNewCategory);

                // verify msg success
                await expect(page.locator(xpathMesCategoryAdded)).toBeVisible();

                // verify tag name in list tag
                await expect(page.locator(getXpathTagNameInTable(arrCategories[i].name))).toBeVisible({ timeout: 5000 });

                // verify slug name in list tag
                if (arrCategories[i].slug != "") {
                    await expect(page.locator(getXpathSlugNameInTable(arrCategories[i].expect))).toBeVisible();
                }
            })
        }
    })
})