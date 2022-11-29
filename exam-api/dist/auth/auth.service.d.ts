import { auth_dto } from './auth.entity';
export declare class AuthService {
    changepass(Headers: auth_dto, body: auth_dto): Promise<"error" | "password change" | "token expired">;
    login(login: auth_dto): Promise<any>;
}
