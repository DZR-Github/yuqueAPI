import { FavourService } from "./favour.service";
export declare class FavourController {
    private readonly favourService;
    constructor(favourService: FavourService);
    giveFavour(articleId: number, headers: Record<string, string>): Promise<import("../config/resultType").Result>;
    getStatus(articleId: number, headers: Record<string, string>): Promise<import("../config/resultType").Result>;
    getLikeQuantity(articleId: number): Promise<import("../config/resultType").Result>;
    removeFavour(articleId: number, headers: Record<string, string>): Promise<import("../config/resultType").Result>;
}
