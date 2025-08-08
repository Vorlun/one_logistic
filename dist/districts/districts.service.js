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
var DistrictsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DistrictsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const district_entity_1 = require("./entities/district.entity");
const region_entity_1 = require("../regions/entities/region.entity");
let DistrictsService = DistrictsService_1 = class DistrictsService {
    districtRepo;
    regionRepo;
    logger = new common_1.Logger(DistrictsService_1.name);
    constructor(districtRepo, regionRepo) {
        this.districtRepo = districtRepo;
        this.regionRepo = regionRepo;
    }
    async create(input) {
        const region = await this.regionRepo.findOne({
            where: { id: input.region_id },
        });
        if (!region) {
            this.logger.warn(`Region not found for ID: ${input.region_id}`);
            throw new common_1.BadRequestException("Region not found");
        }
        const district = this.districtRepo.create({
            name: input.name,
            region,
        });
        const saved = await this.districtRepo.save(district);
        this.logger.log(`District created: ID ${saved.id}`);
        return saved;
    }
    async findAll() {
        this.logger.log("Fetching all districts");
        return this.districtRepo.find({ relations: ["region", "addresses"] });
    }
    async findOne(id) {
        const district = await this.districtRepo.findOne({
            where: { id },
            relations: ["region", "addresses"],
        });
        if (!district) {
            this.logger.warn(`District not found: ID ${id}`);
            throw new common_1.NotFoundException("District not found");
        }
        return district;
    }
    async update(id, input) {
        const district = await this.findOne(id);
        if (input.region_id) {
            const region = await this.regionRepo.findOne({
                where: { id: input.region_id },
            });
            if (!region) {
                this.logger.warn(`Region not found for ID: ${input.region_id}`);
                throw new common_1.BadRequestException("Region not found");
            }
            district.region = region;
        }
        Object.assign(district, {
            name: input.name ?? district.name,
        });
        const updated = await this.districtRepo.save(district);
        this.logger.log(`District updated: ID ${updated.id}`);
        return updated;
    }
    async remove(id) {
        const district = await this.findOne(id);
        await this.districtRepo.remove(district);
        this.logger.log(`District deleted: ID ${id}`);
        return true;
    }
};
exports.DistrictsService = DistrictsService;
exports.DistrictsService = DistrictsService = DistrictsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(district_entity_1.District)),
    __param(1, (0, typeorm_1.InjectRepository)(region_entity_1.Region)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], DistrictsService);
//# sourceMappingURL=districts.service.js.map