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
var ProductsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./entities/product.entity");
const order_entity_1 = require("../orders/entities/order.entity");
const vehicle_entity_1 = require("../vehicles/entities/vehicle.entity");
let ProductsService = ProductsService_1 = class ProductsService {
    productRepo;
    orderRepo;
    vehicleRepo;
    logger = new common_1.Logger(ProductsService_1.name);
    constructor(productRepo, orderRepo, vehicleRepo) {
        this.productRepo = productRepo;
        this.orderRepo = orderRepo;
        this.vehicleRepo = vehicleRepo;
    }
    async create(input) {
        const order = await this.orderRepo.findOne({
            where: { id: input.order_id },
            relations: ["vehicles", "products"],
        });
        if (!order)
            throw new common_1.NotFoundException("Order not found");
        const product = this.productRepo.create({
            ...input,
            order,
        });
        const savedProduct = await this.productRepo.save(product);
        await this.assignProductsToVehicles(order);
        this.logger.log(`Product created and assigned: ${savedProduct.name}`);
        return savedProduct;
    }
    async findAll() {
        return this.productRepo.find({ relations: ["order"] });
    }
    async findOne(id) {
        const product = await this.productRepo.findOne({
            where: { id },
            relations: ["order"],
        });
        if (!product)
            throw new common_1.NotFoundException("Product not found");
        return product;
    }
    async update(id, input) {
        const product = await this.findOne(id);
        Object.assign(product, input);
        const updated = await this.productRepo.save(product);
        const order = await this.orderRepo.findOne({
            where: { id: product.order.id },
            relations: ["vehicles", "products"],
        });
        if (order) {
            await this.assignProductsToVehicles(order);
        }
        return updated;
    }
    async remove(id) {
        const product = await this.findOne(id);
        await this.productRepo.remove(product);
        const order = await this.orderRepo.findOne({
            where: { id: product.order.id },
            relations: ["vehicles", "products"],
        });
        if (order) {
            await this.assignProductsToVehicles(order);
        }
        return true;
    }
    async assignProductsToVehicles(order) {
        const products = order.products;
        if (!products.length) {
            this.logger.warn(`No products in order ${order.id}`);
            return;
        }
        const totalWeight = products.reduce((sum, p) => sum + p.weight_kg * p.quantity, 0);
        const totalVolume = products.reduce((sum, p) => sum + p.volume_m3 * p.quantity, 0);
        const productType = products[0].type;
        let vehicles = await this.vehicleRepo.find({
            where: { type: productType, status: "available" },
            relations: ["orders", "orders.products"],
        });
        if (!vehicles.length) {
            throw new common_1.BadRequestException("No available vehicles for this type");
        }
        let remainingWeight = totalWeight;
        let remainingVolume = totalVolume;
        order.vehicles = [];
        for (const vehicle of vehicles) {
            if (remainingWeight <= 0 && remainingVolume <= 0)
                break;
            const load = this.calculateVehicleLoad(vehicle);
            const availableWeight = vehicle.capacity_kg - load.weight;
            const availableVolume = vehicle.volume_m3 - load.volume;
            if (availableWeight <= 0 || availableVolume <= 0)
                continue;
            order.vehicles.push(vehicle);
            this.logger.log(`Vehicle ${vehicle.plate_number} assigned to order ${order.id}`);
            remainingWeight -= availableWeight;
            remainingVolume -= availableVolume;
        }
        if (remainingWeight > 0 || remainingVolume > 0) {
            throw new common_1.BadRequestException("Not enough vehicle capacity for all products");
        }
        await this.orderRepo.save(order);
    }
    calculateVehicleLoad(vehicle) {
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
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = ProductsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(2, (0, typeorm_1.InjectRepository)(vehicle_entity_1.Vehicle)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ProductsService);
//# sourceMappingURL=products.service.js.map