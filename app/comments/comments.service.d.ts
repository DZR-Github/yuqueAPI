import { Result } from "src/config/resultType";
import { addCommentsDto } from "./dto/addCommentsDto";
import { CommentsDbService } from "src/commentsDB/comments-db/comments-db.service";
import { PersonalMsgService } from "src/personal-msg/personal-msg.service";
export declare class CommentsService {
    private readonly CommentsDbService;
    private readonly PersonalMsgService;
    private readonly COLLECTION_NAME;
    private result;
    constructor(CommentsDbService: CommentsDbService, PersonalMsgService: PersonalMsgService);
    addComments(addCommentsDto: addCommentsDto, headers: Record<string, string>): Promise<Result>;
    getCommentsById(articleId: number): Promise<Result>;
}
