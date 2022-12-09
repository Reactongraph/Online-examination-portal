import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionDTO } from './questions.entity';
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionservice: QuestionsService) {}
  @Post('create') postAdd(@Body() createquestion: QuestionDTO): object {
    this.questionservice.create(createquestion);

    return {
      message: { message: 'question created ' },
    };
  }

  @Get('find')
  async findAll() {
    const participant_read = await this.questionservice.findAll();
    return participant_read;
  }

  @Get('find/:id')
  async findOne(@Param('id') id: string) {
    const find_one = await this.questionservice.findOne(id);

    return find_one;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateparticipants: QuestionDTO,
  ) {
    const update_participants = await this.questionservice.update(
      id,
      updateparticipants,
    );
    return update_participants;
  }

  // this controller is used to delete  participant data
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const delete_participants = await this.questionservice.remove(id);
    return delete_participants;
  }
}
