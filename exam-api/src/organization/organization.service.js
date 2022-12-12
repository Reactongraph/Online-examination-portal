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
exports.RestApiService = void 0;
var common_1 = require("@nestjs/common");
var nodemailer = require('nodemailer');
var RestApiService = /** @class */ (function () {
    function RestApiService(prisma) {
        this.prisma = prisma;
    }
    RestApiService.prototype.create = function (createRestApiDto) {
        return __awaiter(this, void 0, void 0, function () {
            var email_check, user, userauth;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(createRestApiDto);
                        return [4 /*yield*/, this.prisma.organization.findUnique({ where: { email: createRestApiDto === null || createRestApiDto === void 0 ? void 0 : createRestApiDto.email } })];
                    case 1:
                        email_check = _a.sent();
                        if (!email_check) return [3 /*break*/, 2];
                        return [2 /*return*/, {
                                message: 'user already exist',
                                id: null,
                                email: null
                            }];
                    case 2: return [4 /*yield*/, this.prisma.organization.create({
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
                        })];
                    case 3:
                        user = _a.sent();
                        return [4 /*yield*/, this.prisma.user_auth.create({
                                data: {
                                    name: createRestApiDto === null || createRestApiDto === void 0 ? void 0 : createRestApiDto.name,
                                    email: createRestApiDto === null || createRestApiDto === void 0 ? void 0 : createRestApiDto.email,
                                    password: createRestApiDto === null || createRestApiDto === void 0 ? void 0 : createRestApiDto.password
                                }
                            })];
                    case 4:
                        userauth = _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    RestApiService.prototype.reset_link = function (token, id, email) {
        return __awaiter(this, void 0, void 0, function () {
            var mailTransporter, clientURL, link, mailOptions;
            return __generator(this, function (_a) {
                console.log('id=', id);
                mailTransporter = nodemailer.createTransport({
                    service: 'gmail',
                    host: 'smtp.gmail.com',
                    secure: false,
                    auth: {
                        user: 'glalwani177@gmail.com',
                        pass: 'qbzgsqdaavnfkfxm'
                    }
                });
                console.log(token);
                console.log('userid', id);
                clientURL = 'http://localhost:3000/';
                link = "".concat(clientURL, "/passwordReset?token=").concat(token, "&id=").concat(id);
                console.log(link);
                mailOptions = {
                    from: 'glalwani177@gmail.com',
                    to: "".concat(email),
                    // to:'gauravlalwani',
                    subject: 'Password Reset',
                    html: "<p>We have received your request to reset the password </p> <p>Use the link below to update your password:</p> <a href=' ".concat(link, "'> <button style=\"background:blue; color: white; font-size: 16px;\">Click Here!</button></a>. <p>This link will expire in 24 hours.</p>\n        <p>Thank You</p>\n        <p>Customer Support</p>")
                };
                mailTransporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                        // res.status(409).send(error.message);
                    }
                    else {
                        console.log('Email sent: ' + info.response);
                        // res.status(200).send("Mail sent successfully" );
                        return 'mail send ';
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    RestApiService.prototype.findAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.organization.findMany()];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, "".concat(JSON.stringify(users))];
                }
            });
        });
    };
    RestApiService.prototype.findOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(id);
                        return [4 /*yield*/, this.prisma.organization.findUnique({
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
                        return [2 /*return*/, "".concat(JSON.stringify(user))];
                }
            });
        });
    };
    RestApiService.prototype.update = function (id, updateRestApiDto) {
        return __awaiter(this, void 0, void 0, function () {
            var updateUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.organization.update({
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
    RestApiService.prototype.remove = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var delete_user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.organization["delete"]({
                            where: {
                                id: id
                            }
                        })];
                    case 1:
                        delete_user = _a.sent();
                        return [2 /*return*/, "".concat(id, " ")];
                }
            });
        });
    };
    RestApiService = __decorate([
        (0, common_1.Injectable)()
    ], RestApiService);
    return RestApiService;
}());
exports.RestApiService = RestApiService;
