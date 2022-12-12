import { Injectable } from '@nestjs/common';
import { auth_dto } from './auth.entity';
import { PrismaService } from 'src/prisma.service';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
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
      return user;
    } else {
      return 'invalid credentials';
    }
  }
}
