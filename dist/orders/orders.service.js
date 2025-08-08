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
var OrdersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./entities/order.entity");
const vehicle_entity_1 = require("../vehicles/entities/vehicle.entity");
const product_entity_1 = require("../products/entities/product.entity");
const user_entity_1 = require("../users/entities/user.entity");
const address_entity_1 = require("../address/entities/address.entity");
const route_entity_1 = require("../routes/entities/route.entity");
let OrdersService = OrdersService_1 = class OrdersService {
    orderRepo;
    vehicleRepo;
    productRepo;
    userRepo;
    addressRepo;
    routeRepo;
    logger = new common_1.Logger(OrdersService_1.name);
    constructor(orderRepo, vehicleRepo, productRepo, userRepo, addressRepo, routeRepo) {
        this.orderRepo = orderRepo;
        this.vehicleRepo = vehicleRepo;
        this.productRepo = productRepo;
        this.userRepo = userRepo;
        this.addressRepo = addressRepo;
        this.routeRepo = routeRepo;
    }
    async create(input) {
        const client = await this.userRepo.findOneByOrFail({ id: input.client_id });
        const dispatcher = await this.userRepo.findOneByOrFail({
            id: input.dispatcher_id,
        });
        const pickup_address = await this.addressRepo.findOneByOrFail({
            id: input.pickup_address_id,
        });
        const delivery_address = await this.addressRepo.findOneByOrFail({
            id: input.delivery_address_id,
        });
        const route = await this.routeRepo.findOneByOrFail({ id: input.route_id });
        const order = this.orderRepo.create({
            client,
            dispatcher,
            pickup_address,
            delivery_address,
            route,
            status: input.status,
            total_price: input.total_price,
            currency: input.currency,
            vehicles: [],
            products: [],
        });
        if (input.vehicle_ids?.length) {
            const vehicles = await this.vehicleRepo.findBy({
                id: (0, typeorm_2.In)(input.vehicle_ids),
            });
            order.vehicles = vehicles;
        }
        const savedOrder = await this.orderRepo.save(order);
        this.logger.log(`Order created: ID ${savedOrder.id}`);
        return savedOrder;
    }
    async findAll() {
        return this.orderRepo.find({
            relations: [
                "client",
                "dispatcher",
                "pickup_address",
                "delivery_address",
                "route",
                "vehicles",
                "products",
            ],
        });
    }
    async findOne(id) {
        const order = await this.orderRepo.findOne({
            where: { id },
            relations: [
                "client",
                "dispatcher",
                "pickup_address",
                "delivery_address",
                "route",
                "vehicles",
                "products",
            ],
        });
        if (!order)
            throw new common_1.NotFoundException("Order not found");
        return order;
    }
    async update(id, input) {
        const order = await this.findOne(id);
        Object.assign(order, input);
        if (input.vehicle_ids?.length) {
            const vehicles = await this.vehicleRepo.findBy({
                id: (0, typeorm_2.In)(input.vehicle_ids),
            });
            order.vehicles = vehicles;
        }
        return this.orderRepo.save(order);
    }
    async remove(id) {
        const order = await this.findOne(id);
        await this.orderRepo.remove(order);
        return true;
    }
    async assignProductsToVehicles(orderId) {
        const order = await this.orderRepo.findOne({
            where: { id: orderId },
            relations: ["products", "vehicles"],
        });
        if (!order)
            throw new common_1.NotFoundException("Order not found");
        if (!order.products.length) {
            throw new common_1.BadRequestException("Order has no products");
        }
        const totalWeight = order.products.reduce((sum, p) => sum + p.weight_kg * p.quantity, 0);
        const totalVolume = order.products.reduce((sum, p) => sum + p.volume_m3 * p.quantity, 0);
        const productType = order.products[0].type;
        let vehicles = await this.vehicleRepo.find({
            where: { type: productType, status: "available" },
            relations: ["orders", "orders.products"],
        });
        if (!vehicles.length) {
            throw new common_1.BadRequestException("No available vehicles for this product type");
        }
        let remainingWeight = totalWeight;
        let remainingVolume = totalVolume;
        for (const vehicle of vehicles) {
            if (remainingWeight <= 0 && remainingVolume <= 0)
                break;
            const load = await this.calculateVehicleLoad(vehicle);
            const availableWeight = vehicle.capacity_kg - load.weight;
            const availableVolume = vehicle.volume_m3 - load.volume;
            if (availableWeight <= 0 || availableVolume <= 0)
                continue;
            order.vehicles.push(vehicle);
            remainingWeight -= availableWeight;
            remainingVolume -= availableVolume;
        }
        if (remainingWeight > 0 || remainingVolume > 0) {
            throw new common_1.BadRequestException("Not enough vehicle capacity");
        }
        return this.orderRepo.save(order);
    }
    async calculateVehicleLoad(vehicle) {
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
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = OrdersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(vehicle_entity_1.Vehicle)),
    __param(2, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(3, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(4, (0, typeorm_1.InjectRepository)(address_entity_1.Address)),
    __param(5, (0, typeorm_1.InjectRepository)(route_entity_1.Route)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrdersService);
//# sourceMappingURL=orders.service.js.map