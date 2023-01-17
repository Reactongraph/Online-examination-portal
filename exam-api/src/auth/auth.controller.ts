import {
  Controller,
  Post,
  Body,
  Headers,
  Res,
  HttpStatus,
  Get,
  Req
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthService } from './auth.service'
import { auth_dto } from './auth.entity'
import { Response } from 'express'
import { PrismaService } from 'src/prisma.service'
import { ApiTags } from '@nestjs/swagger'
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor (
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService
  ) {}

  // this controller is used to change password using rest link
  @Post('change-password')
  async create (
  @Headers('xaccesstoken') Headers: auth_dto,
    @Body() body: auth_dto
  ) {
    const change_password = await this.authService.changepass(Headers, body)

    return change_password
  }

  // this controller is used to Login user by email id and password with token
  @Post('login')
  async login (
  @Body() login: auth_dto,
    @Res({ passthrough: true }) response: Response
  ) {
    const users = await this.authService.login(login)

    if (users === 'invalid credentials' || users === 'invalid username') {
      const data = { error: 'Invalid credentials' }
      response.status(HttpStatus.BAD_REQUEST).send(data)
    } else {
      const token = await this.authService.create_token(users, login?.role)
      const jwt_decode: any = this.jwtService.decode(token.access_token)
      await this.prisma.login.create({
        data: {
          token: token.access_token,
          refresh_token: token.refresh_token,
          email: login?.email,
          token_id: users.id,
          role: login.role
        }
      })

      const data = {
        message: 'Login success',
        payload: users,
        access_token: token.access_token,
        refresh_token: token.refresh_token,
        role: login.role,
        organization_id: jwt_decode.id
      }
      response.cookie('access_token', token.access_token, { httpOnly: true })
      response.cookie('refresh_token', token.refresh_token, {
        httpOnly: false
      })
      response.send(data).status(HttpStatus.ACCEPTED)
    }
  }

  @Get('Refresh_token')
  async refresh_token (
  @Headers('xaccesstoken') Headers: any,
    @Res({ passthrough: true }) response: Response
  ) {
    try {
      const decode = await this.authService.decode_Token(Headers)

      const data = {
        message: 'new token generated',
        payload: decode.payload,
        access_token: decode.token.access_token,
        refresh_token: decode.token.refresh_token,
        role: decode.role,
        organization_id: decode.organization_id
      }

      response.cookie('access_token', decode.token.access_token, {
        httpOnly: true
      })
      response.cookie('refresh_token', decode.token.refresh_token, {
        httpOnly: false
      })
      response.send(data).status(HttpStatus.ACCEPTED)
    } catch (error) {
      response.send('token not provided').status(HttpStatus.BAD_REQUEST)
    }
  }

  @Post('logout')
  async logout (@Req() req, @Res({ passthrough: true }) response: Response) {
    response.clearCookie('access_token')
    response.clearCookie('refresh_token')
    response.send('user logout')
  }
}
