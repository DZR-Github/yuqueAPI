export default class Article {
    readonly title: string;
    readonly content: string;
    readonly articleId: number;
    readonly time: string;
    readonly imgUrl: string;
    readonly headImgUrl: string;
    readonly userName: string;
    constructor(title: string, content: string, articleId: number, time: string, imgUrl: string, headImgUrl: string, userName: string);
}
