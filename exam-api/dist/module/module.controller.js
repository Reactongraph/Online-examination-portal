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
exports.ModuleController = void 0;
const common_1 = require("@nestjs/common");
const module_entity_1 = require("./module.entity");
const module_service_1 = require("./module.service");
let ModuleController = class ModuleController {
    constructor(Modules) {
        this.Modules = Modules;
    }
    async create(module) {
        console.log(module.module, module.status);
        const module_create = await this.Modules.create(module);
        return `${module_create}`;
    }
    async findAll() {
        const module_read = await this.Modules.findAll();
        return module_read;
    }
    async findOne(id) {
        const find_one = await this.Modules.findOne(id);
        return find_one;
    }
    async update(id, update_module) {
        const update_Module = await this.Modules.update(id, update_module);
        return update_Module;
    }
    async remove(id) {
        const delete_Module = await this.Modules.remove(id);
        return delete_Module;
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [module_entity_1.module_dto]),
    __metadata("design:returntype", Promise)
], ModuleController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('find'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ModuleController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ModuleController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, module_entity_1.module_dto]),
    __metadata("design:returntype", Promise)
], ModuleController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ModuleController.prototype, "remove", null);
ModuleController = __decorate([
    (0, common_1.Controller)('module'),
    __metadata("design:paramtypes", [module_service_1.ModuleService])
], ModuleController);
exports.ModuleController = ModuleController;
//# sourceMappingURL=module.controller.js.map