import { PersonalMsgService } from "./personal-msg.service";
import personalMsgDto from "./dto/personalMsgDto";
export default class PersonalMsgController {
    private readonly personalMsgService;
    constructor(personalMsgService: PersonalMsgService);
    create(personalMsgDto: personalMsgDto, headers: Record<string, string>): Promise<import("../config/resultType").Result>;
    getPersonalMsg(headers: Record<string, string>): Promise<import("../config/resultType").Result>;
    updatePersonalMsg(personalMsgDto: personalMsgDto, headers: Record<string, string>): Promise<import("../config/resultType").Result>;
}
