"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleService = void 0;
const common_1 = require("@nestjs/common");
const resultType_1 = require("../config/resultType");
const article_db_service_1 = require("../article-db/article-db.service");
const app_module_1 = require("../app.module");
const ArticleVo_1 = require("./vo/ArticleVo");
const singleArticleVo_1 = require("./vo/singleArticleVo");
let ArticleService = class ArticleService {
    constructor(ArticleDbService) {
        this.ArticleDbService = ArticleDbService;
        this.COLLECTION_NAME = app_module_1.COLLECTION_NAME_ENUM.ARTICLES;
    }
    async getArticles(quantity) {
        if (!quantity) {
            this.result = resultType_1.Result.fail(resultType_1.statusCodeEnum.BAD_REQUEST, "参数有误！");
            return this.result;
        }
        const Quantity = Math.floor(Number(quantity));
        if (Quantity < 1 || Quantity > 10) {
            this.result = resultType_1.Result.fail(resultType_1.statusCodeEnum.BAD_REQUEST, "quantity必须在1~10之间!");
            return this.result;
        }
        const ListData = await this.ArticleDbService.dbService.getSpecifiedQuatity(this.COLLECTION_NAME, Quantity);
        this.result = resultType_1.Result.success(new ArticleVo_1.default(ListData));
        return this.result;
    }
    async getArticleById(articleId) {
        const dataList = await this.ArticleDbService.dbService.getAll(this.COLLECTION_NAME);
        const length = dataList.length;
        if (articleId < 0 || articleId > length - 1) {
            this.result = resultType_1.Result.successWithCustomCode(resultType_1.statusCodeEnum.BAD_REQUEST, "articleId有误！");
            return this.result;
        }
        const data = await this.ArticleDbService.dbService.getByOption(this.COLLECTION_NAME, {
            articleId: Math.floor(Number(articleId))
        });
        this.result = resultType_1.Result.success(new singleArticleVo_1.default(data));
        return this.result;
    }
};
ArticleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [article_db_service_1.default])
], ArticleService);
exports.ArticleService = ArticleService;
//# sourceMappingURL=article.service.js.map