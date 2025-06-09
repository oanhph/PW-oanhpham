import { test, expect } from "@playwright/test";
import { ConduitAPI } from "../../page-api/conduit-api";

test.describe("Article", async () => {
    let token: string;

    test.beforeEach(async ({ request }) => {
        let conduitPOM = new ConduitAPI(request, "https://conduit-api.bondaracademy.com");
        const response = await conduitPOM.login("oanhpham+2@gmail.com", "123456");

        const statusCode = response.status();
        expect(statusCode).toEqual(200);

        const resBody = await response.json();
        token = resBody.user.token;
        console.log(token);
    })

    test("Create new article", async ({ request }) => {
        let conduitPOM = new ConduitAPI(request, "https://conduit-api.bondaracademy.com");
        const url = `${conduitPOM.baseUrl}/api/articles`;
        const response = await request.post(url,
            {
                headers: {
                    authorization: `Token ${token}`
                },
                data: {
                    article: {
                        "title": "API in Playwright",
                        "description": "How to use Playwright to create article",
                        "body": "How to use Playwright to create article",
                        "tagList": [
                            "Playwright Viet Nam",
                            "pw",
                            "pw-k6"
                        ]
                    }
                }
            }
        )
        const statusCode = response.status();
        expect(statusCode).toEqual(201);

        const resBody = await response.json();
        const articleTitle = resBody.article.title;
        expect(articleTitle).toEqual("API in Playwright");
    })
})
