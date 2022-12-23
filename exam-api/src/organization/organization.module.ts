import { Module } from '@nestjs/common';
import { RestApiService } from './organization.service';
import { RestApiController } from './organization.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [RestApiController],
  providers: [RestApiService, PrismaService],
})
export class RestApiModule {}
