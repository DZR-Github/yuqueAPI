import { Result } from "src/config/resultType";
import PersonalMsgDbService from "src/personalMsgDB/personal-msg-db/personal-msg-db.service";
import { UserService } from "src/user/user.service";
import personalMsgDto from "./dto/personalMsgDto";
interface Msg {
    userId: string;
    nickname: string;
    collectionSum: number;
    personalizedSignature: string;
}
export declare class PersonalMsgService {
    private readonly userService;
    private readonly PersonalMsgDbService;
    private result;
    private readonly COLLECTION_NAME;
    constructor(userService: UserService, PersonalMsgDbService: PersonalMsgDbService);
    private getUserIdByToken;
    addPersonalMsg(personalMsgDto: personalMsgDto, headers: Record<string, string>): Promise<Result>;
    getPersonalMsg(headers: Record<string, string>): Promise<Result>;
    getPerson(headers: Record<string, string>): Promise<any>;
    updatePersonalMsg(personalMsgDto: personalMsgDto, headers: Record<string, string>): Promise<Result>;
    updateMsg(newData: Msg, headers: Record<string, string>): Promise<any>;
}
export {};
