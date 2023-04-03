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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const app_module_1 = require("../app.module");
const resultType_1 = require("../config/resultType");
const comments_db_service_1 = require("../commentsDB/comments-db/comments-db.service");
const commentsVo_1 = require("./vo/commentsVo");
const personal_msg_service_1 = require("../personal-msg/personal-msg.service");
let CommentsService = class CommentsService {
    constructor(CommentsDbService, PersonalMsgService) {
        this.CommentsDbService = CommentsDbService;
        this.PersonalMsgService = PersonalMsgService;
        this.COLLECTION_NAME = app_module_1.COLLECTION_NAME_ENUM.COMMENTS;
    }
    async addComments(addCommentsDto, headers) {
        const person = await this.PersonalMsgService.getPerson(headers);
        if (!person.status) {
            this.result = resultType_1.Result.fail(resultType_1.statusCodeEnum.BAD_REQUEST, "请先创建个人信息后再添加评论！");
            return this.result;
        }
        const listData = await this.CommentsDbService.dbService.getByOption(this.COLLECTION_NAME, {
            articleId: Math.floor(Number(addCommentsDto.articleId))
        });
        if (!listData.articleId && listData.articleId !== 0) {
            const newData = {
                articleId: Math.floor(Number(addCommentsDto.articleId)),
                comments: [
                    {
                        nickname: person.data.nickname,
                        headImgUrl: "http://localhost:8081/userImg.png",
                        content: addCommentsDto.comments,
                        time: addCommentsDto.time
                    }
                ]
            };
            await this.CommentsDbService.dbService.addOne(this.COLLECTION_NAME, newData);
        }
        else {
            const newData = listData;
            newData.comments.push({
                nickname: person.data.nickname,
                headImgUrl: "http://localhost:8081/userImg.png",
                content: addCommentsDto.comments,
                time: addCommentsDto.time
            });
            await this.CommentsDbService.dbService.update(this.COLLECTION_NAME, {
                articleId: listData.articleId
            }, newData);
        }
        this.result = resultType_1.Result.success("评论成功!");
        return this.result;
    }
    async getCommentsById(articleId) {
        const listData = await this.CommentsDbService.dbService.getByOption(this.COLLECTION_NAME, {
            articleId: Math.floor(Number(articleId))
        });
        this.result = resultType_1.Result.success(new commentsVo_1.default(listData.articleId, listData.comments));
        return this.result;
    }
};
CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [comments_db_service_1.CommentsDbService,
        personal_msg_service_1.PersonalMsgService])
], CommentsService);
exports.CommentsService = CommentsService;
//# sourceMappingURL=comments.service.js.map