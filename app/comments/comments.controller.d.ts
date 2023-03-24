import { CommentsService } from "./comments.service";
import { addCommentsDto } from "./dto/addCommentsDto";
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    addComments(addCommentsDto: addCommentsDto, headers: Record<string, string>): Promise<import("../config/resultType").Result>;
    getCommentsById(articleId: number): Promise<import("../config/resultType").Result>;
}
