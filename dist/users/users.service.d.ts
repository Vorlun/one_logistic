import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { RolesService } from "../roles/roles.service";
import { MailService } from "../mail/mail.service";
export declare class UsersService {
    private readonly userRepository;
    private readonly roleService;
    private readonly mailService;
    constructor(userRepository: Repository<User>, roleService: RolesService, mailService: MailService);
    createAndReturnFullUser(dto: CreateUserDto, currentUser: User): Promise<User>;
    findAll(currentUser: User): Promise<Omit<User, "password" | "refresh_token" | "reset_token">[]>;
    findOne(id: number, currentUser: User): Promise<Omit<User, "password" | "refresh_token" | "reset_token">>;
    update(id: number, dto: UpdateUserDto, currentUser: User): Promise<Omit<User, "password" | "refresh_token" | "reset_token">>;
    remove(id: number, currentUser: User): Promise<void>;
    findByEmailWithSensitive(email: string): Promise<User>;
    private excludeSensitiveFields;
    findByIdWithSensitive(id: number): Promise<User>;
    findByResetToken(token: string): Promise<User>;
    saveUser(user: User): Promise<User>;
    findByActivationLink(token: string): Promise<User | null>;
}
