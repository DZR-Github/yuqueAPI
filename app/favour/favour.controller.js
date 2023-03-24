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
exports.FavourController = void 0;
const common_1 = require("@nestjs/common");
const favour_service_1 = require("./favour.service");
const passport_1 = require("@nestjs/passport");
let FavourController = class FavourController {
    constructor(favourService) {
        this.favourService = favourService;
    }
    async giveFavour(articleId, headers) {
        return this.favourService.giveFavour(headers, Math.floor(Number(articleId)));
    }
    async getStatus(articleId, headers) {
        return this.favourService.getStatus(headers, Math.floor(Number(articleId)));
    }
    async getLikeQuantity(articleId) {
        return this.favourService.getLikeQuantity(Math.floor(Number(articleId)));
    }
    async removeFavour(articleId, headers) {
        return this.favourService.removeFavour(headers, Math.floor(Number(articleId)));
    }
};
__decorate([
    (0, common_1.Post)(":articleId"),
    __param(0, (0, common_1.Param)("articleId")),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], FavourController.prototype, "giveFavour", null);
__decorate([
    (0, common_1.Get)("mine/:articleId"),
    __param(0, (0, common_1.Param)("articleId")),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], FavourController.prototype, "getStatus", null);
__decorate([
    (0, common_1.Get)(":articleId"),
    __param(0, (0, common_1.Param)("articleId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FavourController.prototype, "getLikeQuantity", null);
__decorate([
    (0, common_1.Delete)(":articleId"),
    __param(0, (0, common_1.Param)("articleId")),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], FavourController.prototype, "removeFavour", null);
FavourController = __decorate([
    (0, common_1.Controller)("favour"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    __metadata("design:paramtypes", [favour_service_1.FavourService])
], FavourController);
exports.FavourController = FavourController;
//# sourceMappingURL=favour.controller.js.map