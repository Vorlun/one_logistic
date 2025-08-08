import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { RolesService } from "../roles/roles.service";
export declare class UsersService {
    private readonly userRepository;
    private readonly roleService;
    constructor(userRepository: Repository<User>, roleService: RolesService);
    createAndReturnFullUser(createUserDto: CreateUserDto, currentUser: User): Promise<User>;
    findAll(currentUser: User): Promise<Omit<User, "password" | "refresh_token" | "reset_token">[]>;
    findOne(id: number, currentUser: User): Promise<Omit<User, "password" | "refresh_token" | "reset_token">>;
    update(id: number, dto: UpdateUserDto, currentUser: User): Promise<Omit<User, "password" | "refresh_token" | "reset_token">>;
    remove(id: number, currentUser: User): Promise<void>;
    findByEmailWithSensitive(email: string): Promise<User>;
    private excludeSensitiveFields;
    findByIdWithSensitive(id: number): Promise<User>;
    findByResetToken(token: string): Promise<User>;
    saveUser(user: User): Promise<User>;
}
