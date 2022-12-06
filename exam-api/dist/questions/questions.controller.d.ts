/// <reference types="multer" />
import { QuestionsService } from './questions.service';
import { QuestionDTO } from './questions.entity';
import { Observable } from 'rxjs';
export declare class QuestionsController {
    private readonly questionservice;
    constructor(questionservice: QuestionsService);
    postAdd(profile: Express.Multer.File, createquestion: QuestionDTO): object;
    findProfileImage(imagename: any, res: any): Observable<object>;
    findAll(): Promise<string>;
    findOne(id: string): Promise<any>;
    update(id: string, updateparticipants: QuestionDTO): Promise<string>;
    remove(id: string): Promise<string>;
}
