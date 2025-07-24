import { test as base, expect, Page } from "@playwright/test";
import { Tag } from "../../tests/lesson-8/pom-return-another-page/pages/tags-page-08";
import { BasePage08 } from "../../tests/lesson-8/pom-return-another-page/pages/base-page-08";
import { DashboardPage08 } from "../../tests/lesson-8/pom-return-another-page/pages/dashboard-page-08";

const test = base.extend<{ myTag: Page }>({
    myTag: async ({ page }, use) => {
        let username: string = "k11-trang";
        let password: string = "TCKoQJ4S3hKFyEamNgM0OwMK";
        const tags: Tag[] = [
            { name: "t1", slug: "slug-t1", description: "description t1" },
            { name: "t2", slug: "slug-t2", description: "description t2" }
        ];
        const basePage = new BasePage08(page);
        const loginPage = await basePage.navigateToLoginPage();
        const dashboardPage = await loginPage.login(username, password);
        const tagPage = await dashboardPage.goToTagsPage();

        for (let tag of tags) {
            await tagPage.addTag(tag);
            await expect(page.locator(tagPage.xpathTagsList)).toContainText([
                tag.name,
                tag.description,
                tag.slug
            ]);
        }

        await use(page);

        await tagPage.deleteTags([tags[0]["name"], tags[1]["name"]]);
    }
});

export { test }; 