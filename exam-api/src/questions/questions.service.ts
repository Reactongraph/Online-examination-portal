import { Injectable } from '@nestjs/common'
import { QuestionDTO } from './questions.entity'
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
@Injectable()
export class QuestionsService {
  async create (createQuestionDto: QuestionDTO, path: string) {
    prisma.$connect()

    // date comes in string and in db status column data type is boolean so we convert string to boolean
    const myBool = Boolean(createQuestionDto?.status)
    const date = new Date(createQuestionDto?.question_time)
    const user = await prisma.Questions.create(
      {
        data: {
          question: createQuestionDto.question,
          question_type: createQuestionDto.question_type,
          question_time: createQuestionDto.question_time,
          images: path,
          status: myBool

        }

      }
    )
    return 'inserted'
  }

  async findAll () {
    prisma.$connect()
    const users = await prisma.Questions.findMany()

    return `${JSON.stringify(users)}`
  }

  async findOne (id: string) {
    const user = await prisma.Questions.findUnique({
      where: {
        id
      }
    })
    console.log(user)
    if (!user) {
      return `user not found with this  ${id}`
    }
    return user
  }

  async update (id: string, updateRestApiDto: QuestionDTO) {
    const updateUser = await prisma.Questions.update({
      where: {
        id
      },
      data: updateRestApiDto
    })
    if (!updateUser) {
      return `user not found for this ${id}`
    }
    return 'updated '
  }

  async remove (id: string) {
    const delete_user = await prisma.Questions.delete({
      where: {
        id
      }
    })
    return `This action removes a #${id} restApi`
  }
}
