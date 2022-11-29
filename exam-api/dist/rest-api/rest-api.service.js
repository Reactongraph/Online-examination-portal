"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestApiService = void 0;
const common_1 = require("@nestjs/common");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const nodemailer = require('nodemailer');
let RestApiService = class RestApiService {
    async create(createRestApiDto) {
        prisma.$connect();
        console.log(createRestApiDto);
        const email_check = await prisma.Organization.findUnique({ where: { email: createRestApiDto === null || createRestApiDto === void 0 ? void 0 : createRestApiDto.email }, });
        if (email_check) {
            return 'user already exist!';
        }
        else {
            const user = await prisma.Organization.create({
                data: {
                    email: createRestApiDto === null || createRestApiDto === void 0 ? void 0 : createRestApiDto.email,
                    name: createRestApiDto === null || createRestApiDto === void 0 ? void 0 : createRestApiDto.name,
                    quota: createRestApiDto === null || createRestApiDto === void 0 ? void 0 : createRestApiDto.quota,
                    status: createRestApiDto === null || createRestApiDto === void 0 ? void 0 : createRestApiDto.status,
                    mobile: createRestApiDto === null || createRestApiDto === void 0 ? void 0 : createRestApiDto.mobile,
                    address: createRestApiDto === null || createRestApiDto === void 0 ? void 0 : createRestApiDto.address,
                    city: createRestApiDto === null || createRestApiDto === void 0 ? void 0 : createRestApiDto.city,
                    state: createRestApiDto === null || createRestApiDto === void 0 ? void 0 : createRestApiDto.state,
                    pincode: createRestApiDto.pincode
                }
            });
            const userauth = await prisma.user_auth.create({
                data: {
                    name: createRestApiDto === null || createRestApiDto === void 0 ? void 0 : createRestApiDto.name,
                    email: createRestApiDto === null || createRestApiDto === void 0 ? void 0 : createRestApiDto.email,
                    password: createRestApiDto === null || createRestApiDto === void 0 ? void 0 : createRestApiDto.password
                }
            });
            return user;
        }
    }
    async reset_link(token, id, email) {
        console.log("id=", id);
        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            secure: false,
            auth: {
                user: 'glalwani177@gmail.com',
                pass: 'qbzgsqdaavnfkfxm'
            }
        });
        console.log(token);
        console.log("userid", id);
        const clientURL = 'http://localhost:3000/';
        const link = `${clientURL}/passwordReset?token=${token}&id=${id}`;
        console.log(link);
        let mailOptions = {
            from: "glalwani177@gmail.com",
            to: `${email}`,
            subject: "Password Reset",
            html: `<p>We have received your request to reset the password </p> <p>Use the link below to update your password:</p> <a href=' ${link}'> <button style="background:blue; color: white; font-size: 16px;">Click Here!</button></a>. <p>This link will expire in 24 hours.</p>
        <p>Thank You</p>
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
        const users = await prisma.Organization.findMany();
        return `${JSON.stringify(users)}`;
    }
    async findOne(id) {
        console.log(id);
        const user = await prisma.Organization.findUnique({
            where: {
                id: id,
            },
        });
        console.log(user);
        if (!user) {
            return `user not found with this  ${id}`;
        }
        return `${JSON.stringify(user)}`;
    }
    async update(id, updateRestApiDto) {
        const updateUser = await prisma.Organization.update({
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
        const delete_user = await prisma.Organization.delete({
            where: {
                id: id
            },
        });
        return `${id} `;
    }
};
RestApiService = __decorate([
    (0, common_1.Injectable)()
], RestApiService);
exports.RestApiService = RestApiService;
//# sourceMappingURL=rest-api.service.js.map