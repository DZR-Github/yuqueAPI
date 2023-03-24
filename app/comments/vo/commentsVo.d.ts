import commentsPojo from "../pojo/commentsPojo";
export default class comments {
    articleId: number;
    comments: Array<commentsPojo>;
    constructor(articleId: number, comments: Array<commentsPojo>);
}
