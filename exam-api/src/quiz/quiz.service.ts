import { Injectable } from '@nestjs/common'
import { QuizDTO } from './quiz.entity';
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class QuizService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createQuizDto: QuizDTO) {
    // date comes in string and in db status column data type is boolean so we convert string to boolean
    const myBool = Boolean(createQuizDto?.status)
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
          level_id: createQuizDto.level_id,
        }
      })
      return quiz
    } catch (err) {
      return { error: err }
    }
  }

  async findAll() {
    const leveldata = await this.prisma.quiz.findMany({ include: { level: true } })

    const quiz = await this.prisma.quiz.aggregateRaw({
      pipeline: [
        {
          '$lookup': {
            'from': 'Module',
            'localField': 'module_id',
            'foreignField': '_id',
            'as': 'module'
          }
        },
      ],
    })

    for (let [index, x] of leveldata.entries()) {
      quiz[index]["level"] = leveldata[index].level

    }
    return { quiz }
  }

  async findOne(id: string) {
    try {
      const quiz = await this.prisma.quiz.findMany({
        where: {
          id,
        },
        include: { level: true, module: true }
      })


      if (!quiz) {
        return `quiz not found with this  ${id}`
      }
      return quiz
    } catch (err) {
      return { error: err }
    }
  }

  async update(id: string, updateRestApiDto: QuizDTO) {
    try {
      const updateQuiz = await this.prisma.quiz.update({
        where: {
          id,
        },
        data: updateRestApiDto,
      })
      if (!updateQuiz) {
        return `quiz not found for this ${id}`
      }
      return updateQuiz
    } catch (err) {
      return { error: err }
    }
  }

  async remove(id: string) {
    try {
      const deleteQuiz = await this.prisma.quiz.delete({
        where: {
          id,
        }
      })
      return deleteQuiz
    } catch (err) {
      return err
    }
  }
}
