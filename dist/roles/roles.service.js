"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var RolesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const role_entity_1 = require("./entities/role.entity");
let RolesService = RolesService_1 = class RolesService {
    roleRepo;
    logger = new common_1.Logger(RolesService_1.name);
    constructor(roleRepo) {
        this.roleRepo = roleRepo;
    }
    async create(input) {
        const exists = await this.roleRepo.findOne({ where: { name: input.name } });
        if (exists) {
            this.logger.warn(`Role creation failed: '${input.name}' already exists`);
            throw new common_1.BadRequestException("Role already exists");
        }
        const role = this.roleRepo.create(input);
        const saved = await this.roleRepo.save(role);
        this.logger.log(`Role created: ${saved.name}`);
        return saved;
    }
    async findAll() {
        this.logger.log("Fetching all roles");
        return this.roleRepo.find({ relations: ["users"] });
    }
    async findOne(id) {
        const role = await this.roleRepo.findOne({ where: { id } });
        if (!role) {
            this.logger.warn(`Role not found: ID ${id}`);
            throw new common_1.NotFoundException("Role not found");
        }
        return role;
    }
    async update(input) {
        const role = await this.findOne(input.id);
        if (input.name) {
            const exists = await this.roleRepo.findOne({
                where: { name: input.name },
            });
            if (exists && exists.id !== role.id) {
                this.logger.warn(`Role update failed: name '${input.name}' already in use`);
                throw new common_1.BadRequestException("Role name already in use");
            }
        }
        Object.assign(role, input);
        const updated = await this.roleRepo.save(role);
        this.logger.log(`Role updated: ID ${updated.id}`);
        return updated;
    }
    async remove(id) {
        const role = await this.findOne(id);
        await this.roleRepo.remove(role);
        this.logger.log(`Role deleted: ID ${id}`);
        return true;
    }
    async findAllWithRestrictions(user) {
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
    async findOneWithRestrictions(id, user) {
        const role = await this.roleRepo.findOne({
            where: { id },
            relations: ["users"],
        });
        if (!role)
            throw new common_1.NotFoundException("Role not found");
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
    async filterByName(name, user) {
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
};
exports.RolesService = RolesService;
exports.RolesService = RolesService = RolesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RolesService);
//# sourceMappingURL=roles.service.js.map