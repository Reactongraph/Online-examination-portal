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
exports.RestApiController = void 0;
const common_1 = require("@nestjs/common");
const rest_api_service_1 = require("./rest-api.service");
const post_1 = require("./post");
const jwt_1 = require("@nestjs/jwt");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
let RestApiController = class RestApiController {
    constructor(restApiService, jwtService) {
        this.restApiService = restApiService;
        this.jwtService = jwtService;
    }
    async create(createRestApiDto) {
        const user = await this.restApiService.create(createRestApiDto);
        const jwt = await this.jwtService.signAsync({ id: user.id });
        const create = await prisma.reset_token.create({
            data: {
                token: jwt,
            },
        });
        const reset_link = await this.restApiService.reset_link(jwt, user.id, user.email);
        return {
            message: 'mail send sucessfully!',
        };
    }
    findAll(Headers) {
        return this.restApiService.findAll();
    }
    async findOne(id) {
        return await this.restApiService.findOne(id);
    }
    async update(id, updateRestApiDto) {
        return await this.restApiService.update(id, updateRestApiDto);
    }
    remove(id) {
        return this.restApiService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_1.PostDTO]),
    __metadata("design:returntype", Promise)
], RestApiController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('find'),
    __param(0, (0, common_1.Headers)('xaccesstoken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RestApiController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RestApiController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, post_1.PostDTO]),
    __metadata("design:returntype", Promise)
], RestApiController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RestApiController.prototype, "remove", null);
RestApiController = __decorate([
    (0, common_1.Controller)('rest-api'),
    __metadata("design:paramtypes", [rest_api_service_1.RestApiService,
        jwt_1.JwtService])
], RestApiController);
exports.RestApiController = RestApiController;
//# sourceMappingURL=rest-api.controller.js.map