import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { RestApiModule } from './organization/organization.module'
import { ParticipantsModule } from './participants/participants.module'
import { LevelModule } from './level/level.module'
import { ModuleModule } from './module/module.module'
import { AuthModule } from './auth/auth.module'
import { Oraganization } from './organization/organization.middleware'
import { Participants } from './participants/participants.middlesware'
import { Modules } from './module/module.middleware'
import { Levels } from './level/level.middleware'
import { Questions } from './questions/questions.middleware'
import { Quiz } from './quiz/quiz.middleware'
import { QuestionsController } from './questions/questions.controller'
import { QuestionsModule } from './questions/questions.module'
import { QuestionsService } from './questions/questions.service'
import { MulterModule } from '@nestjs/platform-express'
import { PrismaService } from './prisma.service'
import { QuizModule } from './quiz/quiz.module'
import { QuizController } from './quiz/quiz.controller'
import { QuizService } from './quiz/quiz.service'

@Module({
	imports: [
		RestApiModule,
		ParticipantsModule,
		LevelModule,
		ModuleModule,
		AuthModule,
		QuizModule,
		QuestionsModule,
		MulterModule.register({
			dest: './images',
		}),
	],
	controllers: [AppController, QuestionsController],
	providers: [AppService, QuestionsService, PrismaService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		// consumer.apply(Oraganization).forRoutes('organization')
		consumer.apply(Participants).forRoutes('participants')
		consumer.apply(Modules).forRoutes('module')
		consumer.apply(Levels).forRoutes('level')
		consumer.apply(Questions).forRoutes('questions')
		consumer.apply(Quiz).forRoutes('quiz')
	}
}
