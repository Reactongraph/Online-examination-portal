import { Injectable } from '@nestjs/common';
import { auth_dto } from './auth.entity';
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
@Injectable()
export class AuthService {
  async changepass(Headers: auth_dto, body: auth_dto) {
    const token_check = await prisma.reset_token.findMany({
      where: { token: `${Headers}` },
    });

    if (token_check.length != 0) {
      const email_from_organization = await prisma.Organization.findUnique({
        where: { id: `${body.decodeid}` },
      });

      const dataa = await prisma.user_auth.update({
        where: { email: `${email_from_organization?.email}` },
        data: { password: body.password },
      });
      if (!dataa) {
        return 'error';
      }

      const tokendelete = await prisma.reset_token.delete({
        where: { user_id: token_check[0].user_id },
      });
      return 'password change';
    } else {
      return 'token expired';
    }
  }

  async login(login: auth_dto) {
    prisma.$connect();

    const user = await prisma.user_auth.findUnique({
      where: { email: login?.email },
    });
    if (!user) {
      return 'invalid username';
    }
    if (login?.email == user.email && login?.password == user.password) {
      const payload = { username: user.email, sub: user.id };

      return user;
    } else {
      return 'invalid credentials';
    }
  }
}
