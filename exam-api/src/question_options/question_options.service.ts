import { Injectable } from '@nestjs/common';
import { json } from 'stream/consumers';
const { PrismaClient } = require("@prisma/client");
import { question_dto } from './question_options.entity';
const prisma = new PrismaClient();
@Injectable()
export class QuestionOptionsService {
    async create(options_dto: question_dto, path: string) {
        prisma.$connect();

        // date comes in string and in db status column data type is boolean so we convert string to boolean
        let status = Boolean(options_dto?.status)


        const user = await prisma.Questions_options.create(
            {
                data: {
                    option_type: options_dto.option_type,
                    option: options_dto.option,
                    question_id: options_dto.question_id,
                    correct: options_dto?.correct,
                    image: path,
                    status: status,

                }

            }
        )
        return 'inserted';

    }
    async findAll() {
        prisma.$connect();
        const users = await prisma.Questions_options.findMany()

        return `${JSON.stringify(users)}`;
    }
    async findOne(id: string) {
        console.log(id);

        const user = await prisma.Questions_options.findUnique({
            where: {
                id: id,
            },
        })
        if (!user) {
            return `user not found with this  ${id}`
        }
        return user
    }
    async update(id: string, updateRestApiDto: question_dto) {
        const updateUser = await prisma.Questions_options.update({
            where: {
                id: id,
            },
            data: updateRestApiDto
        })
        if (!updateUser) {
            return `user not found for this ${id}`
        }
        return `updated `;
    }
    async remove(id: string) {
        const delete_user = await prisma.Questions_options.delete({
            where: {
                id: id
            },
        })
        return `This action removes a #${id} restApi`;
    }
}
