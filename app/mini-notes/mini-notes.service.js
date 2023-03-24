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
exports.MiniNotesService = void 0;
const common_1 = require("@nestjs/common");
const resultType_1 = require("../config/resultType");
const mini_notes_db_service_1 = require("../miniNotesDB/mini-notes-db/mini-notes-db.service");
const user_service_1 = require("../user/user.service");
const app_module_1 = require("../app.module");
const MiniNotesVo_1 = require("./vo/MiniNotesVo");
let MiniNotesService = class MiniNotesService {
    constructor(userService, MiniNotesDbService) {
        this.userService = userService;
        this.MiniNotesDbService = MiniNotesDbService;
        this.COLLECTION_NAME = app_module_1.COLLECTION_NAME_ENUM.MININOTES;
    }
    async getUserIdByToken(headers) {
        let userId;
        await this.userService.getUserInfo(headers.token).then(res => {
            userId = res.id;
        });
        return userId;
    }
    async addMiniNote(MiniNoteDto, headers) {
        const userId = await this.getUserIdByToken(headers);
        const oldData = await this.MiniNotesDbService.dbService.getByOption(this.COLLECTION_NAME, {
            userId: userId
        });
        if (!oldData.userId) {
            await this.MiniNotesDbService.dbService.addOne(this.COLLECTION_NAME, {
                userId: userId,
                data: [
                    {
                        content: MiniNoteDto.content,
                        createTime: MiniNoteDto.createTime,
                        notesId: Math.floor(Number(MiniNoteDto.notesId)),
                        tag: MiniNoteDto.tag || ""
                    }
                ]
            });
        }
        else {
            const newData = oldData;
            const listData = oldData.data;
            for (let i = 0; i < listData.length; i++) {
                if (listData[i].notesId === Math.floor(Number(MiniNoteDto.notesId))) {
                    this.result = resultType_1.Result.fail(resultType_1.statusCodeEnum.BAD_REQUEST, "notesId不符合要求！");
                    return this.result;
                }
            }
            newData.data.push({
                content: MiniNoteDto.content,
                createTime: MiniNoteDto.createTime,
                notesId: Math.floor(Number(MiniNoteDto.notesId)),
                tag: MiniNoteDto.tag || ""
            });
            await this.MiniNotesDbService.dbService.update(this.COLLECTION_NAME, { userId: userId }, newData);
        }
        this.result = resultType_1.Result.success({ message: "新增小记成功！" });
        return this.result;
    }
    async getAllMiniNotes(headers) {
        const userId = await this.getUserIdByToken(headers);
        const listData = await this.MiniNotesDbService.dbService.getByOption(this.COLLECTION_NAME, {
            userId: userId
        });
        if (!listData.userId) {
            this.result = resultType_1.Result.success(new MiniNotesVo_1.default(userId, []));
        }
        else {
            this.result = resultType_1.Result.success(new MiniNotesVo_1.default(userId, listData.data));
        }
        return this.result;
    }
    async updateMiniNotes(MiniNoteDto, headers) {
        const userId = await this.getUserIdByToken(headers);
        const listData = await this.MiniNotesDbService.dbService.getByOption(this.COLLECTION_NAME, {
            userId: userId
        });
        if (!listData.userId) {
        }
        else {
            const newData = listData;
            for (let i = 0; i < listData.data.length; i++) {
                if (listData.data[i].notesId === Math.floor(Number(MiniNoteDto.notesId))) {
                    newData.data[i].createTime = MiniNoteDto.createTime;
                    newData.data[i].content = MiniNoteDto.content;
                    newData.data[i].tag = MiniNoteDto.tag || "";
                    await this.MiniNotesDbService.dbService.update(this.COLLECTION_NAME, { userId: userId }, newData);
                    this.result = resultType_1.Result.success("小记更新成功！");
                    return this.result;
                }
            }
        }
        this.result = resultType_1.Result.fail(resultType_1.statusCodeEnum.BAD_REQUEST, "更新失败！");
        return this.result;
    }
    async removeMiniNotes(notesId, headers) {
        const userId = await this.getUserIdByToken(headers);
        const listData = await this.MiniNotesDbService.dbService.getByOption(this.COLLECTION_NAME, {
            userId: userId
        });
        if (!listData.userId) {
        }
        else {
            const newData = listData;
            for (let i = 0; i < listData.data.length; i++) {
                if (listData.data[i].notesId === Math.floor(Number(notesId))) {
                    newData.data.splice(i, 1);
                    await this.MiniNotesDbService.dbService.update(this.COLLECTION_NAME, { userId: userId }, newData);
                    this.result = resultType_1.Result.success("删除成功！");
                    return this.result;
                }
            }
        }
        this.result = resultType_1.Result.fail(resultType_1.statusCodeEnum.BAD_REQUEST, "删除失败！");
        return this.result;
    }
};
MiniNotesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        mini_notes_db_service_1.MiniNotesDbService])
], MiniNotesService);
exports.MiniNotesService = MiniNotesService;
//# sourceMappingURL=mini-notes.service.js.map