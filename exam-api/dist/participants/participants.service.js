"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipantsService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const nodemailer = require('nodemailer');
let ParticipantsService = class ParticipantsService {
    async create(params) {
        prisma.$connect();
        console.log("in service ", params === null || params === void 0 ? void 0 : params.name);
        const name = params === null || params === void 0 ? void 0 : params.name;
        const email = params === null || params === void 0 ? void 0 : params.email;
        const saltOrRounds = 10;
        const password = params === null || params === void 0 ? void 0 : params.password;
        const hash = await bcrypt.hash(password, saltOrRounds);
        console.log("hash", hash);
        const mobile = params === null || params === void 0 ? void 0 : params.mobile;
        const email_check = await prisma.Participants.findUnique({ where: { email: email }, });
        if (email_check) {
            return 'user already exist!';
        }
        else {
            const user = await prisma.Participants.create({
                data: {
                    name: params === null || params === void 0 ? void 0 : params.name,
                    email: params === null || params === void 0 ? void 0 : params.email,
                    password: hash,
                    mobile: params === null || params === void 0 ? void 0 : params.mobile,
                    Organization_id: params === null || params === void 0 ? void 0 : params.id
                }
            });
            return user;
        }
    }
    async reset_link(email, password) {
        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            secure: false,
            auth: {
                user: 'glalwani177@gmail.com',
                pass: 'qbzgsqdaavnfkfxm'
            }
        });
        let mailOptions = {
            from: "glalwani177@gmail.com",
            to: `${email}`,
            subject: "Participant Credentials",
            html: `<p>Welcome To Examination portal  </p> <p>Use this credentials below to login :</p> email=${email} password=${password}. <p>Thank You</p>
        <p>Customer Support</p>`
        };
        mailTransporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Email sent: ' + info.response);
                return 'mail send ';
            }
        });
    }
    async findAll() {
        prisma.$connect();
        const users = await prisma.Participants.findMany();
        console.log(users);
        return `${JSON.stringify(users)}`;
    }
    async findOne(id) {
        console.log(id);
        const user = await prisma.Participants.findUnique({
            where: {
                id: id,
            },
        });
        console.log(user);
        if (!user) {
            return `user not found with this  ${id}`;
        }
        return `${JSON.stringify(user)} `;
    }
    async update(id, updateRestApiDto) {
        const updateUser = await prisma.Participants.update({
            where: {
                id: id,
            },
            data: updateRestApiDto
        });
        if (!updateUser) {
            return `user not found for this ${id}`;
        }
        return `${id} `;
    }
    async remove(id) {
        const delete_user = await prisma.Participants.delete({
            where: {
                id: id
            },
        });
        return `This action removes a #${id} restApi`;
    }
};
ParticipantsService = __decorate([
    (0, common_1.Injectable)()
], ParticipantsService);
exports.ParticipantsService = ParticipantsService;
//# sourceMappingURL=participants.service.js.map