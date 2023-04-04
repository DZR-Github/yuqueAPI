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
exports.CollectionService = void 0;
const common_1 = require("@nestjs/common");
const app_module_1 = require("../app.module");
const resultType_1 = require("../config/resultType");
const user_service_1 = require("../user/user.service");
const collection_db_service_1 = require("../collectionDB/collection-db/collection-db.service");
const collectionVo_1 = require("./vo/collectionVo");
const article_db_service_1 = require("../article-db/article-db.service");
const personal_msg_db_service_1 = require("../personalMsgDB/personal-msg-db/personal-msg-db.service");
const personal_msg_service_1 = require("../personal-msg/personal-msg.service");
let CollectionService = class CollectionService {
    constructor(userService, CollectionDbService, ArticleDbService, PersonalMsgDbService, PersonalMsgService) {
        this.userService = userService;
        this.CollectionDbService = CollectionDbService;
        this.ArticleDbService = ArticleDbService;
        this.PersonalMsgDbService = PersonalMsgDbService;
        this.PersonalMsgService = PersonalMsgService;
        this.COLLECTION_NAME = app_module_1.COLLECTION_NAME_ENUM.COLLECTIONS;
    }
    async getUserIdByToken(headers) {
        let userId;
        await this.userService.getUserInfo(headers.token).then(res => {
            userId = res.id;
        });
        return userId;
    }
    async getCollections(headers) {
        const userId = await this.getUserIdByToken(headers);
        let collections;
        const ListData = await this.CollectionDbService.dbService.getByOption(this.COLLECTION_NAME, { userId: userId });
        collections = ListData.collections;
        if (!collections)
            collections = [];
        this.result = resultType_1.Result.success(new collectionVo_1.default(userId, collections));
        return this.result;
    }
    async addCollection(addCollectionDto, headers) {
        const userId = await this.getUserIdByToken(headers);
        const articleId = addCollectionDto.articleId;
        const articleData = await this.ArticleDbService.dbService.getAll(app_module_1.COLLECTION_NAME_ENUM.ARTICLES);
        const articleLength = articleData.length;
        const person = await this.PersonalMsgService.getPerson(headers);
        const ListData = await this.CollectionDbService.dbService.getByOption(this.COLLECTION_NAME, { userId: userId });
        if (!person.status) {
            this.result = resultType_1.Result.fail(resultType_1.statusCodeEnum.BAD_REQUEST, "请先创建个人信息后再添加收藏！");
            return this.result;
        }
        if (articleId < 0 || articleId > articleLength) {
            this.result = resultType_1.Result.successWithCustomCode(resultType_1.statusCodeEnum.BAD_REQUEST, "未找到该文章，请检查articleId是否正确!");
        }
        else {
            let flag = 0;
            if (!ListData.userId) {
                const data = {
                    userId: userId,
                    collections: [articleId]
                };
                await this.CollectionDbService.dbService.addOne(this.COLLECTION_NAME, data);
                this.result = resultType_1.Result.successWithCustomCode(resultType_1.statusCodeEnum.CREATED, "添加收藏成功！");
            }
            else {
                const check = ListData.collections.indexOf(articleId);
                if (check === -1) {
                    const data = {
                        userId: userId,
                        collections: [...ListData.collections, articleId]
                    };
                    await this.CollectionDbService.dbService.update(this.COLLECTION_NAME, ListData, data);
                    this.result = resultType_1.Result.successWithCustomCode(resultType_1.statusCodeEnum.CREATED, "添加收藏成功！");
                }
                else {
                    flag = 1;
                    this.result = resultType_1.Result.successWithCustomCode(resultType_1.statusCodeEnum.OK, "已收藏，无需重复添加！");
                }
            }
            if (flag === 0) {
                const newData = {
                    userId: userId,
                    nickname: person.data.nickname,
                    collectionSum: person.data.collectionSum + 1,
                    personalizedSignature: person.data.personalizedSignature
                };
                await this.PersonalMsgService.updateMsg(newData, headers);
            }
        }
        return this.result;
    }
    async removeCollection(articleId, headers) {
        const userId = await this.getUserIdByToken(headers);
        const articleData = await this.ArticleDbService.dbService.getAll(app_module_1.COLLECTION_NAME_ENUM.ARTICLES);
        const articleLength = articleData.length;
        const ListData = await this.CollectionDbService.dbService.getByOption(this.COLLECTION_NAME, { userId: userId });
        const person = await this.PersonalMsgService.getPerson(headers);
        if (!person.status) {
            this.result = resultType_1.Result.fail(resultType_1.statusCodeEnum.BAD_REQUEST, "请先创建个人信息再取消收藏！");
            return this.result;
        }
        if (articleId < 0 || articleId > articleLength) {
            this.result = resultType_1.Result.successWithCustomCode(resultType_1.statusCodeEnum.BAD_REQUEST, "未找到该文章，请检查articleId是否正确!");
        }
        else {
            if (!ListData.userId) {
                this.result = resultType_1.Result.successWithCustomCode(resultType_1.statusCodeEnum.BAD_REQUEST, "删除失败，您未收藏该文章！");
            }
            else {
                const check = ListData.collections.indexOf(articleId);
                if (check === -1) {
                    this.result = resultType_1.Result.successWithCustomCode(resultType_1.statusCodeEnum.BAD_REQUEST, "删除失败，您未收藏该文章！");
                }
                else {
                    const newCollections = ListData.collections;
                    newCollections.splice(check, 1);
                    const data = {
                        userId: userId,
                        collections: newCollections
                    };
                    await this.CollectionDbService.dbService.update(this.COLLECTION_NAME, { userId: userId }, data);
                    this.result = resultType_1.Result.successWithCustomCode(resultType_1.statusCodeEnum.OK, "取消收藏成功！");
                    const newData = {
                        userId: person.data.userId,
                        nickname: person.data.nickname,
                        collectionSum: person.data.collectionSum - 1,
                        personalizedSignature: person.data.personalizedSignature
                    };
                    await this.PersonalMsgService.updateMsg(newData, headers);
                }
            }
        }
        return this.result;
    }
};
CollectionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        collection_db_service_1.default,
        article_db_service_1.default,
        personal_msg_db_service_1.default,
        personal_msg_service_1.PersonalMsgService])
], CollectionService);
exports.CollectionService = CollectionService;
//# sourceMappingURL=collection.service.js.map