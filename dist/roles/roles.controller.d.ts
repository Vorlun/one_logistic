import { RolesService } from "./roles.service";
import { CreateRoleInput } from "./inputs/create-role.input";
import { UpdateRoleInput } from "./inputs/update-role.input";
import { Role } from "./entities/role.entity";
import { User } from "../users/entities/user.entity";
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    create(input: CreateRoleInput): Promise<Role>;
    findAll(user: User): Promise<any>;
    findOne(id: number, user: User): Promise<any>;
    update(id: number, input: Omit<UpdateRoleInput, "id">): Promise<Role>;
    remove(id: number): Promise<boolean>;
    filterByName(name: string, user: User): Promise<any>;
}
