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
exports.Address = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const district_entity_1 = require("../../districts/entities/district.entity");
const building_entity_1 = require("../../building/entities/building.entity");
let Address = class Address {
    id;
    district;
    street;
    house_number;
    postal_code;
    lat;
    lon;
    user;
    buildings;
    created_at;
    updated_at;
};
exports.Address = Address;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Address.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => district_entity_1.District, (d) => d.addresses, {
        nullable: true,
        onDelete: "SET NULL",
    }),
    __metadata("design:type", Object)
], Address.prototype, "district", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], Address.prototype, "street", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], Address.prototype, "house_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], Address.prototype, "postal_code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 7, nullable: true }),
    __metadata("design:type", String)
], Address.prototype, "lat", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 7, nullable: true }),
    __metadata("design:type", String)
], Address.prototype, "lon", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true, onDelete: "CASCADE" }),
    __metadata("design:type", Object)
], Address.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => building_entity_1.Building, (b) => b.addresses),
    (0, typeorm_1.JoinTable)({
        name: "building_addresses",
        joinColumn: { name: "address_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "building_id", referencedColumnName: "id" },
    }),
    __metadata("design:type", Array)
], Address.prototype, "buildings", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Address.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Address.prototype, "updated_at", void 0);
exports.Address = Address = __decorate([
    (0, typeorm_1.Entity)("addresses")
], Address);
//# sourceMappingURL=address.entity.js.map