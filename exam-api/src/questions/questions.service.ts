import { Injectable } from '@nestjs/common';
import { QuestionDTO } from './questions.entity';
import { PrismaService } from 'src/prisma.service';
import { Participants, PrismaClient } from '@prisma/client';
@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}
  async create(createQuestionDto: QuestionDTO, path: string) {
    // date comes in string and in db status column data type is boolean so we convert string to boolean
    const myBool = Boolean(createQuestionDto?.status);
    const date = new Date(createQuestionDto?.question_time);
    try {
      // const user = await this.prisma.questions.create({
      // data: {
      //   question: createQuestionDto.question,
      //   question_type: createQuestionDto.question_type,
      //   question_time: createQuestionDto.question_time,
      //   images: path,
      //   status: myBool,
      //   },
      // });
      const user = await this.prisma.questions.create({
        data: {
          question: createQuestionDto.question,
          question_type: createQuestionDto.question_type,
          question_time: createQuestionDto.question_time,
          images: path,
          status: myBool,
          module_id: createQuestionDto.module_id,
          level_id: createQuestionDto.level_id
        },
      });
      return 'inserted';
    } catch (err) {
      return { error: err };
    }
  }

  async findAll() {
    const users = await this.prisma.questions.findMany();

    return `${JSON.stringify(users)}`;
  }

  async findOne(id: string) {
    try {
      const user = await this.prisma.questions.findUnique({
        where: {
          id,
        },
      });
      if (!user) {
        return `user not found with this  ${id}`;
      }
      return user;
    } catch (err) {
      return { error: err };
    }
  }
  async update(id: string, updateRestApiDto: QuestionDTO) {
    try {
      const updateUser = await this.prisma.questions.update({
        where: {
          id,
        },
        data: updateRestApiDto,
      });
      if (!updateUser) {
        return `user not found for this ${id}`;
      }
      return 'updated ';
    } catch (err) {
      return { error: err };
    }
  }

  async remove(id: string) {
    try {
      const delete_user = await this.prisma.questions.delete({
        where: {
          id,
        },
      });
      return `This action removes a #${id} restApi`;
    } catch (err) {}
  }
}
