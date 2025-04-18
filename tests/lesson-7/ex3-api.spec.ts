import { test, expect } from "@playwright/test";
import { ConduitAPI } from "../../page-api/conduit-api";

test("Add new comment", async ({ request }) => {
    let token: string;
    let articleSlug: string;
    let conduitPOM = new ConduitAPI(request, "https://conduit-api.bondaracademy.com");

    await test.step("Login", async () => {
        const loginRes = await conduitPOM.login("oanhpham+2@gmail.com", "123456");

        const statusCode = loginRes.status();
        expect(statusCode).toEqual(200);

        const resBody = await loginRes.json();
        token = resBody.user.token;
        console.log(token);
    });

    await test.step("Add new article", async () => {
        const articleData = {
            title: "API in Playwright",
            description: "How to use Playwright to create article",
            body: "How to use Playwright to create article",
            tagList: [
                "Playwright Viet Nam",
                "pw",
                "pw-k6"
            ]
        };
        const articleRes = await conduitPOM.addArticle(token, articleData);

        const statusCode = articleRes.status();
        expect(statusCode).toEqual(201);

        const articleBody = await articleRes.json();
        articleSlug = articleBody.article.slug;
        expect(articleSlug.toLowerCase()).toContain("api-in-playwright");
    })

    await test.step("Add 5 comments", async () => {
        const comments = [
            "Comment 01",
            "Comment 02",
            "Comment 03",
            "Comment 04",
            "Comment 05"
        ]
        for (let comment of comments) {
            const commentRes = await conduitPOM.addCommentToArticle(token, articleSlug, comment);

            const statusCode = commentRes.status();
            expect(statusCode).toEqual(200);
        }
    })
})
