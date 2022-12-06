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
import { QuestionOptionsModule } from './question_options/question_options.module';
import { QuestionOptionsService } from './question_options/question_options.service';
import { QuestionOptionsController } from './question_options/question_options.controller';

@Module({
  imports: [
    RestApiModule,
    ParticipantsModule,
    LevelModule,
    ModuleModule,
    AuthModule,
    QuestionsModule,
    QuestionOptionsModule,
    MulterModule.register({
      dest: './images',
    }),
  ],
  controllers: [
    AppController,
    QuestionsController,
    QuestionsController,
    QuestionOptionsController,
  ],
  providers: [AppService, QuestionsService, QuestionOptionsService],
})
export class AppModule  {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(Oraganization).forRoutes('rest-api');
  //   consumer.apply(Participants).forRoutes('participants');
  // }
}
