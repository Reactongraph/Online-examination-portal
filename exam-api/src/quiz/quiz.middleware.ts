import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { PrismaService } from 'src/prisma.service';
import { ServerResponse, IncomingMessage } from 'http';
@Injectable()
export class Quiz implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) {}
  async use(req: IncomingMessage, res: ServerResponse, next: NextFunction) {
    const bearerHeader = req.headers.authorization;

    if (!bearerHeader) {
      res.writeHead(401);
      res.end('UNAUTHORIZED');
    } else {
      await this.prisma.login.findUnique({
        where: {
          token: `${bearerHeader}`,
        },
      });
      next();

      // if (!Login_token) {
      //   res.writeHead(401,)
      //   res.end('UNAUTHORIZED');
      // } else {
      //   next()
      // }
    }
  }
}
