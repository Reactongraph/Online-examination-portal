import { Injectable,NestMiddleware,HttpStatus } from "@nestjs/common";
import { NextFunction,Request,Response } from "express";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
@Injectable()
export class Oraganization implements NestMiddleware {
   async  use(req: Request, res: Response, next: NextFunction) {
        console.log("Request Received");
        prisma.$connect();
        const user = await prisma.user_auth.findUnique({
            where: {
              id: req.headers.id,
            },
          })
          
          
        const Login_token= await prisma.Login.findMany(
            {
                where: {
                    email:user.email
                }
            }
        )
        console.log(Login_token);
        if (Login_token.length === 0)
        {

            res.end('invalid token');
        }
        else {
        
        next();
    }
    }
}