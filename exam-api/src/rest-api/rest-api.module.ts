import { Module } from '@nestjs/common';
import { RestApiService } from './rest-api.service';
import { RestApiController } from './rest-api.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({
    secret: 'secret',
    signOptions: { expiresIn: '1d' }
  })],
  controllers: [RestApiController],
  providers: [RestApiService]
})
export class RestApiModule { }
