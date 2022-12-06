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
exports.LevelController = void 0;
const common_1 = require("@nestjs/common");
const level_service_1 = require("./level.service");
const level_entity_1 = require("./level.entity");
let LevelController = class LevelController {
    constructor(Levels) {
        this.Levels = Levels;
    }
    async create(level) {
        const level_create = await this.Levels.create(level);
        return `${level_create}`;
    }
    async findAll() {
        const level_read = await this.Levels.findAll();
        return level_read;
    }
    async findOne(id) {
        const find_one = await this.Levels.findOne(id);
        return find_one;
    }
    async update(id, update_level) {
        console.log("id", id);
        console.log(update_level === null || update_level === void 0 ? void 0 : update_level.level);
        const update_levels = await this.Levels.update(id, update_level);
        return update_levels;
    }
    async remove(id) {
        const delete_level = await this.Levels.remove(id);
        return delete_level;
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [level_entity_1.level_dto]),
    __metadata("design:returntype", Promise)
], LevelController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('find'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LevelController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LevelController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, level_entity_1.level_dto]),
    __metadata("design:returntype", Promise)
], LevelController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LevelController.prototype, "remove", null);
LevelController = __decorate([
    (0, common_1.Controller)('level'),
    __metadata("design:paramtypes", [level_service_1.LevelService])
], LevelController);
exports.LevelController = LevelController;
//# sourceMappingURL=level.controller.js.map