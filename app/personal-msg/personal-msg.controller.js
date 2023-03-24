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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const personal_msg_service_1 = require("./personal-msg.service");
const passport_1 = require("@nestjs/passport");
const personalMsgDto_1 = require("./dto/personalMsgDto");
let PersonalMsgController = class PersonalMsgController {
    constructor(personalMsgService) {
        this.personalMsgService = personalMsgService;
    }
    create(personalMsgDto, headers) {
        return this.personalMsgService.addPersonalMsg(personalMsgDto, headers);
    }
    async getPersonalMsg(headers) {
        return this.personalMsgService.getPersonalMsg(headers);
    }
    async updatePersonalMsg(personalMsgDto, headers) {
        return this.personalMsgService.updatePersonalMsg(personalMsgDto, headers);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [personalMsgDto_1.default, Object]),
    __metadata("design:returntype", void 0)
], PersonalMsgController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PersonalMsgController.prototype, "getPersonalMsg", null);
__decorate([
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [personalMsgDto_1.default, Object]),
    __metadata("design:returntype", Promise)
], PersonalMsgController.prototype, "updatePersonalMsg", null);
PersonalMsgController = __decorate([
    (0, common_1.Controller)("personalmsg"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    __metadata("design:paramtypes", [personal_msg_service_1.PersonalMsgService])
], PersonalMsgController);
exports.default = PersonalMsgController;
//# sourceMappingURL=personal-msg.controller.js.map