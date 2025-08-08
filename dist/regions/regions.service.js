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
var RegionsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const region_entity_1 = require("./entities/region.entity");
const country_entity_1 = require("../countries/entities/country.entity");
let RegionsService = RegionsService_1 = class RegionsService {
    regionRepo;
    countryRepo;
    logger = new common_1.Logger(RegionsService_1.name);
    constructor(regionRepo, countryRepo) {
        this.regionRepo = regionRepo;
        this.countryRepo = countryRepo;
    }
    async create(input) {
        const country = await this.countryRepo.findOne({
            where: { id: input.country_id },
        });
        if (!country)
            throw new common_1.BadRequestException("Country not found");
        const exists = await this.regionRepo.findOne({
            where: { name: input.name, country: { id: input.country_id } },
        });
        if (exists)
            throw new common_1.BadRequestException("Region already exists in this country");
        const region = this.regionRepo.create({
            name: input.name,
            country,
        });
        const saved = await this.regionRepo.save(region);
        this.logger.log(`Region created: ID ${saved.id}`);
        return saved;
    }
    async findAll() {
        return this.regionRepo.find({ relations: ["country"] });
    }
    async findOne(id) {
        const region = await this.regionRepo.findOne({
            where: { id },
            relations: ["country"],
        });
        if (!region)
            throw new common_1.NotFoundException("Region not found");
        return region;
    }
    async update(id, input) {
        const region = await this.findOne(id);
        if (input.country_id) {
            const country = await this.countryRepo.findOne({
                where: { id: input.country_id },
            });
            if (!country)
                throw new common_1.BadRequestException("Country not found");
            region.country = country;
        }
        if (input.name) {
            const exists = await this.regionRepo.findOne({
                where: {
                    name: input.name,
                    country: { id: input.country_id ?? region.country.id },
                },
            });
            if (exists && exists.id !== region.id) {
                throw new common_1.BadRequestException("Region with this name already exists in this country");
            }
        }
        Object.assign(region, {
            name: input.name ?? region.name,
        });
        const updated = await this.regionRepo.save(region);
        this.logger.log(`Region updated: ID ${updated.id}`);
        return updated;
    }
    async remove(id) {
        const region = await this.findOne(id);
        await this.regionRepo.remove(region);
        this.logger.log(`Region deleted: ID ${id}`);
        return true;
    }
};
exports.RegionsService = RegionsService;
exports.RegionsService = RegionsService = RegionsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(region_entity_1.Region)),
    __param(1, (0, typeorm_1.InjectRepository)(country_entity_1.Country)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], RegionsService);
//# sourceMappingURL=regions.service.js.map