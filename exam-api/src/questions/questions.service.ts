import { Injectable } from '@nestjs/common';
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
@Injectable()
export class QuestionsService {
  async create(createQuestionDto: any) {
    prisma.$connect();
    const question = await prisma.Questions.create({
      data: {
        question: createQuestionDto?.question,
        question_type: createQuestionDto?.question_type,
        question_time: createQuestionDto?.question_time,
        status: createQuestionDto?.status,
      },
    });

    const updatedOptions = createQuestionDto.options.flatMap((element) => [
      {
        ...element,
        question_id: question.id,
      },
    ]);
    const bulk_insertion = updatedOptions.map(async function (index) {
      const createMany = await prisma.Questions_options.createMany({
        data: updatedOptions[index],
      });
    });

    return 'inserted';
  }

  async findAll() {
    prisma.$connect();
    const question = await prisma.Questions.findMany();
    const Questions_options = await prisma.Questions_options.findMany();
    const arr = [question, Questions_options];

    return arr;
  }

  async findOne(id: string) {
    const question_options = await prisma.Questions_options.findUnique({
      where: {
        id: id,
      },
    });
    const question = await prisma.Questions.findUnique({
      where: {
        id: question_options.question_id,
      },
    });

    if (!question && !question_options) {
      return `user not found with this  ${id}`;
    }
    const arr = [question, question_options];
    return arr;
  }

  async update(id: string, updateRestApiDto: any) {
    const update = await prisma.Questions.findUnique({
      where: {
        id: id,
      },
      include: {
        questions_options: true,
      },
    });
    console.log(update);

    for (const [index, element] of updateRestApiDto.options.entries()) {
      const updatequestion = await prisma.Questions.update({
        where: {
          id: update.id,
        },
        data: { question: updateRestApiDto.questions.question },
      });
      const updatedOptions = await prisma.Questions_options.update({
        where: {
          id: update.questions_options[index].id,
        },
        data: updateRestApiDto.options[index],
      });
    }
    return 'updated';
  }

  async remove(idd: string) {
    const delete_option = await prisma.Questions_options.deleteMany({
      where: {
        question_id: idd,
      },
    });
    const delete_question = await prisma.Questions.delete({
      where: {
        id: idd,
      },
    });

    return `This action removes a # restApi`;
  }
}
