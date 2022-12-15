import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { PrismaService } from 'src/prisma.service';
import { ServerResponse, IncomingMessage } from 'http';
@Injectable()
export class Oraganization implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) { }
  async use(req: IncomingMessage, res: ServerResponse, next: NextFunction) {
    const bearerHeader = req.headers.authorization;
    const accessToken = bearerHeader && bearerHeader.split(' ')[1];

    if (!accessToken) {

      res.writeHead(401)
      res.end('UNAUTHORIZED');
    }
    else {
      const Login_token = await this.prisma.login.findMany({
        where: {
          token: `${accessToken}`
        }
      })
      if (Login_token.length === 0) {
        res.writeHead(401,)
        res.end('UNAUTHORIZED');
      } else {
        next()
      }
    }
  }
}