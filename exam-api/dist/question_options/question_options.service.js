"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionOptionsService = void 0;
const common_1 = require("@nestjs/common");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
let QuestionOptionsService = class QuestionOptionsService {
    async create(options_dto, path) {
        prisma.$connect();
        let status = Boolean(options_dto === null || options_dto === void 0 ? void 0 : options_dto.status);
        const user = await prisma.Questions_options.create({
            data: {
                option_type: options_dto.option_type,
                option: options_dto.option,
                question_id: options_dto.question_id,
                correct: options_dto === null || options_dto === void 0 ? void 0 : options_dto.correct,
                image: path,
                status: status,
            }
        });
        return 'inserted';
    }
    async findAll() {
        prisma.$connect();
        const users = await prisma.Questions_options.findMany();
        return `${JSON.stringify(users)}`;
    }
    async findOne(id) {
        console.log(id);
        const user = await prisma.Questions_options.findUnique({
            where: {
                id: id,
            },
        });
        if (!user) {
            return `user not found with this  ${id}`;
        }
        return user;
    }
    async update(id, updateRestApiDto) {
        const updateUser = await prisma.Questions_options.update({
            where: {
                id: id,
            },
            data: updateRestApiDto
        });
        if (!updateUser) {
            return `user not found for this ${id}`;
        }
        return `updated `;
    }
    async remove(id) {
        const delete_user = await prisma.Questions_options.delete({
            where: {
                id: id
            },
        });
        return `This action removes a #${id} restApi`;
    }
};
QuestionOptionsService = __decorate([
    (0, common_1.Injectable)()
], QuestionOptionsService);
exports.QuestionOptionsService = QuestionOptionsService;
//# sourceMappingURL=question_options.service.js.map