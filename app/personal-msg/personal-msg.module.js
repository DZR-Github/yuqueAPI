"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PersonalMsgModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonalMsgModule = void 0;
const common_1 = require("@nestjs/common");
const personal_msg_service_1 = require("./personal-msg.service");
const personal_msg_controller_1 = require("./personal-msg.controller");
const personal_msg_db_module_1 = require("../personalMsgDB/personal-msg-db/personal-msg-db.module");
let PersonalMsgModule = PersonalMsgModule_1 = class PersonalMsgModule {
};
PersonalMsgModule = PersonalMsgModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [PersonalMsgModule_1, personal_msg_db_module_1.PersonalMsgDbModule],
        controllers: [personal_msg_controller_1.default],
        providers: [personal_msg_service_1.PersonalMsgService],
        exports: [personal_msg_service_1.PersonalMsgService]
    })
], PersonalMsgModule);
exports.PersonalMsgModule = PersonalMsgModule;
//# sourceMappingURL=personal-msg.module.js.map