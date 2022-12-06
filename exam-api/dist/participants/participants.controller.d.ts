import { participants_dto } from './participants.entity';
import { ParticipantsService } from './participants.service';
export declare class ParticipantsController {
    private readonly participant;
    constructor(participant: ParticipantsService);
    create(createparticipants: participants_dto): Promise<any>;
    findAll(): Promise<string>;
    findOne(id: string): Promise<string>;
    update(id: string, updateparticipants: participants_dto): Promise<string>;
    remove(id: string): Promise<string>;
}
