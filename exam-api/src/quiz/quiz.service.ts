import { Injectable } from '@nestjs/common';
import { QuizDTO } from './quiz.entity';
import { PrismaService } from 'src/prisma.service';
import { Participants, PrismaClient } from '@prisma/client';
@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}
  async create(createQuizDto: QuizDTO, path: string) {
    // date comes in string and in db status column data type is boolean so we convert string to boolean
    const myBool = Boolean(createQuizDto?.status);
    const date = new Date(createQuizDto?.start_date);
    try {
      const quiz = await this.prisma.quiz.create({
        data: {
          quiz_name: createQuizDto.quiz_name,
          quiz_image: createQuizDto.quiz_image,
          start_date: createQuizDto.start_date,
          start_time: createQuizDto.start_time,
          description: createQuizDto.description,
          status: myBool,
          module_id: createQuizDto.module_id,
          level_id: createQuizDto.level_id
        },
      });
      return quiz;
    } catch (err) {
      return { error: err };
    }
  }

  async findAll() {
    const quizzes = await this.prisma.quiz.findMany();

    return `${JSON.stringify(quizzes)}`;
  }

  async findOne(id: string) {
    try {
      const quiz = await this.prisma.quiz.findUnique({
        where: {
          id,
        },
      });
      if (!quiz) {
        return `quiz not found with this  ${id}`;
      }
      return quiz;
    } catch (err) {
      return { error: err };
    }
  }
  async update(id: string, updateRestApiDto: QuizDTO) {
    try {
      const updateQuiz = await this.prisma.quiz.update({
        where: {
          id,
        },
        data: updateRestApiDto,
      });
      if (!updateQuiz) {
        return `quiz not found for this ${id}`;
      }
      return updateQuiz;
    } catch (err) {
      return { error: err };
    }
  }

  async remove(id: string) {
    try {
      const deleteQuiz = await this.prisma.quiz.delete({
        where: {
          id,
        },
      });
      return deleteQuiz;
    } catch (err) {}
  }
}
