import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestApiModule } from './organization/organization.module';
import { ParticipantsController } from './participants/participants.controller';
import { ParticipantsService } from './participants/participants.service';
import { ParticipantsModule } from './participants/participants.module';
import { LevelController } from './level/level.controller';
import { LevelService } from './level/level.service';
import { LevelModule } from './level/level.module';
import { ModuleModule } from './module/module.module';
import { AuthModule } from './auth/auth.module';
import { Oraganization } from './organization/organization.middleware';
import { Participants } from './participants/participants.middlesware';
// import { Module, } from '@nestjs/common';
import { QuestionsController } from './questions/questions.controller';
import { QuestionsModule } from './questions/questions.module';
import { QuestionsService } from './questions/questions.service';
import { MulterModule } from '@nestjs/platform-express';
import { PrismaService } from './prisma.service';
import { QuizModule } from './quiz/quiz.module';
import { QuizController } from './quiz/quiz.controller';
import { QuizService } from './quiz/quiz.service';

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
  controllers: [
    AppController,
    QuestionsController,
    QuizController
  ],
  providers: [AppService, QuestionsService,PrismaService, QuizService],
})
export class AppModule {}
