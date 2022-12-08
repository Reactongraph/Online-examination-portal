import { Module } from '@nestjs/common'
import { QuizService } from './quiz.service'
import { PrismaService } from 'src/prisma.service'
@Module({
  providers: [QuizService,PrismaService]
})
export class QuizModule {}
