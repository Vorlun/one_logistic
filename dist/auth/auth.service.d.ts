import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { Response, Request } from "express";
import { User } from "../users/entities/user.entity";
import { MailService } from "../mail/mail.service";
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly mailService;
    constructor(usersService: UsersService, jwtService: JwtService, mailService: MailService);
    register(dto: CreateUserDto, currentUser: User, res: Response): Promise<{
        id: number;
        access_token: string;
    }>;
    login(email: string, password: string, res: Response): Promise<{
        access_token: string;
    }>;
    logout(userId: number, res: Response): Promise<{
        message: string;
    }>;
    refresh(req: Request, res: Response): Promise<{
        access_token: string;
    }>;
    changePassword(userId: number, oldPassword: string, newPassword: string, confirmPassword: string): Promise<{
        message: string;
    }>;
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    setNewPassword(token: string, newPassword: string, confirmPassword: string): Promise<{
        message: string;
    }>;
    private generateTokens;
    private saveRefreshToken;
    private setCookie;
    activateAccount(token: string): Promise<{
        message: string;
    }>;
}
