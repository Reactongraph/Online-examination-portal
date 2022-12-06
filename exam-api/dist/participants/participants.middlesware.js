"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Participants = void 0;
const common_1 = require("@nestjs/common");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
let Participants = class Participants {
    async use(req, res, next) {
        prisma.$connect();
        const user = await prisma.user_auth.findUnique({
            where: {
                id: req.headers.id,
            },
        });
        const Login_token = await prisma.Login.findMany({
            where: {
                email: user.email
            }
        });
        if (Login_token.length === 0) {
            res.end('invalid token');
        }
        else {
            next();
        }
    }
};
Participants = __decorate([
    (0, common_1.Injectable)()
], Participants);
exports.Participants = Participants;
//# sourceMappingURL=participants.middlesware.js.map