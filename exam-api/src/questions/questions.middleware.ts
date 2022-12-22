import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { PrismaService } from 'src/prisma.service';
import { ServerResponse, IncomingMessage } from 'http';
@Injectable()
export class Questions implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) { }
  async use(req: IncomingMessage, res: ServerResponse, next: NextFunction) {
    console.log(req.headers);
    
    const bearerHeader = req.headers.authorization;
    console.log("token in question middleware", bearerHeader);



    if (!bearerHeader) {
      // console.log("inside if");

      res.writeHead(401)
      res.end('UNAUTHORIZED');
    }
    
    else {
      const Login_token = await this.prisma.login.findMany({
        where: {
          token: `${bearerHeader}`
        }
      })
      // if (Login_token.length === 0) {
      //   res.writeHead(401,)
      //   res.end('UNAUTHORIZED');
      // } else {
        next()
      // }
    }
  }
}