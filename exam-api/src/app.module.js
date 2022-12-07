"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var organization_module_1 = require("./organization/organization.module");
var participants_module_1 = require("./participants/participants.module");
var level_module_1 = require("./level/level.module");
var module_module_1 = require("./module/module.module");
var auth_module_1 = require("./auth/auth.module");
var organization_middleware_1 = require("./organization/organization.middleware");
var participants_middlesware_1 = require("./participants/participants.middlesware");
// import { Module, } from '@nestjs/common';
var questions_controller_1 = require("./questions/questions.controller");
var questions_module_1 = require("./questions/questions.module");
var questions_service_1 = require("./questions/questions.service");
var platform_express_1 = require("@nestjs/platform-express");
var question_options_module_1 = require("./question_options/question_options.module");
var question_options_service_1 = require("./question_options/question_options.service");
var question_options_controller_1 = require("./question_options/question_options.controller");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule.prototype.configure = function (consumer) {
        consumer.apply(organization_middleware_1.Oraganization).forRoutes('rest-api');
        consumer.apply(participants_middlesware_1.Participants).forRoutes('participants');
    };
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [organization_module_1.RestApiModule, participants_module_1.ParticipantsModule, level_module_1.LevelModule, module_module_1.ModuleModule, auth_module_1.AuthModule, questions_module_1.QuestionsModule, question_options_module_1.QuestionOptionsModule, platform_express_1.MulterModule.register({
                    dest: './images'
                })],
            controllers: [app_controller_1.AppController, questions_controller_1.QuestionsController, questions_controller_1.QuestionsController, question_options_controller_1.QuestionOptionsController],
            providers: [app_service_1.AppService, questions_service_1.QuestionsService, question_options_service_1.QuestionOptionsService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
