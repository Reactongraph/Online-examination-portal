"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionsService = void 0;
const common_1 = require("@nestjs/common");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
let QuestionsService = class QuestionsService {
    async create(createQuestionDto, path) {
        prisma.$connect();
        let myBool = Boolean(createQuestionDto === null || createQuestionDto === void 0 ? void 0 : createQuestionDto.status);
        let date = new Date(createQuestionDto === null || createQuestionDto === void 0 ? void 0 : createQuestionDto.question_time);
        const user = await prisma.Questions.create({
            data: {
                question: createQuestionDto.question,
                question_type: createQuestionDto.question_type,
                question_time: createQuestionDto.question_time,
                images: path,
                status: myBool,
            }
        });
        return 'inserted';
    }
    async findAll() {
        prisma.$connect();
        const users = await prisma.Questions.findMany();
        return `${JSON.stringify(users)}`;
    }
    async findOne(id) {
        const user = await prisma.Questions.findUnique({
            where: {
                id: id,
            },
        });
        console.log(user);
        if (!user) {
            return `user not found with this  ${id}`;
        }
        return user;
    }
    async update(id, updateRestApiDto) {
        const updateUser = await prisma.Questions.update({
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
        const delete_user = await prisma.Questions.delete({
            where: {
                id: id
            },
        });
        return `This action removes a #${id} restApi`;
    }
};
QuestionsService = __decorate([
    (0, common_1.Injectable)()
], QuestionsService);
exports.QuestionsService = QuestionsService;
//# sourceMappingURL=questions.service.js.map