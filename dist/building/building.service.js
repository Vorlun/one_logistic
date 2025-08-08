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
var BuildingsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildingsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const building_entity_1 = require("./entities/building.entity");
const user_entity_1 = require("../users/entities/user.entity");
const company_entity_1 = require("../companies/entities/company.entity");
const address_entity_1 = require("../address/entities/address.entity");
let BuildingsService = BuildingsService_1 = class BuildingsService {
    buildingRepo;
    userRepo;
    companyRepo;
    addressRepo;
    logger = new common_1.Logger(BuildingsService_1.name);
    constructor(buildingRepo, userRepo, companyRepo, addressRepo) {
        this.buildingRepo = buildingRepo;
        this.userRepo = userRepo;
        this.companyRepo = companyRepo;
        this.addressRepo = addressRepo;
    }
    async create(input) {
        const building = this.buildingRepo.create({
            name: input.name,
            type: input.type,
            is_active: input.is_active ?? true,
        });
        if (input.user_id) {
            const user = await this.userRepo.findOne({
                where: { id: input.user_id },
            });
            if (!user)
                throw new common_1.BadRequestException("User not found");
            building.user = user;
        }
        if (input.company_id) {
            const company = await this.companyRepo.findOne({
                where: { id: input.company_id },
            });
            if (!company)
                throw new common_1.BadRequestException("Company not found");
            building.company = company;
        }
        const saved = await this.buildingRepo.save(building);
        this.logger.log(`Building created: ID ${saved.id}`);
        return saved;
    }
    async findAll() {
        return this.buildingRepo.find({
            relations: ["user", "company", "addresses", "employees"],
        });
    }
    async findOne(id) {
        const building = await this.buildingRepo.findOne({
            where: { id },
            relations: ["user", "company", "addresses", "employees"],
        });
        if (!building)
            throw new common_1.NotFoundException("Building not found");
        return building;
    }
    async update(id, input) {
        const building = await this.findOne(id);
        if (input.user_id) {
            const user = await this.userRepo.findOne({
                where: { id: input.user_id },
            });
            if (!user)
                throw new common_1.BadRequestException("User not found");
            building.user = user;
        }
        if (input.company_id) {
            const company = await this.companyRepo.findOne({
                where: { id: input.company_id },
            });
            if (!company)
                throw new common_1.BadRequestException("Company not found");
            building.company = company;
        }
        Object.assign(building, {
            name: input.name ?? building.name,
            type: input.type ?? building.type,
            is_active: input.is_active ?? building.is_active,
        });
        const updated = await this.buildingRepo.save(building);
        this.logger.log(`Building updated: ID ${updated.id}`);
        return updated;
    }
    async remove(id) {
        const building = await this.findOne(id);
        await this.buildingRepo.remove(building);
        this.logger.log(`Building deleted: ID ${id}`);
        return true;
    }
};
exports.BuildingsService = BuildingsService;
exports.BuildingsService = BuildingsService = BuildingsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(building_entity_1.Building)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(company_entity_1.Company)),
    __param(3, (0, typeorm_1.InjectRepository)(address_entity_1.Address)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], BuildingsService);
//# sourceMappingURL=building.service.js.map