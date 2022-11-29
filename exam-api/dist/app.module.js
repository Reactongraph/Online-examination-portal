"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const rest_api_module_1 = require("./rest-api/rest-api.module");
const participants_controller_1 = require("./participants/participants.controller");
const participants_service_1 = require("./participants/participants.service");
const participants_module_1 = require("./participants/participants.module");
const level_controller_1 = require("./level/level.controller");
const level_service_1 = require("./level/level.service");
const level_module_1 = require("./level/level.module");
const module_module_1 = require("./module/module.module");
const auth_module_1 = require("./auth/auth.module");
const rest_api_middleware_1 = require("./rest-api/rest-api.middleware");
const participants_middlesware_1 = require("./participants/participants.middlesware");
const questions_controller_1 = require("./questions/questions.controller");
const questions_module_1 = require("./questions/questions.module");
const questions_service_1 = require("./questions/questions.service");
const platform_express_1 = require("@nestjs/platform-express");
const question_options_module_1 = require("./question_options/question_options.module");
const question_options_service_1 = require("./question_options/question_options.service");
const question_options_controller_1 = require("./question_options/question_options.controller");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(rest_api_middleware_1.Oraganization).forRoutes("rest-api");
        consumer.apply(participants_middlesware_1.Participants).forRoutes("participants");
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [rest_api_module_1.RestApiModule, participants_module_1.ParticipantsModule, level_module_1.LevelModule, module_module_1.ModuleModule, auth_module_1.AuthModule, questions_module_1.QuestionsModule, question_options_module_1.QuestionOptionsModule, platform_express_1.MulterModule.register({
                dest: './images'
            })],
        controllers: [app_controller_1.AppController, participants_controller_1.ParticipantsController, level_controller_1.LevelController, questions_controller_1.QuestionsController, questions_controller_1.QuestionsController, question_options_controller_1.QuestionOptionsController],
        providers: [app_service_1.AppService, participants_service_1.ParticipantsService, level_service_1.LevelService, questions_service_1.QuestionsService, question_options_service_1.QuestionOptionsService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map