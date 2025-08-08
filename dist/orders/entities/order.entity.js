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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const route_entity_1 = require("../../routes/entities/route.entity");
const vehicle_entity_1 = require("../../vehicles/entities/vehicle.entity");
const payment_entity_1 = require("../../payments/entities/payment.entity");
const product_entity_1 = require("../../products/entities/product.entity");
const address_entity_1 = require("../../address/entities/address.entity");
let Order = class Order {
    id;
    client;
    dispatcher;
    pickup_address;
    delivery_address;
    route;
    vehicles;
    status;
    total_price;
    currency;
    products;
    payments;
};
exports.Order = Order;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Order.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: false }),
    __metadata("design:type", user_entity_1.User)
], Order.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: false }),
    __metadata("design:type", user_entity_1.User)
], Order.prototype, "dispatcher", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => address_entity_1.Address, { nullable: false }),
    __metadata("design:type", address_entity_1.Address)
], Order.prototype, "pickup_address", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => address_entity_1.Address, { nullable: false }),
    __metadata("design:type", address_entity_1.Address)
], Order.prototype, "delivery_address", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => route_entity_1.Route, { nullable: false }),
    __metadata("design:type", route_entity_1.Route)
], Order.prototype, "route", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => vehicle_entity_1.Vehicle, (vehicle) => vehicle.orders),
    __metadata("design:type", Array)
], Order.prototype, "vehicles", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20 }),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "float" }),
    __metadata("design:type", Number)
], Order.prototype, "total_price", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10 }),
    __metadata("design:type", String)
], Order.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_entity_1.Product, (product) => product.order),
    __metadata("design:type", Array)
], Order.prototype, "products", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => payment_entity_1.Payment, (payment) => payment.order),
    __metadata("design:type", Array)
], Order.prototype, "payments", void 0);
exports.Order = Order = __decorate([
    (0, typeorm_1.Entity)("orders")
], Order);
//# sourceMappingURL=order.entity.js.map