import { ArticleService } from "./article.service";
export declare class ArticleController {
    private readonly articleService;
    constructor(articleService: ArticleService);
    getArticleById(articleId: number): Promise<import("../config/resultType").Result>;
    getArticles(quantity: number): Promise<import("../config/resultType").Result>;
}
