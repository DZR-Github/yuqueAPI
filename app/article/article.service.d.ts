import { Result } from "src/config/resultType";
import ArticleDbService from "src/article-db/article-db.service";
export declare class ArticleService {
    private readonly ArticleDbService;
    private readonly COLLECTION_NAME;
    private result;
    constructor(ArticleDbService: ArticleDbService);
    getArticles(quantity: number): Promise<Result>;
    getArticleById(articleId: number): Promise<Result>;
}
