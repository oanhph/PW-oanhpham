import { APIRequestContext } from "@playwright/test";

export class ConduitAPI {
    request: APIRequestContext;
    baseUrl: string;

    constructor(request: APIRequestContext, baseUrl: string) {
        this.request = request;
        this.baseUrl = baseUrl;
    }
}