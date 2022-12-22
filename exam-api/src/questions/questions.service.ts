import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { QuestionDTO } from './questions.entity'
const csv = require('csvtojson')
@Injectable()
export class QuestionsService {
  constructor (private readonly prisma: PrismaService) {}
  async Bulk_insertion (file: any) {
    try {
      const csvfilepath = process.cwd() + '/' + file.path

      const QUESTION_CSV = await csv().fromFile(csvfilepath)
      //  map function convert status field from string to boolean because data from csv comes in string format but in database status is boolean type format
      QUESTION_CSV.map((OneRow) => {
        OneRow.status = JSON.parse(OneRow.status)
      })
      const CREATE_CSV = await this.prisma.questions.createMany({
        data: QUESTION_CSV
      })
      return CREATE_CSV
    } catch (err) {
      return err
    }
  }

  async create (createQuestionDto: QuestionDTO) {
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
  }

  async findAll () {
    const FIND_QUESTIONS = await this.prisma.questions.findMany({
      include: { level: true, module: true }
    })
    return FIND_QUESTIONS
  }

  async findOne (id: string) {
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
  }

  async update (id: string, updateRestApiDto: QuestionDTO) {
    const find = await this.prisma.questions.findUnique({ where: { id } })
    if (!find) {
      return 'data does not exist!'
    }

    const updatedOptions = await this.prisma.questions.update({
      where: {
        id
      },
      data: updateRestApiDto
    })
    return updatedOptions
  }

  async remove (idd: string) {
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
  }
}
