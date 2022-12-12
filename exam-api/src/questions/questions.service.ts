import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { QuestionDTO } from './questions.entity';
@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}
  async create(createQuestionDto: QuestionDTO) {
    const question = await this.prisma.questions.create({
      data: {
        question: createQuestionDto?.question,
        question_type: createQuestionDto?.question_type,
        options: createQuestionDto?.options,
        question_time: createQuestionDto?.question_time,
        status: createQuestionDto?.status,
        level_id: createQuestionDto?.level_id,
        module_id: createQuestionDto?.module_id,
        marks: createQuestionDto?.marks,
        option_type: createQuestionDto?.option_type,
      },
    });

    return question;
  }

  async findAll() {
    const find_questions = await this.prisma.questions.findMany({
      include: { level: true, module: true },
    });

    return find_questions;
  }

  async findOne(id: string) {
    const question = await this.prisma.questions.findUnique({
      where: {
        id: id,
      },
      include: {
        level: true,
        module: true,
      },
    });

    if (!question) {
      return `user not found with this  ${id}`;
    }
    return question;
  }
  async update(id: string, updateRestApiDto: QuestionDTO) {
    const find = await this.prisma.questions.findUnique({ where: { id: id } });
    if (!find) {
      return 'data does not exist!';
    }

    const updatedOptions = await this.prisma.questions.update({
      where: {
        id: id,
      },
      data: updateRestApiDto,
    });
    return updatedOptions;
  }

  async remove(idd: string) {
    const find_del = await this.prisma.questions.findUnique({
      where: { id: idd },
    });
    if (!find_del) {
      return 'data does not exist!';
    }
    await this.prisma.questions.delete({
      where: {
        id: idd,
      },
    });

    return `question deleted`;
  }
}
