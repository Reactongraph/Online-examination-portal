import { QuestionDTO } from './questions.entity';
export declare class QuestionsService {
    create(createQuestionDto: QuestionDTO, path: string): Promise<string>;
    findAll(): Promise<string>;
    findOne(id: string): Promise<any>;
    update(id: string, updateRestApiDto: QuestionDTO): Promise<string>;
    remove(id: string): Promise<string>;
}
