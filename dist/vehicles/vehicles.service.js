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
var VehiclesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehiclesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const vehicle_entity_1 = require("./entities/vehicle.entity");
const order_entity_1 = require("../orders/entities/order.entity");
const product_entity_1 = require("../products/entities/product.entity");
const user_entity_1 = require("../users/entities/user.entity");
const company_entity_1 = require("../companies/entities/company.entity");
let VehiclesService = VehiclesService_1 = class VehiclesService {
    vehicleRepo;
    orderRepo;
    productRepo;
    userRepo;
    companyRepo;
    logger = new common_1.Logger(VehiclesService_1.name);
    constructor(vehicleRepo, orderRepo, productRepo, userRepo, companyRepo) {
        this.vehicleRepo = vehicleRepo;
        this.orderRepo = orderRepo;
        this.productRepo = productRepo;
        this.userRepo = userRepo;
        this.companyRepo = companyRepo;
    }
    async create(input) {
        const exists = await this.vehicleRepo.findOne({
            where: { plate_number: input.plate_number },
        });
        if (exists) {
            throw new common_1.BadRequestException("Vehicle with this plate already exists");
        }
        const driver = await this.userRepo.findOne({
            where: { id: input.driver_id },
        });
        if (!driver) {
            throw new common_1.NotFoundException("Driver not found");
        }
        const company = await this.companyRepo.findOne({
            where: { id: input.company_id },
        });
        if (!company) {
            throw new common_1.NotFoundException("Company not found");
        }
        const vehicle = this.vehicleRepo.create({
            plate_number: input.plate_number,
            model: input.model,
            type: input.type,
            capacity_kg: input.capacity_kg,
            volume_m3: input.volume_m3,
            status: input.status,
            driver,
            company,
        });
        return this.vehicleRepo.save(vehicle);
    }
    async findAll() {
        return this.vehicleRepo.find({
            relations: ["orders", "driver", "company"],
        });
    }
    async findOne(id) {
        const vehicle = await this.vehicleRepo.findOne({
            where: { id },
            relations: ["orders", "driver", "company"],
        });
        if (!vehicle)
            throw new common_1.NotFoundException("Vehicle not found");
        return vehicle;
    }
    async update(id, input) {
        const vehicle = await this.findOne(id);
        if (input.driver_id) {
            const driver = await this.userRepo.findOne({
                where: { id: input.driver_id },
            });
            if (!driver)
                throw new common_1.NotFoundException("Driver not found");
            vehicle.driver = driver;
        }
        if (input.company_id) {
            const company = await this.companyRepo.findOne({
                where: { id: input.company_id },
            });
            if (!company)
                throw new common_1.NotFoundException("Company not found");
            vehicle.company = company;
        }
        Object.assign(vehicle, {
            plate_number: input.plate_number ?? vehicle.plate_number,
            model: input.model ?? vehicle.model,
            type: input.type ?? vehicle.type,
            capacity_kg: input.capacity_kg ?? vehicle.capacity_kg,
            volume_m3: input.volume_m3 ?? vehicle.volume_m3,
            status: input.status ?? vehicle.status,
        });
        return this.vehicleRepo.save(vehicle);
    }
    async remove(id) {
        const vehicle = await this.findOne(id);
        await this.vehicleRepo.remove(vehicle);
        return true;
    }
    async assignOrderProductsToVehicles(orderId) {
        const order = await this.orderRepo.findOne({
            where: { id: orderId },
            relations: ["products", "vehicles"],
        });
        if (!order)
            throw new common_1.NotFoundException("Order not found");
        const products = order.products;
        if (!products.length) {
            throw new common_1.BadRequestException("No products to assign");
        }
        const totalWeight = products.reduce((sum, p) => sum + p.weight_kg * p.quantity, 0);
        const totalVolume = products.reduce((sum, p) => sum + p.volume_m3 * p.quantity, 0);
        const productType = products[0].type;
        let vehicles = await this.vehicleRepo.find({
            where: { type: productType, status: "available" },
            relations: ["orders"],
        });
        if (!vehicles.length) {
            throw new common_1.BadRequestException("No available vehicles for this product type");
        }
        let remainingWeight = totalWeight;
        let remainingVolume = totalVolume;
        for (const vehicle of vehicles) {
            if (remainingWeight <= 0 && remainingVolume <= 0)
                break;
            const currentLoad = await this.calculateVehicleLoad(vehicle.id);
            const availableWeight = vehicle.capacity_kg - currentLoad.weight;
            const availableVolume = vehicle.volume_m3 - currentLoad.volume;
            if (availableWeight <= 0 || availableVolume <= 0)
                continue;
            order.vehicles.push(vehicle);
            this.logger.log(`Assigned vehicle ${vehicle.plate_number} to order ${order.id}`);
            remainingWeight -= availableWeight;
            remainingVolume -= availableVolume;
        }
        if (remainingWeight > 0 || remainingVolume > 0) {
            throw new common_1.BadRequestException("Not enough vehicle capacity to carry all products");
        }
        await this.orderRepo.save(order);
    }
    async calculateVehicleLoad(vehicleId) {
        const vehicle = await this.vehicleRepo.findOne({
            where: { id: vehicleId },
            relations: ["orders", "orders.products"],
        });
        if (!vehicle)
            throw new common_1.NotFoundException("Vehicle not found");
        let weight = 0;
        let volume = 0;
        for (const order of vehicle.orders) {
            for (const p of order.products) {
                weight += p.weight_kg * p.quantity;
                volume += p.volume_m3 * p.quantity;
            }
        }
        return { weight, volume };
    }
};
exports.VehiclesService = VehiclesService;
exports.VehiclesService = VehiclesService = VehiclesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vehicle_entity_1.Vehicle)),
    __param(1, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(2, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(3, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(4, (0, typeorm_1.InjectRepository)(company_entity_1.Company)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], VehiclesService);
//# sourceMappingURL=vehicles.service.js.map