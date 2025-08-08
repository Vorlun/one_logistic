import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleInput } from './inputs/create-role.input';
import { UpdateRoleInput } from './inputs/update-role.input';
import { User } from '../users/entities/user.entity';
export declare class RolesService {
    private readonly roleRepo;
    private readonly logger;
    constructor(roleRepo: Repository<Role>);
    create(input: CreateRoleInput): Promise<Role>;
    findAll(): Promise<Role[]>;
    findOne(id: number): Promise<Role>;
    update(input: UpdateRoleInput): Promise<Role>;
    remove(id: number): Promise<boolean>;
    findAllWithRestrictions(user: User): Promise<any[]>;
    findOneWithRestrictions(id: number, user: User): Promise<any>;
    filterByName(name: string, user: User): Promise<any[]>;
}
