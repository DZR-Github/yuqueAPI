import { Result } from "src/config/resultType";
import { FavourDbService } from "src/favourDB/favour-db/favour-db.service";
import { UserService } from "src/user/user.service";
export declare class FavourService {
    private readonly FavourDbService;
    private readonly userService;
    private readonly COLLECTION_NAME;
    private result;
    constructor(FavourDbService: FavourDbService, userService: UserService);
    private getUserIdByToken;
    giveFavour(headers: Record<string, string>, articleId: number): Promise<Result>;
    getStatus(headers: Record<string, string>, articleId: number): Promise<Result>;
    getLikeQuantity(articleId: number): Promise<Result>;
    removeFavour(headers: Record<string, string>, articleId: number): Promise<Result>;
}
