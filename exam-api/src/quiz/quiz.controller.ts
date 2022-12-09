import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizDTO } from './quiz.entity';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}
  @Post('create')
  async create_question(@Body() createquiz: QuizDTO) {
    const data = await this.quizService.create(createquiz);

    return data;
  }

  @Get('find')
  async findAll() {
    const quizzes = await this.quizService.findAll();
    return quizzes;
  }

  @Get('find/:id')
  async findOne(@Param('id') id: string) {
    const find_one = await this.quizService.findOne(id);

    return find_one;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatequiz: QuizDTO) {
    const update_quiz = await this.quizService.update(id, updatequiz);
    return update_quiz;
  }

  // this controller is used to delete  participant data
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const delete_quiz = await this.quizService.remove(id);
    return delete_quiz;
  }
}
