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
var CompaniesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompaniesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const company_entity_1 = require("./entities/company.entity");
const user_entity_1 = require("../users/entities/user.entity");
let CompaniesService = CompaniesService_1 = class CompaniesService {
    companyRepo;
    userRepo;
    logger = new common_1.Logger(CompaniesService_1.name);
    constructor(companyRepo, userRepo) {
        this.companyRepo = companyRepo;
        this.userRepo = userRepo;
    }
    async create(input) {
        const company = this.companyRepo.create({
            name: input.name,
            inn: input.inn,
            email: input.email,
            phone: input.phone,
        });
        if (input.manager_id) {
            const manager = await this.userRepo.findOne({
                where: { id: input.manager_id },
            });
            if (!manager)
                throw new common_1.BadRequestException("Manager not found");
            company.manager = manager;
        }
        const saved = await this.companyRepo.save(company);
        this.logger.log(`Company created: ID ${saved.id}`);
        return saved;
    }
    async findAll() {
        return this.companyRepo.find({
            relations: ["manager", "buildings", "employees"],
        });
    }
    async findOne(id) {
        const company = await this.companyRepo.findOne({
            where: { id },
            relations: ["manager", "buildings", "employees"],
        });
        if (!company)
            throw new common_1.NotFoundException("Company not found");
        return company;
    }
    async update(id, input) {
        const company = await this.findOne(id);
        if (input.manager_id) {
            const manager = await this.userRepo.findOne({
                where: { id: input.manager_id },
            });
            if (!manager)
                throw new common_1.BadRequestException("Manager not found");
            company.manager = manager;
        }
        Object.assign(company, {
            name: input.name ?? company.name,
            inn: input.inn ?? company.inn,
            email: input.email ?? company.email,
            phone: input.phone ?? company.phone,
        });
        const updated = await this.companyRepo.save(company);
        this.logger.log(`Company updated: ID ${updated.id}`);
        return updated;
    }
    async remove(id) {
        const company = await this.findOne(id);
        await this.companyRepo.remove(company);
        this.logger.log(`Company deleted: ID ${id}`);
        return true;
    }
};
exports.CompaniesService = CompaniesService;
exports.CompaniesService = CompaniesService = CompaniesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(company_entity_1.Company)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CompaniesService);
//# sourceMappingURL=companies.service.js.map