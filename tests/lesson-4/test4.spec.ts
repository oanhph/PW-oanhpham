import { test, expect} from "@playwright/test";

test("Add 10 notes and search title", async ({page}) => {
    await page.goto("https://material.playwrightvn.com/");
    await expect(page).toHaveTitle(/Tài liệu học automation test/);

    await page.click("//a[@href='04-xpath-personal-notes.html']");
    await expect(page).toHaveTitle(/Personal Notes/);

    await page.fill("//input[@id='note-title']", "Máy bay chở khách với cánh lấy cảm hứng từ chim ");
    await page.fill("//textarea[@id='note-content']", "Airbus giới thiệu những công nghệ dự kiến xuất hiện trên máy bay thế hệ mới tại Hội nghị thượng đỉnh Airbus 2025 diễn ra ở thành phố Toulouse, Pháp, ngày 24 - 25/3. Với mục tiêu giảm tác động đến môi trường, cải thiện hiệu suất vận hành và giảm chi phí, máy bay mới sẽ có nhiều cải tiến nổi bật.");
    await page.click("//button[@id='add-note']");
     
});