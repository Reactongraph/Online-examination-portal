import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
  StreamableFile
} from '@nestjs/common'
import { QuestionsService } from './questions.service'
import { QuestionDTO } from './questions.entity'
import { ApiTags } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'
import { Response } from 'express'
import { HttpStatus } from '@nestjs/common/enums'

@ApiTags('Questions')
@Controller('questions')
export class QuestionsController {
  constructor (private readonly questionservice: QuestionsService) {}
  @Post('uploads')
  @UseInterceptors(FileInterceptor('File'))
  async uploadFile (
    @UploadedFile() file: Express.Multer.File,
      @Res() res,
      @Body() createquestion: QuestionDTO
  ): Promise<StreamableFile> {
    const data = await this.questionservice.Bulk_insertion(createquestion)
    if (!data) {
      return res.end('data is not inserted')
    }
    return res.end('data inserted')
  }

  @Post('create')
  async create_question (
  @Body() createquestion: QuestionDTO,
    @Res({ passthrough: true }) response: Response
  ) {
    const data = this.questionservice.create(createquestion)
    if (data === null) {
      response.status(HttpStatus.BAD_REQUEST).json([])
    }
    return await data
  }

  @Get('find')
  async findAll () {
    const QUESTION_READ = await this.questionservice.findAll()
    return QUESTION_READ
  }

  @Get('find/:id')
  async findOne (@Param('id') id: string) {
    const FIND_ONE = await this.questionservice.findOne(id)
    return FIND_ONE
  }

  @Patch(':id')
  async update (
  @Param('id') id: string,
    @Body() updatequestion: QuestionDTO,
    @Res({ passthrough: true }) response: Response
  ) {
    const UPDATE_QUESTIONS = await this.questionservice.update(
      id,
      updatequestion
    )
    if (UPDATE_QUESTIONS === null) {
      response.status(HttpStatus.BAD_REQUEST).json([])
    }
    return UPDATE_QUESTIONS
  }

  // this controller is used to delete  participant data
  @Delete(':id')
  async remove (@Param('id') id: string) {
    const DELETE_QUESTIONS = await this.questionservice.remove(id)
    return DELETE_QUESTIONS
  }
}
