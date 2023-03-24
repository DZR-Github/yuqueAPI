import UserLoginDto from "./dto/user-login.dto";
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: UserLoginDto): Promise<{
        username: string;
        password: string;
    }>;
}
export {};
