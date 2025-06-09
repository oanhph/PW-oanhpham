import { APIRequestContext } from "@playwright/test";

export class ConduitAPI {
    request: APIRequestContext;
    baseUrl = "https://conduit-api.bondaracademy.com";

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async login(email: string, password: string) {
        const url = `${this.baseUrl}/api/users/login`;
        const response = await this.request.post(url,
            {
                data: {
                    user: {
                        email: email,
                        password: password
                    }
                }
            }
        )
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

    async deleteCommentFromArticle(token: string, slug: string, commentId: number) {
        const url = `${this.baseUrl}/api/articles/${slug}/comments/${commentId}`;
        const response = await this.request.delete(url,
            {
                headers: {
                    authorization: `Token ${token}`
                }
            }
        )
        return response;
    }

    async deleteArticle(token: string, slug: string) {
        const url = `${this.baseUrl}/api/articles/${slug}`;
        const response = await this.request.delete(url,
            {
                headers: {
                    authorization: `Token ${token}`
                }
            }
        )
        return response;
    }
}
