import { Controller, Post, Get, Body, Headers, Req, Res, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { auth_dto } from './auth.entity';
import { Response, Request } from 'express';
// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();
const { PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient();
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private jwtService: JwtService) {

    }
    // this controller is used to change password using rest link
    @Post('change-password')
    async create(@Headers('xaccesstoken') Headers: auth_dto, @Body() body: auth_dto) {
        console.log(Headers);
        console.log(body);
        const change_password = await this.authService.changepass(Headers, body)


        return change_password
    }
    // this controller is used to Login user by email id and password with token 
    @Post('login')
    async login(@Body() login: auth_dto, @Res({ passthrough: true }) response: Response) {
        console.log(login);
        prisma.$connect();
        const users = await this.authService.login(login)
        console.log("in controller", users);

        if (users === 'invalid credentials' || users === 'invalid username') {

            response.status(HttpStatus.BAD_REQUEST)
                .send('Login failed')
        }
        else {
            const jwt = await this.jwtService.signAsync({ id: users.id })
            console.log("jwt", jwt,login?.email);
            const login_data = await prisma.Login.create(
              {
                data: {
                  token:jwt,
                  email:login?.email
                }
              }
            )
              console.log(login_data);
            response.cookie('jwt', jwt, { httpOnly: true });
            response.send('login success ' + 'token: ' + JSON.stringify(jwt))
                .status(HttpStatus.ACCEPTED)


        }
    }


}
