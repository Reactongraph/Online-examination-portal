import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestApiModule } from './organization/organization.module';
import { ParticipantsModule } from './participants/participants.module';
import { LevelModule } from './level/level.module';
import { ModuleModule } from './module/module.module';
import { AuthModule } from './auth/auth.module';
import { Oraganization } from './organization/organization.middleware';
import { Participants } from './participants/participants.middlesware';
import { QuestionsController } from './questions/questions.controller';
import { QuestionsModule } from './questions/questions.module';
import { QuestionsService } from './questions/questions.service';
import { MulterModule } from '@nestjs/platform-express';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    RestApiModule,
    ParticipantsModule,
    LevelModule,
    ModuleModule,
    AuthModule,
    QuestionsModule,
    MulterModule.register({
      dest: './images',
    }),
  ],
  controllers: [AppController, QuestionsController],
  providers: [AppService, QuestionsService, PrismaService],
})
export class AppModule  {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(Oraganization).forRoutes('rest-api');
  //   consumer.apply(Participants).forRoutes('participants');
  // }
}
