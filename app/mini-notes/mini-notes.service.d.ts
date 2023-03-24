import { Result } from "src/config/resultType";
import { MiniNoteDto } from "./dto/MiniNoteDto";
import { MiniNotesDbService } from "src/miniNotesDB/mini-notes-db/mini-notes-db.service";
import { UserService } from "src/user/user.service";
export declare class MiniNotesService {
    private readonly userService;
    private readonly MiniNotesDbService;
    private readonly COLLECTION_NAME;
    private result;
    constructor(userService: UserService, MiniNotesDbService: MiniNotesDbService);
    private getUserIdByToken;
    addMiniNote(MiniNoteDto: MiniNoteDto, headers: Record<string, string>): Promise<Result>;
    getAllMiniNotes(headers: Record<string, string>): Promise<Result>;
    updateMiniNotes(MiniNoteDto: MiniNoteDto, headers: Record<string, string>): Promise<Result>;
    removeMiniNotes(notesId: number, headers: Record<string, string>): Promise<Result>;
}
