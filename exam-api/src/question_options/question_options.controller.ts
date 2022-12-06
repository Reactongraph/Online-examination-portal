import { Controller, UploadedFile, UseInterceptors, Body, Post, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, Get, Patch, Delete, Param } from '@nestjs/common'
import { QuestionOptionsService } from './question_options.service'
import { question_dto } from './question_options.entity'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('question-options')
export class QuestionOptionsController {
  constructor (private readonly questionoption: QuestionOptionsService) { }
  @Post('image')
  @UseInterceptors(FileInterceptor('profile'))
  postAdd (@UploadedFile() profile: Express.Multer.File, @Body() createquestion: question_dto): object {
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 1000 }),
        new FileTypeValidator({ fileType: 'jpeg' })
      ]
    }),
    console.log('create', createquestion)

    const create_question = this.questionoption.create(createquestion, profile.path)

    return {
      message: 'question option created '
    }
  }

  @Get('find')
  async findAll () {
    const participant_read = await this.questionoption.findAll()
    return participant_read
  }

  @Get('find/:id')
  async findOne (@Param('id') id: string) {
    const find_one = await this.questionoption.findOne(id)

    return find_one
  }

  @Patch(':id')
  async update (@Param('id') id: string, @Body() updateparticipants: question_dto) {
    const update_participants = await this.questionoption.update(id, updateparticipants)
    return update_participants
  }

  // this controller is used to delete  participant data
  @Delete(':id')
  async remove (@Param('id') id: string) {
    const delete_participants = await this.questionoption.remove(id)
    return delete_participants
  }
}
