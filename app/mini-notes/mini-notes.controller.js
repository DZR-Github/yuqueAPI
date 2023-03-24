"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiniNotesController = void 0;
const common_1 = require("@nestjs/common");
const mini_notes_service_1 = require("./mini-notes.service");
const MiniNoteDto_1 = require("./dto/MiniNoteDto");
let MiniNotesController = class MiniNotesController {
    constructor(miniNotesService) {
        this.miniNotesService = miniNotesService;
    }
    async addMiniNote(MiniNoteDto, headers) {
        return this.miniNotesService.addMiniNote(MiniNoteDto, headers);
    }
    async getAllMiniNotes(headers) {
        return this.miniNotesService.getAllMiniNotes(headers);
    }
    async updateMiniNotes(MiniNoteDto, headers) {
        return this.miniNotesService.updateMiniNotes(MiniNoteDto, headers);
    }
    async removeMiniNotes(notesId, headers) {
        return this.miniNotesService.removeMiniNotes(Math.floor(Number(notesId)), headers);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MiniNoteDto_1.MiniNoteDto, Object]),
    __metadata("design:returntype", Promise)
], MiniNotesController.prototype, "addMiniNote", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MiniNotesController.prototype, "getAllMiniNotes", null);
__decorate([
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MiniNoteDto_1.MiniNoteDto, Object]),
    __metadata("design:returntype", Promise)
], MiniNotesController.prototype, "updateMiniNotes", null);
__decorate([
    (0, common_1.Delete)(":notesId"),
    __param(0, (0, common_1.Param)("notesId")),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], MiniNotesController.prototype, "removeMiniNotes", null);
MiniNotesController = __decorate([
    (0, common_1.Controller)("mininotes"),
    __metadata("design:paramtypes", [mini_notes_service_1.MiniNotesService])
], MiniNotesController);
exports.MiniNotesController = MiniNotesController;
//# sourceMappingURL=mini-notes.controller.js.map