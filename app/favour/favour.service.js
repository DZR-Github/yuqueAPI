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
exports.FavourService = void 0;
const common_1 = require("@nestjs/common");
const app_module_1 = require("../app.module");
const resultType_1 = require("../config/resultType");
const favour_db_service_1 = require("../favourDB/favour-db/favour-db.service");
const user_service_1 = require("../user/user.service");
let FavourService = class FavourService {
    constructor(FavourDbService, userService) {
        this.FavourDbService = FavourDbService;
        this.userService = userService;
        this.COLLECTION_NAME = app_module_1.COLLECTION_NAME_ENUM.FAVOUR;
    }
    async getUserIdByToken(headers) {
        let userId;
        await this.userService.getUserInfo(headers.token).then(res => {
            userId = res.id;
        });
        return userId;
    }
    async giveFavour(headers, articleId) {
        const userId = await this.getUserIdByToken(headers);
        const listData = await this.FavourDbService.dbService.getByOption(this.COLLECTION_NAME, {
            articleId: articleId
        });
        if (articleId < 0 || articleId > listData.length - 1) {
            this.result = resultType_1.Result.fail(resultType_1.statusCodeEnum.BAD_REQUEST, "articleId有误");
            return this.result;
        }
        for (let i = 0; i < listData.likeUsers.length; i++) {
            if (listData.likeUsers[i] === userId) {
                this.result = resultType_1.Result.fail(resultType_1.statusCodeEnum.BAD_REQUEST, "点赞失败！您已经给本篇文章点过赞了~");
                return this.result;
            }
        }
        const newData = listData;
        newData.likeUsers.push(userId);
        newData.likeQuantity += 1;
        await this.FavourDbService.dbService.update(this.COLLECTION_NAME, { articleId: articleId }, newData);
        this.result = resultType_1.Result.success("点赞成功！");
        return this.result;
    }
    async getStatus(headers, articleId) {
        const userId = await this.getUserIdByToken(headers);
        const listData = await this.FavourDbService.dbService.getByOption(this.COLLECTION_NAME, {
            articleId: articleId
        });
        if (articleId < 0 || articleId > listData.length - 1) {
            this.result = resultType_1.Result.fail(resultType_1.statusCodeEnum.BAD_REQUEST, "articleId有误");
            return this.result;
        }
        for (let i = 0; i < listData.likeUsers.length; i++) {
            if (listData.likeUsers[i] === userId) {
                this.result = resultType_1.Result.success({ status: true });
                return this.result;
            }
        }
        this.result = resultType_1.Result.success({ status: false });
        return this.result;
    }
    async getLikeQuantity(articleId) {
        const listData = await this.FavourDbService.dbService.getByOption(this.COLLECTION_NAME, {
            articleId: articleId
        });
        if (articleId < 0 || articleId > listData.length - 1) {
            this.result = resultType_1.Result.fail(resultType_1.statusCodeEnum.BAD_REQUEST, "articleId有误");
            return this.result;
        }
        this.result = resultType_1.Result.success({
            likeQuantity: listData.likeQuantity
        });
        return this.result;
    }
    async removeFavour(headers, articleId) {
        const userId = await this.getUserIdByToken(headers);
        const listData = await this.FavourDbService.dbService.getByOption(this.COLLECTION_NAME, {
            articleId: articleId
        });
        if (articleId < 0 || articleId > listData.length - 1) {
            this.result = resultType_1.Result.fail(resultType_1.statusCodeEnum.BAD_REQUEST, "articleId有误");
            return this.result;
        }
        for (let i = 0; i < listData.likeUsers.length; i++) {
            if (listData.likeUsers[i] === userId) {
                const newData = listData;
                newData.likeUsers.splice(i, 1);
                newData.likeQuantity -= 1;
                await this.FavourDbService.dbService.update(this.COLLECTION_NAME, { articleId: articleId }, newData);
                this.result = resultType_1.Result.success("取消点赞成功！");
                return this.result;
            }
        }
        this.result = resultType_1.Result.fail(resultType_1.statusCodeEnum.BAD_REQUEST, "取消点赞失败！您未给本篇文章点赞~");
        return this.result;
    }
};
FavourService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [favour_db_service_1.FavourDbService,
        user_service_1.UserService])
], FavourService);
exports.FavourService = FavourService;
//# sourceMappingURL=favour.service.js.map