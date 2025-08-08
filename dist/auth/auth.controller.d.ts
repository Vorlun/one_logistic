import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { Response, Request } from "express";
import { SetNewPasswordDto } from "../users/dto/reset-password.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: CreateUserDto, currentUser: any, res: Response): Promise<{
        id: number;
        access_token: string;
    }>;
    login(email: string, password: string, res: Response): Promise<{
        access_token: string;
    }>;
    logout(currentUser: any, res: Response): Promise<{
        message: string;
    }>;
    refresh(req: Request, res: Response): Promise<{
        access_token: string;
    }>;
    changePassword(currentUser: any, oldPassword: string, newPassword: string, confirmPassword: string): Promise<{
        message: string;
    }>;
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    setNewPassword(token: string, body: SetNewPasswordDto): Promise<{
        message: string;
    }>;
}
