import { test, expect } from "@playwright/test";
import { execSync } from "child_process";

function convert(text) {
    return text
        .replace(/Đ/g, "D")
        .replace(/đ/g, "d")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
};

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

let usernameValid = "k11-trang";
let passwordValid = "TCKoQJ4S3hKFyEamNgM0OwMK";
let tagName1 = "tag Oanh Pham";
let tagName2 = "tag Oanh Pham 02";
let tagName3 = "tag Oanh Pham 03";
let validSlug2 = "tag-OanhPham-02"; let expectedSlug2 = convert(validSlug2);
let validSlug3 = "Đây là tag đặc biệt @100 $200"; let expectedSlug3 = convert(validSlug3);
let categorySlug3 = "Đây là category đặc biệt @100 $200"; let expectedCategorySlug3 = convert(categorySlug3);
let categoryName3 = "category Oanh Pham 03";
let categoryName4 = "category Oanh Pham 04"; let expectedCategorySlug4 = convert(categoryName4);


test.describe("POST - Post", async () => {
    test.beforeEach(async ({ page }) => {
        await test.step("Go to Tag menu", async () => {
            await page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin");
            await page.locator(xpathUserName).fill(usernameValid);
            await page.locator(xpathPassword).fill(passwordValid);
            await page.click(xpathBtnLogin);

            await expect(page).toHaveURL(/wp-admin/);

            await page.hover(xpathMenuPosts);
            await page.click(xpathMenuTags);

            await expect(page.locator(xpathHeadingTags)).toBeVisible();
        })
    });


    test("@POST_TAG_001: Tag - add tag failed", async ({ page }) => {
        await test.step("Click button [Add New Tag]", async () => {
            await page.click(xpathBtnAddNew);

            await expect(page.locator(xpathMsgRequiredTagName)).toBeVisible();
        });

        await test.step("Submit the already exists name", async () => {
            await page.locator(xpathInputName).fill("lesson tag");
            await page.click(xpathBtnAddNew);

            await expect(page.locator(xpathMsgExisTagName)).toBeVisible();
        })
    });


    test("@POST_TAG_002: Tag - add tag success", async ({ page }) => {
        await test.step("Submit valid name", async () => {
            await page.locator(xpathInputName).fill(tagName1);
            await page.click(xpathBtnAddNew);

            await expect(page.locator(xpathMsgTagAdded)).toBeVisible();
            await expect(page.locator(`//a[text()='${tagName1}']`)).toBeVisible();
        });

        await test.step("Submit valid name & slug", async () => {
            await page.locator(xpathInputName).fill(tagName2);
            await page.locator(xpathInputSlug).fill(validSlug2);
            await page.click(xpathBtnAddNew);

            await expect(page.locator(xpathMsgTagAdded)).toBeVisible();
            await expect(page.locator(`//a[text()='${tagName2}']`)).toBeVisible();
            await expect(page.locator(`//td[text()='${expectedSlug2}']`)).toBeVisible();
        });

        await test.step("Remove tag", async () => {
            await page.hover(`//a[text()='${tagName1}']`);
            page.on("dialog", async dialog => dialog.accept());
            await page.click(`//a[@aria-label='Delete “${tagName1}”']`);

            await expect(page.locator(`//a[text()='${tagName1}']`)).toBeHidden();

            await page.hover(`//a[text()='${tagName2}']`);
            await page.click(`//a[@aria-label='Delete “${tagName2}”']`);

            await expect(page.locator(`//a[text()='${tagName2}']`)).toBeHidden();
        });
    });


    test("@POST_TAG_003: Tag - slug auto remove special character", async ({ page }) => {
        await test.step("Submit slug with special character", async () => {
            await page.locator(xpathInputName).fill(tagName3);
            await page.locator(xpathInputSlug).fill(validSlug3);
            await page.click(xpathBtnAddNew);

            await expect(page.locator(xpathMsgTagAdded)).toBeVisible();
            await expect(page.locator(`//a[text()='${tagName3}']`)).toBeVisible();
            await expect(page.locator(`//td[text()='${expectedSlug3}']`)).toBeVisible();
        });

        await test.step("Remove tag", async () => {
            await page.hover(`//a[text()='${tagName3}']`);
            page.on("dialog", async dialog => dialog.accept());
            await page.click(`//a[@aria-label='Delete “${tagName3}”']`);

            await expect(page.locator(`//a[text()='${tagName3}']`)).toBeHidden();
        })
    });


    test("@POST_CATEGORY_001: Category - create category success", async ({ page }) => {
        await test.step("Submit valid category, slug", async () => {
            await page.click(xpathMenuCategories);
            await page.locator(xpathInputName).fill(categoryName3);
            await page.locator(xpathInputSlug).fill(categorySlug3);
            await page.click(xpathBtnAddNew);

            await expect(page.locator(xpathMsgCategoryAdded)).toBeVisible();
            await expect(page.locator(`//td[text()='${expectedCategorySlug3}']`)).toBeVisible();
        });

        await test.step("Submit valid category, parent", async () => {
            await page.click(xpathMenuCategories);
            await page.locator(xpathInputName).fill(categoryName4);

            await expect(page.locator(xpathSelectParent)).toBeVisible();
            await page.locator(xpathSelectParent).selectOption({
                label: "k11 class"
            });
            await page.click(xpathBtnAddNew);

            await expect(page.locator(xpathMsgCategoryAdded)).toBeVisible();
            await expect(page.locator(`//td[text()='${expectedCategorySlug4}']`)).toBeVisible();
        });

        await test.step("Remove category", async () => {
            await page.click(xpathMenuCategories);
            await page.hover(`//a[text()='${categoryName3}']`);

            page.on("dialog", async dialog => dialog.accept());
            await page.click(`//a[@aria-label='Delete “${categoryName3}”']`);

            await expect(page.locator(`//a[text()='${categoryName3}']`)).toBeHidden();

            await page.hover(`//td[text()='${expectedCategorySlug4}']`);
            await page.click(`//a[@aria-label='Delete “${categoryName4}”']`);

            await expect(page.locator(`//td[text()='${expectedCategorySlug4}']`)).toBeHidden();
        });
    });
});
