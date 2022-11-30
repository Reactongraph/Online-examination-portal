import { Module } from '@nestjs/common'
import { QuestionOptionsController } from './question_options.controller'
import { QuestionOptionsService } from './question_options.service'

@Module({
  controllers: [QuestionOptionsController],
  providers: [QuestionOptionsService]
})
export class QuestionOptionsModule {}
