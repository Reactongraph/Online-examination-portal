"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LevelModule = void 0;
var common_1 = require("@nestjs/common");
var level_service_1 = require("./level.service");
var level_controller_1 = require("./level.controller");
var prisma_service_1 = require("../prisma.service");
var LevelModule = /** @class */ (function () {
    function LevelModule() {
    }
    LevelModule = __decorate([
        (0, common_1.Module)({
            controllers: [level_controller_1.LevelController],
            providers: [level_service_1.LevelService, prisma_service_1.PrismaService]
        })
    ], LevelModule);
    return LevelModule;
}());
exports.LevelModule = LevelModule;
