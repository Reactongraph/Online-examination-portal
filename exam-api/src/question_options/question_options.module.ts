import { Module } from '@nestjs/common'
import { QuestionOptionsController } from './question_options.controller'
import { QuestionOptionsService } from './question_options.service'
import { PrismaService } from 'src/prisma.service'
@Module({
  controllers: [QuestionOptionsController],
  providers: [QuestionOptionsService,PrismaService]
})
export class QuestionOptionsModule {}
