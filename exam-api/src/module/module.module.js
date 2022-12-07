"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ModuleModule = void 0;
var common_1 = require("@nestjs/common");
var module_service_1 = require("./module.service");
var module_controller_1 = require("./module.controller");
var prisma_service_1 = require("../prisma.service");
var ModuleModule = /** @class */ (function () {
    function ModuleModule() {
    }
    ModuleModule = __decorate([
        (0, common_1.Module)({
            providers: [module_service_1.ModuleService, prisma_service_1.PrismaService],
            controllers: [module_controller_1.ModuleController]
        })
    ], ModuleModule);
    return ModuleModule;
}());
exports.ModuleModule = ModuleModule;
