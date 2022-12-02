import { RestApiService } from './rest-api.service';
import { PostDTO } from './post';
import { JwtService } from '@nestjs/jwt';
export declare class RestApiController {
    private readonly restApiService;
    private jwtService;
    constructor(restApiService: RestApiService, jwtService: JwtService);
    create(createRestApiDto: PostDTO): Promise<{
        message: string;
    }>;
    findAll(Headers: any): Promise<string>;
    findOne(id: string): Promise<string>;
    update(id: string, updateRestApiDto: PostDTO): Promise<string>;
    remove(id: string): Promise<string>;
}
