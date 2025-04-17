import { APIRequestContext } from "@playwright/test";

export class ConduitAPI {
    request: APIRequestContext;
    baseUrl: string;

    constructor(request: APIRequestContext, baseUrl: string) {
        this.request = request;
        this.baseUrl = baseUrl;
    }

    async login(email: string, password: string) {
        const url = `${this.baseUrl}/api/users/login`;
        const response = await this.request.post(url, {
            data: {
                user: {
                    email: email,
                    password: password
                }
            }
        })
        return response
    }
}