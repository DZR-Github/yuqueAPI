import { UserService } from "./user.service";
import UserLoginDto from "./dto/user-login.dto";
import UserRegisterDto from "./dto/user-register.dto";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    login(userLoginDto: UserLoginDto): Promise<import("../config/resultType").Result>;
    register(userRegisterDto: UserRegisterDto): Promise<import("../config/resultType").Result>;
}
