import { Result } from "src/config/resultType";
import { addCommentsDto } from "./dto/addCommentsDto";
import { CommentsDbService } from "src/commentsDB/comments-db/comments-db.service";
import PersonalMsgDbService from "src/personalMsgDB/personal-msg-db/personal-msg-db.service";
import { UserService } from "src/user/user.service";
export declare class CommentsService {
    private readonly CommentsDbService;
    private readonly PersonalMsgDbService;
    private readonly userService;
    private readonly COLLECTION_NAME;
    private result;
    constructor(CommentsDbService: CommentsDbService, PersonalMsgDbService: PersonalMsgDbService, userService: UserService);
    private getUserIdByToken;
    addComments(addCommentsDto: addCommentsDto, headers: Record<string, string>): Promise<Result>;
    getCommentsById(articleId: number): Promise<Result>;
}