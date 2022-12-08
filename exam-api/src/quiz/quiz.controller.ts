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
import { QuizService } from './quiz.service';
import { QuizDTO } from './quiz.entity';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Observable, of } from 'rxjs';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}
  @Post('file-upload')
  @UseInterceptors(FileInterceptor('profile'))
  postAdd(
    @UploadedFile() profile: Express.Multer.File,
    @Body() createquiz: QuizDTO,
  ): object {
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 1000 }),
        new FileTypeValidator({ fileType: 'jpeg' }),
      ],
    });

    const quiz = this.quizService.create(
      createquiz,
      profile.path,
    );

    return quiz;
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
    const quizzes = await this.quizService.findAll();
    return quizzes;
  }

  @Get('find/:id')
  async findOne(@Param('id') id: string) {
    const find_one = await this.quizService.findOne(id);

    return find_one;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatequiz: QuizDTO,
  ) {
    const update_quiz = await this.quizService.update(
      id,
      updatequiz,
    );
    return update_quiz;
  }

  // this controller is used to delete  participant data
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const delete_quiz = await this.quizService.remove(id);
    return delete_quiz;
  }
}
