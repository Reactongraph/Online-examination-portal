import { level_dto } from './level.entity';
export declare class LevelService {
    create(params: level_dto): Promise<string>;
    findAll(): Promise<string>;
    findOne(id: string): Promise<string>;
    update(id: string, updateRestApiDto: level_dto): Promise<string>;
    remove(id: string): Promise<string>;
}
