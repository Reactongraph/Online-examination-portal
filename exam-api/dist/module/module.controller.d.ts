import { module_dto } from './module.entity';
import { ModuleService } from './module.service';
export declare class ModuleController {
    private readonly Modules;
    constructor(Modules: ModuleService);
    create(module: module_dto): Promise<string>;
    findAll(): Promise<string>;
    findOne(id: string): Promise<string>;
    update(id: string, update_module: module_dto): Promise<string | {
        message: string;
    }>;
    remove(id: string): Promise<string>;
}
