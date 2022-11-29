import { Injectable } from '@nestjs/common';
import { participants_dto } from './participants.entity';
import * as bcrypt from 'bcrypt'
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const nodemailer = require('nodemailer');
@Injectable()
export class ParticipantsService {
    async create(params: participants_dto) {
        prisma.$connect();
        console.log("in service ", params?.name)
        const name = params?.name;
        const email = params?.email;
        const saltOrRounds = 10;
        const password = params?.password;
        const hash = await bcrypt.hash(password, saltOrRounds);
        console.log("hash", hash);

        const mobile = params?.mobile;
        const email_check = await prisma.Participants.findUnique({ where: { email: email }, });
        if (email_check) {
            return 'user already exist!'
        }
        else {
            const user = await prisma.Participants.create(
                {
                    data: {
                        name: params?.name,
                        email: params?.email,
                        password: hash,
                        mobile: params?.mobile,
                        Organization_id: params?.id
                    }
                }
            )
            return user

        }

    }
    async reset_link(email: string, password: string) {
        // console.log("id=", id);

        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            secure: false,
            auth: {
                user: 'glalwani177@gmail.com',
                pass: 'qbzgsqdaavnfkfxm'
            }
        })
        // console.log(token);
        // console.log("userid", id);
        let mailOptions = {
            from: "glalwani177@gmail.com",
            to: `${email}`,
            subject: "Participant Credentials",
            html: `<p>Welcome To Examination portal  </p> <p>Use this credentials below to login :</p> email=${email} password=${password}. <p>Thank You</p>
        <p>Customer Support</p>`
        }

        mailTransporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                return 'mail send '
            }
        });


    }

    async findAll() {
        prisma.$connect();
        const users = await prisma.Participants.findMany()
        console.log(users);

        return `${JSON.stringify(users)}`;
    }
    async findOne(id: string) {
        console.log(id);

        const user = await prisma.Participants.findUnique({
            where: {
                id: id,
            },
        })
        console.log(user);
        if (!user) {
            return `user not found with this  ${id}`
        }

        return `${JSON.stringify(user)} `;
    }
    async update(id: string, updateRestApiDto: participants_dto) {
        const updateUser = await prisma.Participants.update({
            where: {
                id: id,
            },
            data: updateRestApiDto
        })
        if (!updateUser) {
            return `user not found for this ${id}`
        }
        return `${id} `;
    }

    async remove(id: string) {
        const delete_user = await prisma.Participants.delete({
            where: {
                id: id
            },
        })
        return `This action removes a #${id} restApi`;
    }
}
