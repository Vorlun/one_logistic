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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const bcrypt = require("bcryptjs");
const roles_service_1 = require("../roles/roles.service");
const mail_service_1 = require("../mail/mail.service");
const uuid_1 = require("uuid");
let UsersService = class UsersService {
    userRepository;
    roleService;
    mailService;
    constructor(userRepository, roleService, mailService) {
        this.userRepository = userRepository;
        this.roleService = roleService;
        this.mailService = mailService;
    }
    async createAndReturnFullUser(dto, currentUser) {
        const existing = await this.userRepository.findOne({
            where: { email: dto.email },
        });
        if (existing)
            throw new common_1.BadRequestException("Email already exists");
        if (dto.password !== dto.confirm_password)
            throw new common_1.BadRequestException("Passwords do not match");
        const role = await this.roleService.findOne(dto.role_id);
        if (!role)
            throw new common_1.NotFoundException("Role not found");
        const currentLevel = currentUser?.role?.level ?? 0;
        const targetLevel = role.level;
        if (targetLevel === 1 && currentLevel < 2)
            throw new common_1.ForbiddenException("Only admin or super_admin can create manager");
        if (targetLevel === 2 && currentLevel < 3)
            throw new common_1.ForbiddenException("Only super_admin can create admin");
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const user = this.userRepository.create({
            full_name: dto.full_name,
            email: dto.email,
            password: hashedPassword,
            phone_number: dto.phone_number,
            is_active: dto.is_active ?? true,
            role,
        });
        if (targetLevel === 0) {
            user.is_verified = false;
            user.activation_link = crypto.randomUUID();
            await this.mailService.sendActivationEmail(user.email, user.activation_link);
        }
        else {
            user.is_verified = true;
        }
        return await this.userRepository.save(user);
    }
    async findAll(currentUser) {
        const currentLevel = currentUser.role.level;
        let users = [];
        if (currentLevel === 3) {
            users = await this.userRepository.find();
        }
        else if (currentLevel === 2) {
            users = await this.userRepository.find({
                where: [{ role: { level: 1 } }, { role: { level: 0 } }],
            });
        }
        else if (currentLevel === 1) {
            users = await this.userRepository.find({
                where: { role: { level: 0 } },
            });
        }
        else {
            throw new common_1.ForbiddenException("You are not allowed to get users list");
        }
        return users.map(this.excludeSensitiveFields);
    }
    async findOne(id, currentUser) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException("User not found");
        const targetLevel = user.role.level;
        const currentLevel = currentUser.role.level;
        if (currentLevel === 3)
            return this.excludeSensitiveFields(user);
        if (user.id === currentUser.id)
            return this.excludeSensitiveFields(user);
        if (currentLevel === 2 && targetLevel < 2)
            return this.excludeSensitiveFields(user);
        if (currentLevel === 1 && targetLevel === 0)
            return this.excludeSensitiveFields(user);
        throw new common_1.ForbiddenException("You are not allowed to access this user");
    }
    async update(id, dto, currentUser) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException("User not found");
        const currentLevel = currentUser.role.level;
        const targetLevel = user.role.level;
        if ("password" in dto) {
            delete dto.password;
        }
        if (currentLevel === 3) {
        }
        else if (user.id === currentUser.id) {
        }
        else if (currentLevel === 2 && targetLevel < 2) {
        }
        else if (currentLevel === 1 && targetLevel === 0) {
        }
        else {
            throw new common_1.ForbiddenException("You are not allowed to update this user");
        }
        if (dto.role_id) {
            const role = await this.roleService.findOne(dto.role_id);
            if (!role)
                throw new common_1.NotFoundException("Role not found");
            user.role = role;
        }
        Object.assign(user, dto);
        const updated = await this.userRepository.save(user);
        return this.excludeSensitiveFields(updated);
    }
    async remove(id, currentUser) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException("User not found");
        const currentLevel = currentUser.role.level;
        const targetLevel = user.role.level;
        if (currentLevel === 3) {
        }
        else if (user.id === currentUser.id) {
        }
        else if (currentLevel > targetLevel) {
        }
        else {
            throw new common_1.ForbiddenException("You are not allowed to delete this user");
        }
        await this.userRepository.remove(user);
    }
    async findByEmailWithSensitive(email) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new common_1.NotFoundException("User with this email not found");
        }
        return user;
    }
    excludeSensitiveFields(user) {
        const { password, refresh_token, reset_token, ...rest } = user;
        return rest;
    }
    async findByIdWithSensitive(id) {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ["role"],
        });
        if (!user)
            throw new common_1.NotFoundException("User not found");
        return user;
    }
    async findByResetToken(token) {
        const user = await this.userRepository.findOne({
            where: { reset_token: token },
        });
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        if (!user.reset_token) {
            throw new common_1.BadRequestException("Invalid or expired token");
        }
        return user;
    }
    async saveUser(user) {
        return this.userRepository.save(user);
    }
    async findByActivationLink(token) {
        if (!(0, uuid_1.validate)(token))
            return null;
        return await this.userRepository.findOne({
            where: { activation_link: token },
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        roles_service_1.RolesService,
        mail_service_1.MailService])
], UsersService);
//# sourceMappingURL=users.service.js.map