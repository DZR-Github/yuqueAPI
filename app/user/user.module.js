"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const jwt_1 = require("@nestjs/jwt");
const jwtConstants_1 = require("../config/jwtConstants");
const jwt_strategy_1 = require("./jwt.strategy");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                secret: jwtConstants_1.jwtConstants.secret,
                signOptions: {
                    expiresIn: "1d"
                }
            })
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService, jwt_strategy_1.JwtStrategy],
        exports: [user_service_1.UserService]
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map