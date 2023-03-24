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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const resultType_1 = require("../config/resultType");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const lowdb_service_1 = require("../lowdb/lowdb.service");
const User_1 = require("./pojo/User");
const uuid_1 = require("uuid");
const UserVo_1 = require("./vo/UserVo");
const app_module_1 = require("../app.module");
let UserService = class UserService {
    constructor(jwtService) {
        this.jwtService = jwtService;
        this.COLLECTION_NAME = app_module_1.COLLECTION_NAME_ENUM.USER;
        this.dbService = new lowdb_service_1.LowdbService(this.COLLECTION_NAME);
    }
    async register(userRegisterDto) {
        const searchRes = await this.dbService.getByOption(this.COLLECTION_NAME, {
            username: userRegisterDto.username
        });
        if (searchRes.id) {
            this.result = resultType_1.Result.fail(resultType_1.statusCodeEnum.BAD_REQUEST, "用户名已存在!");
            return this.result;
        }
        const encryptPassword = await bcrypt.hash(userRegisterDto.password, 10), newUser = new User_1.default((0, uuid_1.v1)(), userRegisterDto.username, encryptPassword);
        await this.dbService.addOne(this.COLLECTION_NAME, newUser).then(res => {
            this.result = resultType_1.Result.successWithCustomCode(resultType_1.statusCodeEnum.CREATED, {
                id: res.id,
                username: res.username
            });
        });
        return this.result;
    }
    async login(userLoginDto) {
        let isUserEXisted, user, token;
        await this.dbService
            .getByOption(this.COLLECTION_NAME, {
            username: userLoginDto.username
        })
            .then(res => {
            isUserEXisted = res.id ? true : false;
            user = res;
        });
        if (!isUserEXisted) {
            this.result = resultType_1.Result.fail(resultType_1.statusCodeEnum.BAD_REQUEST, "该用户不存在!");
            return this.result;
        }
        const validPassword = await bcrypt.compare(userLoginDto.password, user.password);
        if (userLoginDto.username === user.username && validPassword) {
            token = this.jwtService.sign({
                id: user.id,
                userName: userLoginDto.username,
                password: userLoginDto.password
            });
            this.result = resultType_1.Result.success(new UserVo_1.default(user.id, user.username, token));
        }
        else {
            this.result = resultType_1.Result.fail(resultType_1.statusCodeEnum.BAD_REQUEST, "用户名或密码错误!");
        }
        return this.result;
    }
    async getUserInfo(token) {
        const userInfo = this.jwtService.decode(token);
        return userInfo;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map