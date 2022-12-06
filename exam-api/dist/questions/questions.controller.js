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
exports.QuestionsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const questions_service_1 = require("./questions.service");
const questions_entity_1 = require("./questions.entity");
const path_1 = require("path");
const rxjs_1 = require("rxjs");
let QuestionsController = class QuestionsController {
    constructor(questionservice) {
        this.questionservice = questionservice;
    }
    postAdd(profile, createquestion) {
        new common_1.ParseFilePipe({
            validators: [
                new common_1.MaxFileSizeValidator({ maxSize: 1000 }),
                new common_1.FileTypeValidator({ fileType: 'jpeg' }),
            ],
        });
        const create_question = this.questionservice.create(createquestion, profile.path);
        return {
            message: "question created "
        };
    }
    findProfileImage(imagename, res) {
        return (0, rxjs_1.of)(res.sendFile((0, path_1.join)(process.cwd(), 'images/' + imagename)));
    }
    async findAll() {
        const participant_read = await this.questionservice.findAll();
        return participant_read;
    }
    async findOne(id) {
        const find_one = await this.questionservice.findOne(id);
        return find_one;
    }
    async update(id, updateparticipants) {
        const update_participants = await this.questionservice.update(id, updateparticipants);
        return update_participants;
    }
    async remove(id) {
        const delete_participants = await this.questionservice.remove(id);
        return delete_participants;
    }
};
__decorate([
    (0, common_1.Post)('file-upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('profile')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, questions_entity_1.QuestionDTO]),
    __metadata("design:returntype", Object)
], QuestionsController.prototype, "postAdd", null);
__decorate([
    (0, common_1.Get)('image/:imagename'),
    __param(0, (0, common_1.Param)('imagename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], QuestionsController.prototype, "findProfileImage", null);
__decorate([
    (0, common_1.Get)('find'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('find/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, questions_entity_1.QuestionDTO]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "remove", null);
QuestionsController = __decorate([
    (0, common_1.Controller)('questions'),
    __metadata("design:paramtypes", [questions_service_1.QuestionsService])
], QuestionsController);
exports.QuestionsController = QuestionsController;
//# sourceMappingURL=questions.controller.js.map