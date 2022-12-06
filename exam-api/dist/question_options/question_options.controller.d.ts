/// <reference types="multer" />
import { QuestionOptionsService } from './question_options.service';
import { question_dto } from './question_options.entity';
export declare class QuestionOptionsController {
    private readonly questionoption;
    constructor(questionoption: QuestionOptionsService);
    postAdd(profile: Express.Multer.File, createquestion: question_dto): object;
    findAll(): Promise<string>;
    findOne(id: string): Promise<any>;
    update(id: string, updateparticipants: question_dto): Promise<string>;
    remove(id: string): Promise<string>;
}
