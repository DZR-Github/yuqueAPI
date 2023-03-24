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
const common_1 = require("@nestjs/common");
const app_module_1 = require("../app.module");
const lowdb_service_1 = require("../lowdb/lowdb.service");
let ArticleDbService = class ArticleDbService {
    constructor() {
        this.COLLECTION_NAME = app_module_1.COLLECTION_NAME_ENUM.ARTICLES;
        this.dbService = new lowdb_service_1.LowdbService(this.COLLECTION_NAME);
    }
};
ArticleDbService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ArticleDbService);
exports.default = ArticleDbService;
//# sourceMappingURL=article-db.service.js.map