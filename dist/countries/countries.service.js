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
var CountriesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const country_entity_1 = require("./entities/country.entity");
let CountriesService = CountriesService_1 = class CountriesService {
    countryRepo;
    logger = new common_1.Logger(CountriesService_1.name);
    constructor(countryRepo) {
        this.countryRepo = countryRepo;
    }
    async create(input) {
        const exists = await this.countryRepo.findOne({
            where: { iso_code: input.iso_code },
        });
        if (exists)
            throw new common_1.BadRequestException("Country with this ISO code already exists");
        const country = this.countryRepo.create(input);
        const saved = await this.countryRepo.save(country);
        this.logger.log(`Country created: ID ${saved.id}`);
        return saved;
    }
    async findAll() {
        return this.countryRepo.find({ relations: ["regions"] });
    }
    async findOne(id) {
        const country = await this.countryRepo.findOne({
            where: { id },
            relations: ["regions"],
        });
        if (!country)
            throw new common_1.NotFoundException("Country not found");
        return country;
    }
    async update(id, input) {
        const country = await this.findOne(id);
        Object.assign(country, {
            iso_code: input.iso_code ?? country.iso_code,
            name: input.name ?? country.name,
        });
        const updated = await this.countryRepo.save(country);
        this.logger.log(`Country updated: ID ${updated.id}`);
        return updated;
    }
    async remove(id) {
        const country = await this.findOne(id);
        await this.countryRepo.remove(country);
        this.logger.log(`Country deleted: ID ${id}`);
        return true;
    }
};
exports.CountriesService = CountriesService;
exports.CountriesService = CountriesService = CountriesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(country_entity_1.Country)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CountriesService);
//# sourceMappingURL=countries.service.js.map