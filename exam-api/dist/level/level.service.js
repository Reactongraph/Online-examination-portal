"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LevelService = void 0;
const common_1 = require("@nestjs/common");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
let LevelService = class LevelService {
    async create(params) {
        prisma.$connect();
        console.log("in service ", params === null || params === void 0 ? void 0 : params.level);
        const level = params === null || params === void 0 ? void 0 : params.level;
        const status = params === null || params === void 0 ? void 0 : params.status;
        const users = await prisma.Level.create({
            data: {
                level: level,
                status: status
            }
        });
        return 'level inserted';
    }
    async findAll() {
        prisma.$connect();
        const users = await prisma.Level.findMany();
        console.log(users);
        return `${JSON.stringify(users)}`;
    }
    async findOne(id) {
        console.log(id);
        const user = await prisma.Level.findUnique({
            where: {
                id: id,
            },
        });
        console.log(user);
        if (!user) {
            return `data not found with this  ${id}`;
        }
        return `${JSON.stringify(user)} `;
    }
    async update(id, updateRestApiDto) {
        const updateUser = await prisma.Level.update({
            where: {
                id: id,
            },
            data: updateRestApiDto
        });
        if (!updateUser) {
            return `user not found for this ${id}`;
        }
        return `${id} `;
    }
    async remove(id) {
        const delete_user = await prisma.Level.delete({
            where: {
                id: id
            },
        });
        return `This action removes a #${id} restApi`;
    }
};
LevelService = __decorate([
    (0, common_1.Injectable)()
], LevelService);
exports.LevelService = LevelService;
//# sourceMappingURL=level.service.js.map