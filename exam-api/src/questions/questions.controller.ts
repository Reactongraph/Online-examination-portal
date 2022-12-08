import {
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  Body,
  StreamableFile,
  Param,
  Res,
  Patch,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { profile } from 'console';
import { QuestionsService } from './questions.service';
import { QuestionDTO } from './questions.entity';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Observable, of } from 'rxjs';
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionservice: QuestionsService) {}
  @Post('file-upload')
  @UseInterceptors(FileInterceptor('profile'))
  postAdd(
    @UploadedFile() profile: Express.Multer.File,
    @Body() createquestion: QuestionDTO,
  ): object {
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 1000 }),
        new FileTypeValidator({ fileType: 'jpeg' }),
      ],
    });

    const create_question = this.questionservice.create(
      createquestion,
      profile.path,
    );

    return {
      message: 'question created ',
    };
  }

  @Get('image/:imagename')
  findProfileImage(
    @Param('imagename') imagename,
    @Res() res,
  ): Observable<object> {
    return of(res.sendFile(join(process.cwd(), 'images/' + imagename)));
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
