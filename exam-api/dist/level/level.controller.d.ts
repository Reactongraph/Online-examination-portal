import { LevelService } from './level.service';
import { level_dto } from './level.entity';
export declare class LevelController {
    private readonly Levels;
    constructor(Levels: LevelService);
    create(level: level_dto): Promise<string>;
    findAll(): Promise<string>;
    findOne(id: string): Promise<string>;
    update(id: string, update_level: level_dto): Promise<string>;
    remove(id: string): Promise<string>;
}
