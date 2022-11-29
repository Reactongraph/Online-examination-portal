import { module_dto } from './module.entity';
export declare class ModuleService {
    create(params: module_dto): Promise<string>;
    findAll(): Promise<string>;
    findOne(id: string): Promise<string>;
    update(id: string, updateRestApiDto: module_dto): Promise<string>;
    remove(id: string): Promise<string>;
}
