import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { auth_dto } from './auth.entity';
import { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    private readonly jwtService;
    constructor(authService: AuthService, jwtService: JwtService);
    create(Headers: auth_dto, body: auth_dto): Promise<"error" | "password change" | "token expired">;
    login(login: auth_dto, response: Response): Promise<void>;
}
