"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleService = void 0;
const common_1 = require("@nestjs/common");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
let ModuleService = class ModuleService {
    async create(params) {
        prisma.$connect();
        console.log('in service ', params === null || params === void 0 ? void 0 : params.module);
        const module = params === null || params === void 0 ? void 0 : params.module;
        const status = params === null || params === void 0 ? void 0 : params.status;
        const toLowerCaseModule = params === null || params === void 0 ? void 0 : params.module.toLowerCase();
        const users = await prisma.module.create({
            data: {
                module: toLowerCaseModule,
                status: status,
            },
        });
        return 'module inserted';
    }
    async findAll() {
        prisma.$connect();
        const users = await prisma.Module.findMany();
        console.log(users);
        return `${JSON.stringify(users)}`;
    }
    async findOne(id) {
        console.log(id);
        const user = await prisma.Module.findUnique({
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
        const check_id = await prisma.Module.findUnique({
            where: {
                id: id,
            },
        });
        console.log('checkid', check_id.module);
        if ((updateRestApiDto === null || updateRestApiDto === void 0 ? void 0 : updateRestApiDto.module) == check_id.module) {
            return { message: 'module already exist' };
        }
        if (check_id == null) {
            return 'invalid id ';
        }
        else {
            const updateUser = await prisma.Module.update({
                where: {
                    id: id,
                },
                data: updateRestApiDto,
            });
            if (!updateUser) {
                return `user not found for this ${id}`;
            }
            return `${id} `;
        }
    }
    async remove(id) {
        const delete_user = await prisma.Module.delete({
            where: {
                id: id,
            },
        });
        return `This action removes a #${id} restApi`;
    }
};
ModuleService = __decorate([
    (0, common_1.Injectable)()
], ModuleService);
exports.ModuleService = ModuleService;
//# sourceMappingURL=module.service.js.map