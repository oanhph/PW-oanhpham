import { test, expect } from "@playwright/test";
import { ConduitAPI } from "../../page-api/conduit-api";

test("Sign up", async ({ request }) => {
    let conduitPOM = new ConduitAPI(request);
    const random = new Date().getMilliseconds();
    const usernameRes = `oanh${random}`;
    const emailRes = `oanh${random}@gmail.com`;
    const password = "12345678";

    const response = await conduitPOM.registerAPI(
        emailRes,
        password,
        usernameRes
    );

    const statusCode = response.status();
    expect(statusCode).toEqual(201);

    const resBody = await response.json();
    expect(resBody.user.username).toEqual(usernameRes);
})
