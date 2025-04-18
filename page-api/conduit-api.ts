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

    async addArticle(token: string, articleData: any) {
        const url = `${this.baseUrl}/api/articles/`;
        const response = await this.request.post(url,
            {
                headers: {
                    authorization: `Token ${token}`
                },
                data: {
                    article: articleData
                }
            }
        )
        return response;
    }

    async addCommentToArticle(token: string, slug: string, comment: any) {
        const url = `${this.baseUrl}/api/articles/${slug}/comments`;
        const response = await this.request.post(url,
            {
                headers: {
                    authorization: `Token ${token}`
                },
                data: {
                    comment: {
                        body: comment
                    }
                }
            }
        )
        return response;
    }

}