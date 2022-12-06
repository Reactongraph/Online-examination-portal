import { question_dto } from './question_options.entity';
export declare class QuestionOptionsService {
    create(options_dto: question_dto, path: string): Promise<string>;
    findAll(): Promise<string>;
    findOne(id: string): Promise<any>;
    update(id: string, updateRestApiDto: question_dto): Promise<string>;
    remove(id: string): Promise<string>;
}
