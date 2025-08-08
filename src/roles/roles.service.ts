import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleInput } from './inputs/create-role.input';
import { UpdateRoleInput } from './inputs/update-role.input';
import { User } from '../users/entities/user.entity';

@Injectable()
export class RolesService {
  private readonly logger = new Logger(RolesService.name);

  constructor(
    @InjectRepository(Role) private readonly roleRepo: Repository<Role>
  ) {}

  async create(input: CreateRoleInput): Promise<Role> {
    const exists = await this.roleRepo.findOne({ where: { name: input.name } });
    if (exists) {
      this.logger.warn(`Role creation failed: '${input.name}' already exists`);
      throw new BadRequestException("Role already exists");
    }

    const role = this.roleRepo.create(input);
    const saved = await this.roleRepo.save(role);
    this.logger.log(`Role created: ${saved.name}`);
    return saved;
  }

  async findAll(): Promise<Role[]> {
    this.logger.log("Fetching all roles");
    return this.roleRepo.find({ relations: ["users"] });
  }

  async findOne(id: number): Promise<Role> {
    const role = await this.roleRepo.findOne({ where: { id } });
    if (!role) {
      this.logger.warn(`Role not found: ID ${id}`);
      throw new NotFoundException("Role not found");
    }
    return role;
  }

  async update(input: UpdateRoleInput): Promise<Role> {
    const role = await this.findOne(input.id);

    if (input.name) {
      const exists = await this.roleRepo.findOne({
        where: { name: input.name },
      });
      if (exists && exists.id !== role.id) {
        this.logger.warn(
          `Role update failed: name '${input.name}' already in use`
        );
        throw new BadRequestException("Role name already in use");
      }
    }

    Object.assign(role, input);
    const updated = await this.roleRepo.save(role);
    this.logger.log(`Role updated: ID ${updated.id}`);
    return updated;
  }

  async remove(id: number): Promise<boolean> {
    const role = await this.findOne(id);
    await this.roleRepo.remove(role);
    this.logger.log(`Role deleted: ID ${id}`);
    return true;
  }


  async findAllWithRestrictions(user: User): Promise<any[]> {
    const roles = await this.roleRepo.find({ relations: ["users"] });

    if (user.role.level === 2) {
      return roles.map((role) => ({
        id: role.id,
        name: role.name,
        users: role.users.map((u) => ({
          email: u.email,
          full_name: u.full_name,
        })),
      }));
    }

    return roles;
  }

  async findOneWithRestrictions(id: number, user: User): Promise<any> {
    const role = await this.roleRepo.findOne({
      where: { id },
      relations: ["users"],
    });
    if (!role) throw new NotFoundException("Role not found");

    if (user.role.level === 2) {
      return {
        id: role.id,
        name: role.name,
        users: role.users.map((u) => ({
          email: u.email,
          full_name: u.full_name,
        })),
      };
    }

    return role;
  }

  async filterByName(name: string, user: User): Promise<any[]> {
    const roles = await this.roleRepo.find({
      where: { name },
      relations: ["users"],
    });

    if (user.role.level === 2) {
      return roles.map((role) => ({
        id: role.id,
        name: role.name,
        users: role.users.map((u) => ({
          email: u.email,
          full_name: u.full_name,
        })),
      }));
    }

    return roles;
  }
}
