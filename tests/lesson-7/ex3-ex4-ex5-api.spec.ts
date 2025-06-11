import { test, expect } from "@playwright/test";
import { ConduitAPI } from "../../page-api/conduit-api";

test("Article", async ({ request }) => {
    let token: string;
    const random = new Date().getMilliseconds();
    let articleSlug: string;
    let arrayComment: { id: number, body: string }[] = [];

    let conduitPOM = new ConduitAPI(request);

    await test.step("Login", async () => {
        const email = "oanhpham+2@gmail.com";
        const password = "123456";

        const loginRes = await conduitPOM.login(email, password);

        const statusCode = loginRes.status();
        expect(statusCode).toEqual(200);

        const resBody = await loginRes.json();
        token = resBody.user.token;
        console.log(token);
    });

    await test.step("Add new article", async () => {
        const title = `API in Playwright ${random}`;
        const description = "How to use Playwright to create article";
        const body = "How to use Playwright to create article";
        const tagList = ["Playwright Viet Nam, pw, pw-k6"];

        const articleRes = await conduitPOM.addArticle(
            token,
            title,
            description,
            body,
            tagList
        );

        const statusCode = articleRes.status();
        expect(statusCode).toEqual(201);

        const articleBody = await articleRes.json();
        articleSlug = articleBody.article.slug;
        expect(articleSlug.toLowerCase()).toContain(`api-in-playwright-${random}`);
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

            const commentBody = await commentRes.json();
            arrayComment.push({
                id: commentBody.comment.id,
                body: commentBody.comment.body
            })
            console.log(arrayComment);
        }
    })

    await test.step("Delete 'Comment 02' and 'Comment 05'", async () => {
        const arrayCommentDelete = arrayComment.filter((cmt: { id: number, body: string }) => {
            return cmt.body === "Comment 02" || cmt.body === "Comment 05"
        });
        console.log(arrayCommentDelete);

        for (let comment of arrayCommentDelete) {
            const commentDeleteRes = await conduitPOM.deleteCommentFromArticle(token, articleSlug, comment.id);
            const statusCode = commentDeleteRes.status();
            expect(statusCode).toEqual(200);
            console.log(`Deleted comment: ${comment.body}`);
        }
    })

    await test.step("Delete article", async () => {
        const articleDeleteRes = await conduitPOM.deleteArticle(token, articleSlug);
        const statusCode = articleDeleteRes.status();
        expect(statusCode).toEqual(204);
        console.log(`Delete article: ${articleSlug}`);
    })
})
