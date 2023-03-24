import { Result } from "src/config/resultType";
import { UserService } from "src/user/user.service";
import { addCollectionDto } from "./dto/add-collection.dto";
import CollectionDbService from "src/collectionDB/collection-db/collection-db.service";
import ArticleDbService from "src/article-db/article-db.service";
import PersonalMsgDbService from "src/personalMsgDB/personal-msg-db/personal-msg-db.service";
export declare class CollectionService {
    private readonly userService;
    private readonly CollectionDbService;
    private readonly ArticleDbService;
    private readonly PersonalMsgDbService;
    private readonly COLLECTION_NAME;
    private result;
    constructor(userService: UserService, CollectionDbService: CollectionDbService, ArticleDbService: ArticleDbService, PersonalMsgDbService: PersonalMsgDbService);
    private getUserIdByToken;
    getCollections(headers: Record<string, string>): Promise<Result>;
    addCollection(addCollectionDto: addCollectionDto, headers: Record<string, string>): Promise<Result>;
    removeCollection(articleId: number, headers: Record<string, string>): Promise<Result>;
}
