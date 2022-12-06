"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestApiModule = void 0;
const common_1 = require("@nestjs/common");
const rest_api_service_1 = require("./rest-api.service");
const rest_api_controller_1 = require("./rest-api.controller");
const jwt_1 = require("@nestjs/jwt");
let RestApiModule = class RestApiModule {
};
RestApiModule = __decorate([
    (0, common_1.Module)({
        imports: [jwt_1.JwtModule.register({
                secret: 'secret',
                signOptions: { expiresIn: '1d' }
            })],
        controllers: [rest_api_controller_1.RestApiController],
        providers: [rest_api_service_1.RestApiService]
    })
], RestApiModule);
exports.RestApiModule = RestApiModule;
//# sourceMappingURL=rest-api.module.js.map