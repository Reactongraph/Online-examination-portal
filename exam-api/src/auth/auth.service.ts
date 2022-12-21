import { Injectable } from '@nestjs/common';
import { auth_dto } from './auth.entity';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
// import { ConfigService } from '@nestjs/config';
import { jwtConstants } from './constant';
const { PrismaClient } = require('@prisma/client')
// const prisma= require('prisma')
const prisma = new PrismaClient()
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private prisma: PrismaService,
  ) { }
  async changepass(Headers: auth_dto, body: auth_dto) {
    const token_check = await this.prisma.reset_token.findMany({
      where: { token: `${Headers}` },
    });

    if (token_check.length != 0) {
      const email_from_organization = await this.prisma.organization.findUnique(
        {
          where: { id: `${body.decodeid}` },
        },
      );

      const dataa = await this.prisma.user_auth.update({
        where: { email: `${email_from_organization?.email}` },
        data: { password: body.password },
      });
      if (!dataa) {
        return 'error';
      }

      await this.prisma.reset_token.delete({
        where: { user_id: token_check[0].user_id },
      });
      return 'password change';
    } else {
      return 'token expired';
    }
  }

  async login(login: auth_dto) {
    const user = await this.prisma.user_auth.findUnique({
      where: { email: login?.email },
    });

    if (!user) {
      return 'invalid username';
    }
    if (login?.email == user.email && login?.password == user.password) {
      const payload = {
        id: user.id,
        username: user.name,
        email: user.email,
      }
      return payload;
    } else {
      return 'invalid credentials';
    }
  }
  async create_token(userdata: any) {
    console.log("data", userdata);

    const access_token = await this.jwtService.signAsync({ id: userdata.id, username: userdata.name, email: userdata.email }, { secret: jwtConstants.access_tokensecret });
    const refresh_token = await this.jwtService.signAsync({ id: userdata.id, username: userdata.name, email: userdata.email }, { secret: jwtConstants.refresh_tokensecret });
    return { access_token: access_token, refresh_token: refresh_token }

  }

  async decode_Token(tokenn: any) {

    const decode: any = this.jwtService.decode(tokenn)
    console.log("decode in service", decode);
    const find_username = await this.prisma.user_auth.findUnique({ where: { email: decode.email } })
    const payload = { username:find_username.name, email: decode.email }
    console.log("payload",payload);
    
    const new_token = await this.create_token(decode)
    prisma.$connect();
    const finddata = await this.prisma.login.findUnique({
      where: {
        refresh_token: tokenn,
      },
    })

    await prisma.login.create({
      data: {
        token: new_token.access_token,
        refresh_token: new_token.refresh_token,
        email: decode.email,
        token_id: decode.id
      },
    });
    return { "token": new_token, "payload": payload }

  }
}
