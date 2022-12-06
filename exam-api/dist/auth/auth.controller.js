"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const auth_service_1 = require("./auth.service");
const auth_entity_1 = require("./auth.entity");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
let AuthController = class AuthController {
    constructor(authService, jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
    }
    async create(Headers, body) {
        console.log(Headers);
        console.log(body);
        const change_password = await this.authService.changepass(Headers, body);
        return change_password;
    }
    async login(login, response) {
        console.log(login);
        prisma.$connect();
        const users = await this.authService.login(login);
        console.log("in controller", users);
        if (users === 'invalid credentials' || users === 'invalid username') {
            response.status(common_1.HttpStatus.BAD_REQUEST)
                .send('Login failed');
        }
        else {
            const jwt = await this.jwtService.signAsync({ id: users.id });
            console.log("jwt", jwt, login === null || login === void 0 ? void 0 : login.email);
            const login_date = await prisma.Login.create({
                data: {
                    token: jwt,
                    email: login === null || login === void 0 ? void 0 : login.email,
                }
            });
            console.log(login_date);
            response.cookie('jwt', jwt, { httpOnly: true });
            response.send('login success ' + 'token: ' + JSON.stringify(jwt))
                .status(common_1.HttpStatus.ACCEPTED);
        }
    }
};
__decorate([
    (0, common_1.Post)('change-password'),
    __param(0, (0, common_1.Headers)('xaccesstoken')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_entity_1.auth_dto, auth_entity_1.auth_dto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_entity_1.auth_dto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService, jwt_1.JwtService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map