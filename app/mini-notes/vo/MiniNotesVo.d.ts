import MiniNotesPojo from "../pojo/MiniNotesPojo";
export default class MiniNotesVo {
    private data;
    private userId;
    constructor(userId: string, data: Array<MiniNotesPojo>);
}
