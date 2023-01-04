import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Res
} from '@nestjs/common'
import { QuizService } from './quiz.service'
import { QuizDTO } from './quiz.entity'
import { ApiTags } from '@nestjs/swagger'
// import { Response } from 'express';
import { Response } from 'express'
import { HttpStatus } from '@nestjs/common/enums'

@ApiTags('Quiz')
@Controller('quiz')
export class QuizController {
  constructor (private readonly quizService: QuizService) { }
  @Post('create')
  async create_question (@Body() createquiz: QuizDTO, @Res({ passthrough: true }) response: Response) {
    const data = await this.quizService.create(createquiz)
    if (data === null) {
      response.status(HttpStatus.BAD_REQUEST).json([])
    }

    return data
  }

  @Get('find')
  async findAll () {
    const quizzes = await this.quizService.findAll()
    return quizzes
  }

  @Get('find/:id')
  async findOne (@Param('id') id: string) {
    const FIND_ONE = await this.quizService.findOne(id)

    return FIND_ONE
  }

  @Patch(':id')
  async update (@Param('id') id: string, @Body() updatequiz: QuizDTO, @Res({ passthrough: true }) response: Response) {
    const UPDATE_QUIZ = await this.quizService.update(id, updatequiz)
    if (UPDATE_QUIZ === null) {
      response.status(HttpStatus.BAD_REQUEST).json([])
    }
    return UPDATE_QUIZ
  }

  // this controller is used to delete  quiz data
  @Delete(':id')
  async remove (@Param('id') id: string) {
    const DELETE_QUIZ = await this.quizService.remove(id)
    return DELETE_QUIZ
  }
}
