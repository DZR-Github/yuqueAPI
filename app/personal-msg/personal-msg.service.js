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
exports.PersonalMsgService = void 0;
const common_1 = require("@nestjs/common");
const app_module_1 = require("../app.module");
const resultType_1 = require("../config/resultType");
const personal_msg_db_service_1 = require("../personalMsgDB/personal-msg-db/personal-msg-db.service");
const user_service_1 = require("../user/user.service");
const personalMsgVo_1 = require("./vo/personalMsgVo");
let PersonalMsgService = class PersonalMsgService {
    constructor(userService, PersonalMsgDbService) {
        this.userService = userService;
        this.PersonalMsgDbService = PersonalMsgDbService;
        this.COLLECTION_NAME = app_module_1.COLLECTION_NAME_ENUM.PERSONALMSG;
    }
    async getUserIdByToken(headers) {
        let userId;
        await this.userService.getUserInfo(headers.token).then(res => {
            userId = res.id;
        });
        return userId;
    }
    async addPersonalMsg(personalMsgDto, headers) {
        const userId = await this.getUserIdByToken(headers);
        const oldData = await this.PersonalMsgDbService.dbService.getByOption(this.COLLECTION_NAME, {
            userId: userId
        });
        if (!oldData.userId) {
            await this.PersonalMsgDbService.dbService.addOne(this.COLLECTION_NAME, {
                userId: userId,
                nickname: personalMsgDto.nickname,
                collectionSum: 0,
                personalizedSignature: personalMsgDto.personalizedSignature
            });
            this.result = resultType_1.Result.success({ message: "创建个人信息成功！" });
        }
        else {
            this.result = resultType_1.Result.fail(resultType_1.statusCodeEnum.BAD_REQUEST, "创建个人信息失败！");
        }
        return this.result;
    }
    async getPersonalMsg(headers) {
        const userId = await this.getUserIdByToken(headers);
        const listData = await this.PersonalMsgDbService.dbService.getByOption(this.COLLECTION_NAME, {
            userId: userId
        });
        if (!listData.userId) {
            this.result = resultType_1.Result.fail(resultType_1.statusCodeEnum.BAD_REQUEST, "未找到个人信息！");
        }
        else {
            this.result = resultType_1.Result.success(new personalMsgVo_1.default(listData.nickname, listData.personalizedSignature, listData.collectionSum));
        }
        return this.result;
    }
    async updatePersonalMsg(personalMsgDto, headers) {
        const userId = await this.getUserIdByToken(headers);
        const oldData = await this.PersonalMsgDbService.dbService.getByOption(this.COLLECTION_NAME, {
            userId: userId
        });
        if (!oldData.userId) {
            this.result = resultType_1.Result.fail(resultType_1.statusCodeEnum.BAD_REQUEST, "个人信息更新失败！");
        }
        else {
            const data = {
                userId: userId,
                nickname: personalMsgDto.nickname,
                collectionSum: oldData.collectionSum,
                personalizedSignature: personalMsgDto.personalizedSignature
            };
            await this.PersonalMsgDbService.dbService.update(this.COLLECTION_NAME, { userId: userId }, data);
            this.result = resultType_1.Result.success({ message: "个人信息更新成功！" });
        }
        return this.result;
    }
};
PersonalMsgService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        personal_msg_db_service_1.default])
], PersonalMsgService);
exports.PersonalMsgService = PersonalMsgService;
//# sourceMappingURL=personal-msg.service.js.map