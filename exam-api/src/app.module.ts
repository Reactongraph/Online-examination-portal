import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { RestApiModule } from './organization/organization.module'
import { ParticipantsModule } from './participants/participants.module'
import { LevelModule } from './level/level.module'
import { ModuleModule } from './module/module.module'
import { AuthModule } from './auth/auth.module'
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
      dest: './images'
    })
  ],
  controllers: [AppController, QuestionsController, QuizController],
  providers: [AppService, QuestionsService, PrismaService, QuizService]
})
export class AppModule implements NestModule {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  configure (consumer: MiddlewareConsumer) {
    // consumer.apply(Oraganization).forRoutes('organization')
    // consumer.apply(Participants).forRoutes('participants')
    // consumer.apply(Modules).forRoutes('module')
    // consumer.apply(Levels).forRoutes('level')
    // consumer.apply(Questions).forRoutes('questions')
    // consumer.apply(Quiz).forRoutes('quiz')
  }
}
