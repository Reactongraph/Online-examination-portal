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
        option: createQuestionDto.options,
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
    const question = await this.prisma.questions.findMany();

    const data = {
      question,
    };
    return data;
  }

  async findOne(id: string) {
    const question = await this.prisma.questions.findUnique({
      where: {
        id: id,
      },
    });

    if (!question) {
      return `user not found with this  ${id}`;
    }
    const arr = [question];
    return arr;
  }

  async update(id: string, updateRestApiDto: any) {
    const find = await this.prisma.questions.findUnique({ where: { id: id } });
    if (!find) {
      return 'data is not exist!';
    }

    const updatedOptions = await this.prisma.questions.update({
      where: {
        id: id,
      },
      data: {
        option: updateRestApiDto.options,
        question: updateRestApiDto.questions[0].question,
      },
    });
    return updatedOptions;
  }

  async remove(idd: string) {
    const find_del = await this.prisma.questions.findUnique({
      where: { id: idd },
    });
    if (!find_del) {
      return 'data is not exist!';
    }
    const delete_question = await this.prisma.questions.delete({
      where: {
        id: idd,
      },
    });

    return `question deleted  `;
  }
}
