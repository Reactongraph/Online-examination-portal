"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
let AuthService = class AuthService {
    async changepass(Headers, body) {
        console.log(body.password);
        console.log("decode id", body.decodeid);
        console.log("headers", Headers);
        let token_check = await prisma.reset_token.findMany({ where: { token: `${Headers}` } });
        console.log("token check", token_check);
        if (token_check.length != 0) {
            let email_from_organization = await prisma.Organization.findUnique({ where: { id: `${body.decodeid}` } });
            console.log(email_from_organization === null || email_from_organization === void 0 ? void 0 : email_from_organization.email);
            let dataa = await prisma.user_auth.update({ where: { email: `${email_from_organization === null || email_from_organization === void 0 ? void 0 : email_from_organization.email}` }, data: { password: body.password }, });
            if (!dataa) {
                return 'error';
            }
            const tokendelete = await prisma.reset_token.delete({ where: { user_id: token_check[0].user_id }, });
            return 'password change';
        }
        else {
            console.log("inside else");
            return 'token expired';
        }
    }
    async login(login) {
        prisma.$connect();
        console.log(login);
        const user = await prisma.user_auth.findUnique({ where: { email: login === null || login === void 0 ? void 0 : login.email }, });
        console.log("users", user);
        if (!user) {
            return 'invalid username';
        }
        if ((login === null || login === void 0 ? void 0 : login.email) == user.email && (login === null || login === void 0 ? void 0 : login.password) == user.password) {
            const payload = { username: user.email, sub: user.id };
            return user;
        }
        else {
            return "invalid credentials";
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)()
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map