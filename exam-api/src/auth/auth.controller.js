"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.AuthController = void 0;
var common_1 = require("@nestjs/common");
var AuthController = /** @class */ (function () {
    function AuthController(authService, jwtService, prisma) {
        this.authService = authService;
        this.jwtService = jwtService;
        this.prisma = prisma;
    }
    // this controller is used to change password using rest link
    AuthController.prototype.create = function (Headers, body) {
        return __awaiter(this, void 0, void 0, function () {
            var change_password;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:;
                        return [4 /*yield*/, this.authService.changepass(Headers, body)];
                    case 1:
                        change_password = _a.sent();
                        return [2 /*return*/, change_password];
                }
            });
        });
    };
    // this controller is used to Login user by email id and password with token
    AuthController.prototype.login = function (login, response) {
        return __awaiter(this, void 0, void 0, function () {
            var users, jwt, login_date;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return [4 /*yield*/, this.authService.login(login)];
                    case 1:
                        users = _a.sent();
                        if (!(users === 'invalid credentials' || users === 'invalid username')) return [3 /*break*/, 2];
                        response.status(common_1.HttpStatus.BAD_REQUEST)
                            .send('Login failed');
                        return [3 /*break*/, 5];
                    case 2: return [4 /*yield*/, this.jwtService.signAsync({ id: users.id })];
                    case 3:
                        jwt = _a.sent();
                        return [4 /*yield*/, this.prisma.login.create({
                                data: {
                                    token: jwt,
                                    email: login === null || login === void 0 ? void 0 : login.email
                                }
                            })];
                    case 4:
                        login_date = _a.sent();
                        response.cookie('jwt', jwt, { httpOnly: true });
                        response.send('login success ' + 'token: ' + JSON.stringify(jwt))
                            .status(common_1.HttpStatus.ACCEPTED);
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        (0, common_1.Post)('change-password'),
        __param(0, (0, common_1.Headers)('xaccesstoken')),
        __param(1, (0, common_1.Body)())
    ], AuthController.prototype, "create");
    __decorate([
        (0, common_1.Post)('login'),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, common_1.Res)({ passthrough: true }))
    ], AuthController.prototype, "login");
    AuthController = __decorate([
        (0, common_1.Controller)('auth')
    ], AuthController);
    return AuthController;
}());
exports.AuthController = AuthController;
