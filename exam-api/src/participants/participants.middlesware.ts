import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { PrismaService } from 'src/prisma.service';
import { ServerResponse, IncomingMessage } from 'http';
@Injectable()
export class Participants implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) {}
  async use(req: IncomingMessage, res: ServerResponse, next: NextFunction) {
    const bearerHeader = req.headers.authorization;

    if (!bearerHeader) {
      res.writeHead(401);
      res.end('UNAUTHORIZED');
    } else {
      await this.prisma.login.findMany({
        where: {
          token: `${bearerHeader}`,
        },
      });
      next();
    }
  }
}
