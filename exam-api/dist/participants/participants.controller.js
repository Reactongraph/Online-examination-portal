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
exports.ParticipantsController = void 0;
const common_1 = require("@nestjs/common");
const participants_entity_1 = require("./participants.entity");
const participants_service_1 = require("./participants.service");
let ParticipantsController = class ParticipantsController {
    constructor(participant) {
        this.participant = participant;
    }
    async create(createparticipants) {
        console.log(createparticipants.name);
        const participant_create = await this.participant.create(createparticipants);
        const reset_link = await this.participant.reset_link(participant_create.email, participant_create.password);
        return participant_create;
    }
    async findAll() {
        const participant_read = await this.participant.findAll();
        return participant_read;
    }
    async findOne(id) {
        const find_one = await this.participant.findOne(id);
        return find_one;
    }
    async update(id, updateparticipants) {
        console.log("id", id);
        console.log(updateparticipants === null || updateparticipants === void 0 ? void 0 : updateparticipants.name);
        const update_participants = await this.participant.update(id, updateparticipants);
        return update_participants;
    }
    async remove(id) {
        const delete_participants = await this.participant.remove(id);
        return delete_participants;
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [participants_entity_1.participants_dto]),
    __metadata("design:returntype", Promise)
], ParticipantsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('find'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ParticipantsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ParticipantsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, participants_entity_1.participants_dto]),
    __metadata("design:returntype", Promise)
], ParticipantsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ParticipantsController.prototype, "remove", null);
ParticipantsController = __decorate([
    (0, common_1.Controller)('participants'),
    __metadata("design:paramtypes", [participants_service_1.ParticipantsService])
], ParticipantsController);
exports.ParticipantsController = ParticipantsController;
//# sourceMappingURL=participants.controller.js.map