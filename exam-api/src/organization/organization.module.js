"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RestApiModule = void 0;
var common_1 = require("@nestjs/common");
var organization_service_1 = require("./organization.service");
var organization_controller_1 = require("./organization.controller");
var jwt_1 = require("@nestjs/jwt");
var prisma_service_1 = require("../prisma.service");
var RestApiModule = /** @class */ (function () {
    function RestApiModule() {
    }
    RestApiModule = __decorate([
        (0, common_1.Module)({
            imports: [jwt_1.JwtModule.register({
                    secret: 'secret',
                    signOptions: { expiresIn: '1d' }
                })],
            controllers: [organization_controller_1.RestApiController],
            providers: [organization_service_1.RestApiService, prisma_service_1.PrismaService]
        })
    ], RestApiModule);
    return RestApiModule;
}());
exports.RestApiModule = RestApiModule;
