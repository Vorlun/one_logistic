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
exports.Vehicle = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const company_entity_1 = require("../../companies/entities/company.entity");
const order_entity_1 = require("../../orders/entities/order.entity");
let Vehicle = class Vehicle {
    id;
    driver;
    company;
    plate_number;
    model;
    type;
    capacity_kg;
    volume_m3;
    status;
    orders;
};
exports.Vehicle = Vehicle;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Vehicle.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.vehicles, { nullable: false }),
    __metadata("design:type", user_entity_1.User)
], Vehicle.prototype, "driver", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_entity_1.Company, (company) => company.vehicles, { nullable: false }),
    __metadata("design:type", company_entity_1.Company)
], Vehicle.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20 }),
    __metadata("design:type", String)
], Vehicle.prototype, "plate_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Vehicle.prototype, "model", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], Vehicle.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "float" }),
    __metadata("design:type", Number)
], Vehicle.prototype, "capacity_kg", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "float" }),
    __metadata("design:type", Number)
], Vehicle.prototype, "volume_m3", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20 }),
    __metadata("design:type", String)
], Vehicle.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => order_entity_1.Order, (order) => order.vehicles),
    (0, typeorm_1.JoinTable)({
        name: "order_vehicles",
        joinColumn: { name: "vehicle_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "order_id", referencedColumnName: "id" },
    }),
    __metadata("design:type", Array)
], Vehicle.prototype, "orders", void 0);
exports.Vehicle = Vehicle = __decorate([
    (0, typeorm_1.Entity)("vehicles")
], Vehicle);
//# sourceMappingURL=vehicle.entity.js.map