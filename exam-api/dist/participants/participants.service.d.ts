import { participants_dto } from './participants.entity';
export declare class ParticipantsService {
    create(params: participants_dto): Promise<any>;
    reset_link(email: string, password: string): Promise<void>;
    findAll(): Promise<string>;
    findOne(id: string): Promise<string>;
    update(id: string, updateRestApiDto: participants_dto): Promise<string>;
    remove(id: string): Promise<string>;
}
