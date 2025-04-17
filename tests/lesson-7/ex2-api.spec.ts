import test, { expect } from "@playwright/test";
import { ConduitAPI } from "../../page-api/conduit-api";
import { beforeEach } from "node:test";

test.describe("Ex2", async () => {
    let token: string;

    test.beforeEach(async ({request}) => {
        let conduitPOM = new ConduitAPI(request, "https://conduit-api.bondaracademy.com");
        const response = await conduitPOM.login("oanhpham+1@gmail.com", "123456");

        const statusCode = response.status();
        expect(statusCode).toEqual(200);

        const resBody = await response.json();
        token = resBody.user.token;
        console.log(token);
    })
    

})