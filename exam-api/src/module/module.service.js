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
exports.ModuleService = void 0;
var common_1 = require("@nestjs/common");
var PrismaClient = require('@prisma/client').PrismaClient;
var prisma = new PrismaClient();
var ModuleService = /** @class */ (function () {
    function ModuleService() {
    }
    ModuleService.prototype.create = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var module, status, toLowerCaseModule, users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prisma.$connect();
                        console.log('in service ', params === null || params === void 0 ? void 0 : params.module);
                        module = params === null || params === void 0 ? void 0 : params.module;
                        status = params === null || params === void 0 ? void 0 : params.status;
                        toLowerCaseModule = params === null || params === void 0 ? void 0 : params.module.toLowerCase();
                        return [4 /*yield*/, prisma.module.create({
                                data: {
                                    module: toLowerCaseModule,
                                    status: status
                                }
                            })];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, 'module inserted'];
                }
            });
        });
    };
    ModuleService.prototype.findAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prisma.$connect();
                        return [4 /*yield*/, prisma.Module.findMany()];
                    case 1:
                        users = _a.sent();
                        console.log(users);
                        return [2 /*return*/, "".concat(JSON.stringify(users))];
                }
            });
        });
    };
    ModuleService.prototype.findOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(id);
                        return [4 /*yield*/, prisma.Module.findUnique({
                                where: {
                                    id: id
                                }
                            })];
                    case 1:
                        user = _a.sent();
                        console.log(user);
                        if (!user) {
                            return [2 /*return*/, "data not found with this  ".concat(id)];
                        }
                        return [2 /*return*/, "".concat(JSON.stringify(user), " ")];
                }
            });
        });
    };
    ModuleService.prototype.update = function (id, updateRestApiDto) {
        return __awaiter(this, void 0, void 0, function () {
            var check_id, updateUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prisma.Module.findUnique({
                            where: {
                                id: id
                            }
                        })];
                    case 1:
                        check_id = _a.sent();
                        console.log('checkid', check_id.module);
                        if ((updateRestApiDto === null || updateRestApiDto === void 0 ? void 0 : updateRestApiDto.module) == check_id.module) {
                            return [2 /*return*/, { message: 'module already exist' }];
                        }
                        if (!(check_id == null)) return [3 /*break*/, 2];
                        return [2 /*return*/, 'invalid id '];
                    case 2: return [4 /*yield*/, prisma.Module.update({
                            where: {
                                id: id
                            },
                            data: updateRestApiDto
                        })];
                    case 3:
                        updateUser = _a.sent();
                        if (!updateUser) {
                            return [2 /*return*/, "user not found for this ".concat(id)];
                        }
                        return [2 /*return*/, "".concat(id, " ")];
                }
            });
        });
    };
    ModuleService.prototype.remove = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var delete_user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prisma.Module["delete"]({
                            where: {
                                id: id
                            }
                        })];
                    case 1:
                        delete_user = _a.sent();
                        return [2 /*return*/, "This action removes a #".concat(id, " restApi")];
                }
            });
        });
    };
    ModuleService = __decorate([
        (0, common_1.Injectable)()
    ], ModuleService);
    return ModuleService;
}());
exports.ModuleService = ModuleService;
