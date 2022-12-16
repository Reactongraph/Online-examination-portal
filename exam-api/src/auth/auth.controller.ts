import {
  Controller,
  Post,
  Body,
  Headers,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { auth_dto } from './auth.entity';
import { Response } from 'express';
import { PrismaService } from 'src/prisma.service';
import { ApiTags } from '@nestjs/swagger';
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  // this controller is used to change password using rest link
  @Post('change-password')
  async create(
    @Headers('xaccesstoken') Headers: auth_dto,
    @Body() body: auth_dto,
  ) {
    const change_password = await this.authService.changepass(Headers, body);

    return change_password;
  }

  // this controller is used to Login user by email id and password with token
  @Post('login')
  async login(
    @Body() login: auth_dto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const users = await this.authService.login(login);

    if (users === 'invalid credentials' || users === 'invalid username') {
      response.status(HttpStatus.BAD_REQUEST).send('Login failed');
    } else {
      const jwt = await this.jwtService.signAsync({ id: users.id });
      await this.prisma.login.create({
        data: {
          token: jwt,
          email: login?.email,
        },
      });

      response.cookie('jwt', jwt, { httpOnly: true });
      response
        .send( JSON.stringify(jwt))
        .status(HttpStatus.ACCEPTED);
    }
  }
}
