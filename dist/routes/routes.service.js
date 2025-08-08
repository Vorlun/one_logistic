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
var RoutesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const route_entity_1 = require("./entities/route.entity");
const address_entity_1 = require("../address/entities/address.entity");
const order_entity_1 = require("../orders/entities/order.entity");
const vehicle_entity_1 = require("../vehicles/entities/vehicle.entity");
const product_entity_1 = require("../products/entities/product.entity");
let RoutesService = RoutesService_1 = class RoutesService {
    routeRepo;
    addressRepo;
    orderRepo;
    vehicleRepo;
    productRepo;
    logger = new common_1.Logger(RoutesService_1.name);
    constructor(routeRepo, addressRepo, orderRepo, vehicleRepo, productRepo) {
        this.routeRepo = routeRepo;
        this.addressRepo = addressRepo;
        this.orderRepo = orderRepo;
        this.vehicleRepo = vehicleRepo;
        this.productRepo = productRepo;
    }
    async create(input) {
        const origin = await this.addressRepo.findOne({
            where: { id: input.origin_id },
        });
        const destination = await this.addressRepo.findOne({
            where: { id: input.destination_id },
        });
        if (!origin || !destination) {
            throw new common_1.NotFoundException("Origin or Destination address not found");
        }
        const route = this.routeRepo.create({
            origin,
            destination,
            estimated_time: input.estimated_time,
            route_type: input.route_type,
            distance_km: input.distance_km,
        });
        const saved = await this.routeRepo.save(route);
        this.logger.log(`Route created: ID ${saved.id}`);
        return saved;
    }
    async findAll() {
        return this.routeRepo.find({ relations: ["origin", "destination"] });
    }
    async findOne(id) {
        const route = await this.routeRepo.findOne({
            where: { id },
            relations: ["origin", "destination"],
        });
        if (!route)
            throw new common_1.NotFoundException("Route not found");
        return route;
    }
    async update(id, input) {
        const route = await this.findOne(id);
        if (input.origin_id) {
            route.origin = await this.addressRepo.findOneByOrFail({
                id: input.origin_id,
            });
        }
        if (input.destination_id) {
            route.destination = await this.addressRepo.findOneByOrFail({
                id: input.destination_id,
            });
        }
        Object.assign(route, {
            estimated_time: input.estimated_time ?? route.estimated_time,
            route_type: input.route_type ?? route.route_type,
            distance_km: input.distance_km ?? route.distance_km,
        });
        return this.routeRepo.save(route);
    }
    async remove(id) {
        const route = await this.findOne(id);
        await this.routeRepo.remove(route);
        return true;
    }
    async assignOrdersToVehicles(routeId) {
        const route = await this.findOne(routeId);
        const orders = await this.orderRepo.find({
            where: { route: { id: route.id }, status: "pending" },
            relations: ["products", "vehicles"],
        });
        if (!orders.length) {
            throw new common_1.BadRequestException("No pending orders for this route");
        }
        const vehicles = await this.vehicleRepo.find({
            where: { status: "available" },
            relations: ["orders", "orders.products"],
        });
        if (!vehicles.length) {
            throw new common_1.BadRequestException("No available vehicles");
        }
        for (const order of orders) {
            const totalWeight = order.products.reduce((sum, p) => sum + p.weight_kg * p.quantity, 0);
            const totalVolume = order.products.reduce((sum, p) => sum + p.volume_m3 * p.quantity, 0);
            let remainingWeight = totalWeight;
            let remainingVolume = totalVolume;
            for (const vehicle of vehicles) {
                if (remainingWeight <= 0 && remainingVolume <= 0)
                    break;
                const load = await this.calculateVehicleLoad(vehicle.id);
                const availableWeight = vehicle.capacity_kg - load.weight;
                const availableVolume = vehicle.volume_m3 - load.volume;
                if (availableWeight <= 0 || availableVolume <= 0)
                    continue;
                order.vehicles.push(vehicle);
                this.logger.log(`Assigned vehicle ${vehicle.plate_number} to order ${order.id}`);
                remainingWeight -= availableWeight;
                remainingVolume -= availableVolume;
            }
            if (remainingWeight > 0 || remainingVolume > 0) {
                throw new common_1.BadRequestException(`Not enough vehicle capacity for order ${order.id}`);
            }
            order.status = "assigned";
            await this.orderRepo.save(order);
        }
        return "All orders assigned to vehicles successfully";
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
exports.RoutesService = RoutesService;
exports.RoutesService = RoutesService = RoutesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(route_entity_1.Route)),
    __param(1, (0, typeorm_1.InjectRepository)(address_entity_1.Address)),
    __param(2, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(3, (0, typeorm_1.InjectRepository)(vehicle_entity_1.Vehicle)),
    __param(4, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], RoutesService);
//# sourceMappingURL=routes.service.js.map