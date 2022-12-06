import { Module } from '@nestjs/common'
import { QuestionsService } from './questions.service'
import { PrismaService } from 'src/prisma.service'
@Module({
  providers: [QuestionsService,PrismaService]
})
export class QuestionsModule {}
