import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { QuestionDTO } from './questions.entity'
const csv = require('csvtojson')
@Injectable()
export class QuestionsService {
  constructor (private readonly prisma: PrismaService) { }
  async Bulk_insertion (dataa: QuestionDTO) {
    try {
      const CREATE_CSV = await this.prisma.questions.createMany({
        data: dataa
      })
      return CREATE_CSV
    } catch (err) {
      return err
    }
  }

  async create (createQuestionDto: QuestionDTO) {
    try {

      const question = await this.prisma.questions.create({
        data: {
          question: createQuestionDto?.question,
          question_type: createQuestionDto?.question_type,
          options: createQuestionDto.options,
          question_time: createQuestionDto?.question_time,
          status: createQuestionDto?.status,
          level_id: createQuestionDto?.level_id,
          module_id: createQuestionDto?.module_id,
          marks: createQuestionDto?.marks,
          option_type: createQuestionDto?.option_type
        }
      })

      return question
    } catch (error) {

    }
  }

  async findAll () {
    try {
      const FIND_QUESTIONS = await this.prisma.questions.findMany({
        include: { level: true, module: true }
      })
      return FIND_QUESTIONS
    } catch (err) {
      return { error: err }
    }
  }

  async findOne (id: string) {
    try {
      const question = await this.prisma.questions.findUnique({
        where: {
          id
        },
        include: {
          level: true,
          module: true
        }
      })

      if (!question) {
        return `user not found with this  ${id}`
      }
      return question
    } catch (err) {
      return { error: err }
    }
  }

  async update (id: string, updateRestApiDto: QuestionDTO) {
    try {
      const find = await this.prisma.questions.findUnique({ where: { id: id } })
      if (find) {
        return null
      }

      const updatedOptions = await this.prisma.questions.update({
        where: {
          id
        },
        data: updateRestApiDto
      })
      return updatedOptions
    } catch (err) {
      return { error: err }
    }
  }

  async remove (idd: string) {
    try {
      const FIND_DEL = await this.prisma.questions.findUnique({
        where: { id: idd }
      })
      if (!FIND_DEL) {
        return 'data does not exist!'
      }
      await this.prisma.questions.delete({
        where: {
          id: idd
        }
      })

      return 'question deleted'
    } catch (err) {
      return { error: err }
    }
  }
}
