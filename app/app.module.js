"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = exports.COLLECTION_NAME_ENUM = void 0;
const common_1 = require("@nestjs/common");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const user_module_1 = require("./user/user.module");
const article_module_1 = require("./article/article.module");
const collection_module_1 = require("./collection/collection.module");
const personal_msg_module_1 = require("./personal-msg/personal-msg.module");
const mini_notes_module_1 = require("./mini-notes/mini-notes.module");
const comments_module_1 = require("./comments/comments.module");
const favour_module_1 = require("./favour/favour.module");
var COLLECTION_NAME_ENUM;
(function (COLLECTION_NAME_ENUM) {
    COLLECTION_NAME_ENUM["ARTICLES"] = "articles";
    COLLECTION_NAME_ENUM["USER"] = "user";
    COLLECTION_NAME_ENUM["COLLECTIONS"] = "collections";
    COLLECTION_NAME_ENUM["PERSONALMSG"] = "personalMsg";
    COLLECTION_NAME_ENUM["MININOTES"] = "mininotes";
    COLLECTION_NAME_ENUM["COMMENTS"] = "comments";
    COLLECTION_NAME_ENUM["FAVOUR"] = "favour";
})(COLLECTION_NAME_ENUM = exports.COLLECTION_NAME_ENUM || (exports.COLLECTION_NAME_ENUM = {}));
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, "..", "public"),
                serveRoot: "/"
            }),
            user_module_1.UserModule,
            article_module_1.ArticleModule,
            collection_module_1.CollectionModule,
            personal_msg_module_1.PersonalMsgModule,
            mini_notes_module_1.MiniNotesModule,
            comments_module_1.CommentsModule,
            favour_module_1.FavourModule
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map