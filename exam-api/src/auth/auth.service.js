"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var PrismaClient = require('@prisma/client').PrismaClient;
var prisma = new PrismaClient();
var AuthService = /** @class */ (function () {
    function AuthService() {
    }
    AuthService.prototype.changepass = function (Headers, body) {
        return __awaiter(this, void 0, void 0, function () {
            var token_check, email_from_organization, dataa, tokendelete;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(body.password);
                        console.log('decode id', body.decodeid);
                        console.log('headers', Headers);
                        return [4 /*yield*/, prisma.reset_token.findMany({ where: { token: "".concat(Headers) } })];
                    case 1:
                        token_check = _a.sent();
                        console.log('token check', token_check);
                        if (!(token_check.length != 0)) return [3 /*break*/, 5];
                        return [4 /*yield*/, prisma.Organization.findUnique({ where: { id: "".concat(body.decodeid) } })];
                    case 2:
                        email_from_organization = _a.sent();
                        console.log(email_from_organization === null || email_from_organization === void 0 ? void 0 : email_from_organization.email);
                        return [4 /*yield*/, prisma.user_auth.update({ where: { email: "".concat(email_from_organization === null || email_from_organization === void 0 ? void 0 : email_from_organization.email) }, data: { password: body.password } })];
                    case 3:
                        dataa = _a.sent();
                        if (!dataa) {
                            return [2 /*return*/, 'error'];
                        }
                        return [4 /*yield*/, prisma.reset_token["delete"]({ where: { user_id: token_check[0].user_id } })];
                    case 4:
                        tokendelete = _a.sent();
                        return [2 /*return*/, 'password change'];
                    case 5:
                        console.log('inside else');
                        return [2 /*return*/, 'token expired'];
                }
            });
        });
    };
    AuthService.prototype.login = function (login) {
        return __awaiter(this, void 0, void 0, function () {
            var user, payload;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prisma.$connect();
                        console.log(login);
                        return [4 /*yield*/, prisma.user_auth.findUnique({ where: { email: login === null || login === void 0 ? void 0 : login.email } })];
                    case 1:
                        user = _a.sent();
                        console.log('users', user);
                        if (!user) {
                            return [2 /*return*/, 'invalid username'];
                        }
                        if ((login === null || login === void 0 ? void 0 : login.email) == user.email && (login === null || login === void 0 ? void 0 : login.password) == user.password) {
                            payload = { username: user.email, sub: user.id };
                            return [2 /*return*/, user];
                        }
                        else {
                            return [2 /*return*/, 'invalid credentials'];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthService = __decorate([
        (0, common_1.Injectable)()
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
