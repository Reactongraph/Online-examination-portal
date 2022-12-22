import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { PrismaService } from 'src/prisma.service';
import { ServerResponse, IncomingMessage } from 'http';
@Injectable()
export class Quiz implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) { }
  async use(req: IncomingMessage, res: ServerResponse, next: NextFunction) {
    const bearerHeader = req.headers.authorization;
    console.log("token in quiz middleware", bearerHeader);



    if (!bearerHeader) {
      console.log("inside if");

      res.writeHead(401)
      res.end('UNAUTHORIZED');
    }
    else {
      const Login_token = await this.prisma.login.findUnique({
        where: {
          token: `${bearerHeader}`
        }
      })
      console.log("login", Login_token);
      next()

      // if (!Login_token) {
      //   res.writeHead(401,)
      //   res.end('UNAUTHORIZED');
      // } else {
      //   next()
      // }
    }
  }
}