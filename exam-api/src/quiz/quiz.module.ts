import { Module } from '@nestjs/common'
import { QuizService } from './quiz.service'
import { PrismaService } from 'src/prisma.service'
import { QuizController } from './quiz.controller'
@Module({
	providers: [QuizService, PrismaService],
	controllers: [QuizController],
	exports: [QuizService],
})
export class QuizModule {}
