import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
// import { AccessTokenStrategy } from './strategies/accessToken.strategy';
// import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  // imports: [JwtModule.register({
  // })],
  providers: [AuthService, PrismaService],
  controllers: [AuthController],
})
export class AuthModule { }
