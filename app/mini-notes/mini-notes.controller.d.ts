import { MiniNotesService } from "./mini-notes.service";
import { MiniNoteDto } from "./dto/MiniNoteDto";
export declare class MiniNotesController {
    private readonly miniNotesService;
    constructor(miniNotesService: MiniNotesService);
    addMiniNote(MiniNoteDto: MiniNoteDto, headers: Record<string, string>): Promise<import("../config/resultType").Result>;
    getAllMiniNotes(headers: Record<string, string>): Promise<import("../config/resultType").Result>;
    updateMiniNotes(MiniNoteDto: MiniNoteDto, headers: Record<string, string>): Promise<import("../config/resultType").Result>;
    removeMiniNotes(notesId: number, headers: Record<string, string>): Promise<import("../config/resultType").Result>;
}
