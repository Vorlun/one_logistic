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
var PaymentsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const payment_entity_1 = require("./entities/payment.entity");
const order_entity_1 = require("../orders/entities/order.entity");
let PaymentsService = PaymentsService_1 = class PaymentsService {
    paymentRepo;
    orderRepo;
    logger = new common_1.Logger(PaymentsService_1.name);
    constructor(paymentRepo, orderRepo) {
        this.paymentRepo = paymentRepo;
        this.orderRepo = orderRepo;
    }
    async create(input) {
        const order = await this.orderRepo.findOne({
            where: { id: input.order_id },
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${input.order_id} not found`);
        }
        if (order.total_price <= 0) {
            throw new common_1.BadRequestException("Order already fully paid");
        }
        if (input.amount > order.total_price) {
            throw new common_1.BadRequestException(`Payment amount (${input.amount}) exceeds remaining order total_price (${order.total_price})`);
        }
        const payment = this.paymentRepo.create({
            amount: input.amount,
            method: input.method,
            status: input.status,
            order: order,
        });
        const savedPayment = await this.paymentRepo.save(payment);
        order.total_price -= input.amount;
        if (order.total_price <= 0) {
            order.total_price = 0;
            order.status = "paid";
        }
        await this.orderRepo.save(order);
        this.logger.log(`Payment of amount ${input.amount} added to order ${order.id}. Remaining total_price: ${order.total_price}`);
        return savedPayment;
    }
    async findAll() {
        return this.paymentRepo.find({ relations: ["order"] });
    }
    async findOne(id) {
        const payment = await this.paymentRepo.findOne({
            where: { id },
            relations: ["order"],
        });
        if (!payment)
            throw new common_1.NotFoundException("Payment not found");
        return payment;
    }
    async update(id, input) {
        const payment = await this.findOne(id);
        if (input.amount && input.amount !== payment.amount) {
            const order = payment.order;
            order.total_price += payment.amount;
            if (input.amount > order.total_price) {
                throw new common_1.BadRequestException("Payment amount exceeds total price");
            }
            order.total_price -= input.amount;
            await this.orderRepo.save(order);
        }
        Object.assign(payment, input);
        const updated = await this.paymentRepo.save(payment);
        this.logger.log(`Payment updated: ID ${updated.id}`);
        return updated;
    }
    async remove(id) {
        const payment = await this.findOne(id);
        const order = payment.order;
        order.total_price += payment.amount;
        await this.orderRepo.save(order);
        await this.paymentRepo.remove(payment);
        this.logger.log(`Payment deleted: ID ${id}`);
        return true;
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = PaymentsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __param(1, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map