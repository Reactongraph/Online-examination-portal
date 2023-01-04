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
exports.ParticipantsService = void 0;
var common_1 = require("@nestjs/common");
var bcrypt = require("bcrypt");
var nodemailer = require('nodemailer');
var ParticipantsService = /** @class */ (function () {
    function ParticipantsService(prisma) {
        this.prisma = prisma;
    }
    ParticipantsService.prototype.create = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var name, email, saltOrRounds, password, hash, mobile, email_check, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('in service ', params === null || params === void 0 ? void 0 : params.name);
                        name = params === null || params === void 0 ? void 0 : params.name;
                        email = params === null || params === void 0 ? void 0 : params.email;
                        saltOrRounds = 10;
                        password = params === null || params === void 0 ? void 0 : params.password;
                        return [4 /*yield*/, bcrypt.hash(password, saltOrRounds)];
                    case 1:
                        hash = _a.sent();
                        console.log('hash', hash);
                        mobile = params === null || params === void 0 ? void 0 : params.mobile;
                        return [4 /*yield*/, this.prisma.participants.findUnique({ where: { email: email } })];
                    case 2:
                        email_check = _a.sent();
                        if (!email_check) return [3 /*break*/, 3];
                        return [2 /*return*/, {
                                message: 'user already exist',
                                password: null,
                                email: null
                            }];
                    case 3: return [4 /*yield*/, this.prisma.participants.create({
                            data: {
                                name: params === null || params === void 0 ? void 0 : params.name,
                                email: params === null || params === void 0 ? void 0 : params.email,
                                password: hash,
                                mobile: params === null || params === void 0 ? void 0 : params.mobile,
                                Organization_id: params === null || params === void 0 ? void 0 : params.id
                            }
                        })];
                    case 4:
                        user = _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    ParticipantsService.prototype.reset_link = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var mailTransporter, mailOptions;
            return __generator(this, function (_a) {
                mailTransporter = nodemailer.createTransport({
                    service: 'gmail',
                    host: 'smtp.gmail.com',
                    secure: false,
                    auth: {
                        user: 'glalwani177@gmail.com',
                        pass: 'qbzgsqdaavnfkfxm'
                    }
                });
                mailOptions = {
                    from: 'glalwani177@gmail.com',
                    to: "".concat(email),
                    subject: 'Participant Credentials',
                    html: "<p>Welcome To Examination portal  </p> <p>Use this credentials below to login :</p> email=".concat(email, " password=").concat(password, ". <p>Thank You</p>\n        <p>Customer Support</p>")
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
                return [2 /*return*/];
            });
        });
    };
    ParticipantsService.prototype.findAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.participants.findMany()];
                    case 1:
                        users = _a.sent();
                        console.log(users);
                        return [2 /*return*/, "".concat(JSON.stringify(users))];
                }
            });
        });
    };
    ParticipantsService.prototype.findOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(id);
                        return [4 /*yield*/, this.prisma.participants.findUnique({
                                where: {
                                    id: id
                                }
                            })];
                    case 1:
                        user = _a.sent();
                        console.log(user);
                        if (!user) {
                            return [2 /*return*/, "user not found with this  ".concat(id)];
                        }
                        return [2 /*return*/, "".concat(JSON.stringify(user), " ")];
                }
            });
        });
    };
    ParticipantsService.prototype.update = function (id, updateRestApiDto) {
        return __awaiter(this, void 0, void 0, function () {
            var updateUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.participants.update({
                            where: {
                                id: id
                            },
                            data: updateRestApiDto
                        })];
                    case 1:
                        updateUser = _a.sent();
                        if (!updateUser) {
                            return [2 /*return*/, "user not found for this ".concat(id)];
                        }
                        return [2 /*return*/, "".concat(id, " ")];
                }
            });
        });
    };
    ParticipantsService.prototype.remove = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var delete_user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.participants["delete"]({
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
    ParticipantsService = __decorate([
        (0, common_1.Injectable)()
    ], ParticipantsService);
    return ParticipantsService;
}());
exports.ParticipantsService = ParticipantsService;
