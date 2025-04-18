import { test, expect } from "@playwright/test";
import { ConduitAPI } from "../../page-api/conduit-api";

test("Sign up", async ({ request }) => {
    let conduitPOM = new ConduitAPI(request, "https://conduit-api.bondaracademy.com");

    const url = `${conduitPOM.baseUrl}/api/users`;
    const response = await request.post(url,
        {
            data: {
                user: {
                    "email": "oanhpham+7@gmail.com",
                    "password": "123456",
                    "username": "oanhpham7"
                }
            }
        }
    )

    const statusCode = response.status();
    expect(statusCode).toEqual(201);

    const resBody = await response.json();
    expect(resBody.user.username).toEqual("oanhpham7");
})
