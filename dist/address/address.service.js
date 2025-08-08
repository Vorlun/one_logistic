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
var AddressesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const address_entity_1 = require("./entities/address.entity");
const district_entity_1 = require("../districts/entities/district.entity");
const user_entity_1 = require("../users/entities/user.entity");
const building_entity_1 = require("../building/entities/building.entity");
let AddressesService = AddressesService_1 = class AddressesService {
    addressRepo;
    districtRepo;
    userRepo;
    buildingRepo;
    logger = new common_1.Logger(AddressesService_1.name);
    constructor(addressRepo, districtRepo, userRepo, buildingRepo) {
        this.addressRepo = addressRepo;
        this.districtRepo = districtRepo;
        this.userRepo = userRepo;
        this.buildingRepo = buildingRepo;
    }
    async create(input) {
        const address = this.addressRepo.create({
            street: input.street,
            house_number: input.house_number,
            postal_code: input.postal_code,
            lat: input.lat,
            lon: input.lon,
        });
        if (input.district_id) {
            const district = await this.districtRepo.findOne({
                where: { id: input.district_id },
            });
            if (!district)
                throw new common_1.BadRequestException("District not found");
            address.district = district;
        }
        if (input.user_id) {
            const user = await this.userRepo.findOne({
                where: { id: input.user_id },
            });
            if (!user)
                throw new common_1.BadRequestException("User not found");
            address.user = user;
        }
        if (input.building_ids?.length) {
            const buildings = await this.buildingRepo.find({
                where: { id: (0, typeorm_2.In)(input.building_ids) },
            });
            address.buildings = buildings;
        }
        const saved = await this.addressRepo.save(address);
        this.logger.log(`Address created: ID ${saved.id}`);
        return saved;
    }
    async findAll() {
        return this.addressRepo.find({
            relations: ["district", "user", "buildings"],
        });
    }
    async findOne(id) {
        const address = await this.addressRepo.findOne({
            where: { id },
            relations: ["district", "user", "buildings"],
        });
        if (!address)
            throw new common_1.NotFoundException("Address not found");
        return address;
    }
    async update(id, input) {
        const address = await this.findOne(id);
        if (input.district_id) {
            const district = await this.districtRepo.findOne({
                where: { id: input.district_id },
            });
            if (!district)
                throw new common_1.BadRequestException("District not found");
            address.district = district;
        }
        if (input.user_id) {
            const user = await this.userRepo.findOne({
                where: { id: input.user_id },
            });
            if (!user)
                throw new common_1.BadRequestException("User not found");
            address.user = user;
        }
        if (input.building_ids) {
            const buildings = await this.buildingRepo.find({
                where: { id: (0, typeorm_2.In)(input.building_ids) },
            });
            address.buildings = buildings;
        }
        Object.assign(address, {
            street: input.street ?? address.street,
            house_number: input.house_number ?? address.house_number,
            postal_code: input.postal_code ?? address.postal_code,
            lat: input.lat ?? address.lat,
            lon: input.lon ?? address.lon,
        });
        const updated = await this.addressRepo.save(address);
        this.logger.log(`Address updated: ID ${updated.id}`);
        return updated;
    }
    async remove(id) {
        const address = await this.findOne(id);
        await this.addressRepo.remove(address);
        this.logger.log(`Address deleted: ID ${id}`);
        return true;
    }
};
exports.AddressesService = AddressesService;
exports.AddressesService = AddressesService = AddressesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(address_entity_1.Address)),
    __param(1, (0, typeorm_1.InjectRepository)(district_entity_1.District)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(3, (0, typeorm_1.InjectRepository)(building_entity_1.Building)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AddressesService);
//# sourceMappingURL=address.service.js.map