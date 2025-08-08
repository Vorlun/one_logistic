import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(currentUser: User): Promise<Omit<User, "password" | "refresh_token" | "reset_token">[]>;
    findOne(id: number, currentUser: User): Promise<Omit<User, "password" | "refresh_token" | "reset_token">>;
    update(id: number, updateUserDto: UpdateUserDto, currentUser: User): Promise<Omit<User, "password" | "refresh_token" | "reset_token">>;
    remove(id: number, currentUser: User): Promise<void>;
}
