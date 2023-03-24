import { CollectionService } from "./collection.service";
export declare class CollectionController {
    private readonly collectionService;
    constructor(collectionService: CollectionService);
    addCollection(articleId: number, headers: Record<string, string>): Promise<import("../config/resultType").Result>;
    getCollections(headers: Record<string, string>): Promise<import("../config/resultType").Result>;
    removeCollection(articleId: number, headers: Record<string, string>): Promise<import("../config/resultType").Result>;
}
