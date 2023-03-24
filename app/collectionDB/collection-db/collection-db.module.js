"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionDbModule = void 0;
const common_1 = require("@nestjs/common");
const collection_db_service_1 = require("./collection-db.service");
let CollectionDbModule = class CollectionDbModule {
};
CollectionDbModule = __decorate([
    (0, common_1.Module)({
        providers: [collection_db_service_1.default],
        exports: [collection_db_service_1.default]
    })
], CollectionDbModule);
exports.CollectionDbModule = CollectionDbModule;
//# sourceMappingURL=collection-db.module.js.map