export declare class LowdbService {
    private quantitySum;
    private db;
    constructor(collectionName: any);
    private initDatabase;
    setData(collectionName: string, obj: object): Promise<boolean>;
    addOne<oneType>(collectionName: string, obj: oneType): Promise<oneType>;
    delByOption(collectionName: string, option: object): Promise<object>;
    update(collectionName: string, selectOption: object, newValue: object): Promise<object>;
    getAll(collectionName: string): Promise<any>;
    getByOption(collectionName: string, option: object): Promise<any>;
    getSpecifiedQuatity(collectionName: string, quantity: number): Promise<any>;
}
