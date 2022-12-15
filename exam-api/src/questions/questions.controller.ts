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
  StreamableFile,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionDTO } from './questions.entity';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

const csv = require('fast-csv');

@ApiTags('Questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionservice: QuestionsService) {}
  @Post('uploads')
  @UseInterceptors(FileInterceptor('File'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Res() res,
  ): Promise<StreamableFile> {
    const data = await this.questionservice.Bulk_insertion(file);

    if (!data) {
      return res.end('data is not inserted');
    }
    return res.end('data inserted');
  }

  @Post('create')
  async create_question(@Body() createquestion: QuestionDTO) {
    const data = this.questionservice.create(createquestion);

    return await data;
  }

  @Get('find')
  async findAll() {
    const question_read = await this.questionservice.findAll();
    return question_read;
  }

  @Get('find/:id')
  async findOne(@Param('id') id: string) {
    const find_one = await this.questionservice.findOne(id);

    return find_one;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatequestion: QuestionDTO) {
    const update_questions = await this.questionservice.update(
      id,
      updatequestion,
    );
    return update_questions;
  }

  // this controller is used to delete  participant data
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const delete_questions = await this.questionservice.remove(id);
    return delete_questions;
  }
}
