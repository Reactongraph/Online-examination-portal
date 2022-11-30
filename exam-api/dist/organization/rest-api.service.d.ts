import { PostDTO } from './post';
export declare class RestApiService {
    create(createRestApiDto: PostDTO): Promise<any>;
    reset_link(token: string, id: string, email: string): Promise<void>;
    findAll(): Promise<string>;
    findOne(id: string): Promise<string>;
    update(id: string, updateRestApiDto: PostDTO): Promise<string>;
    remove(id: string): Promise<string>;
}
