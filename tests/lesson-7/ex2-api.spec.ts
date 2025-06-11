import { test, expect } from "@playwright/test";
import { ConduitAPI } from "../../page-api/conduit-api";

test.describe("Article", async () => {
    let token: string;
    const random = new Date().getMilliseconds();

    test.beforeEach(async ({ request }) => {
        let conduitPOM = new ConduitAPI(request);
        const email = "oanhpham+2@gmail.com";
        const password = "123456";

        const response = await conduitPOM.login(email, password);

        const statusCode = response.status();
        expect(statusCode).toEqual(200);

        const resBody = await response.json();
        token = resBody.user.token;
        console.log(token);
    })

    test("Create new article", async ({ request }) => {
        let conduitPOM = new ConduitAPI(request);
        const title = `API in Playwright ${random}`;
        const description = "How to use Playwright to create article";
        const body = "How to use Playwright to create article";
        const tagList = ["Playwright Viet Nam, pw, pw-k6"];
        
        const response = await conduitPOM.addArticle(
            token,
            title,
            description,
            body,
            tagList
        );
        const statusCode = response.status();
        expect(statusCode).toEqual(201);

        const resBody = await response.json();
        const articleTitle = resBody.article.title;
        expect(articleTitle).toEqual(`API in Playwright ${random}`);
    })
})
