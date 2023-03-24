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
exports.CollectionController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const collection_service_1 = require("./collection.service");
let CollectionController = class CollectionController {
    constructor(collectionService) {
        this.collectionService = collectionService;
    }
    async addCollection(articleId, headers) {
        return this.collectionService.addCollection({ articleId: Math.floor(Number(articleId)) }, headers);
    }
    async getCollections(headers) {
        return this.collectionService.getCollections(headers);
    }
    async removeCollection(articleId, headers) {
        return this.collectionService.removeCollection(Math.floor(Number(articleId)), headers);
    }
};
__decorate([
    (0, common_1.Post)(":articleId"),
    __param(0, (0, common_1.Param)("articleId")),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CollectionController.prototype, "addCollection", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CollectionController.prototype, "getCollections", null);
__decorate([
    (0, common_1.Delete)(":articleId"),
    __param(0, (0, common_1.Param)("articleId")),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CollectionController.prototype, "removeCollection", null);
CollectionController = __decorate([
    (0, common_1.Controller)("/collection"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    __metadata("design:paramtypes", [collection_service_1.CollectionService])
], CollectionController);
exports.CollectionController = CollectionController;
//# sourceMappingURL=collection.controller.js.map