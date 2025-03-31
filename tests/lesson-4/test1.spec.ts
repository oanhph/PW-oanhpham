import { test, expect } from "@playwright/test";

test("Submit valid values in User Registration form", async ({ page }) => {
    await page.goto("https://material.playwrightvn.com/");
    await expect(page).toHaveTitle(/Tài liệu học automation test/);

    await page.click("//a[@href='01-xpath-register-page.html']");
    await expect(page).toHaveTitle(/User Registration/);

    await page.locator("//input[@id='username']").pressSequentially("Oanh Pham", {
        delay: 100,
    });

    await page.fill("//input[@id='email']", "test@gmail.com");

    await page.locator("//input[@id='male']").check();

    let isChecked = await page.locator("//input[@id='traveling']").isChecked();
    console.log(isChecked);
    await page.locator("//input[@id='traveling']").setChecked(true);

    await page.locator("//select[@id='interests']").selectOption({
        value: "art"
    });

    await page.locator("//select[@id='country']").selectOption({
        value: "australia"
    });

    await page.locator("//input[@id='dob']").pressSequentially("31032000", {
        delay: 100
    });

    await page.locator("//input[@id='profile']").setInputFiles("tests/lesson-4/key-takeaways.md");

    await page.fill("//textarea[@id='bio']", "Tạo file test1.spec.ts. Truy cập trang https://material.playwrightvn.com/");

    await page.locator("//input[@id='newsletter']").setChecked(true);

    // await page.click("//input[@id:'toggleOption']");

    const registerButton = page.locator("//button[contains(text(), 'Register')]");
    await registerButton.click();
})
