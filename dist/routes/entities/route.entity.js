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
exports.Route = void 0;
const typeorm_1 = require("typeorm");
const address_entity_1 = require("../../address/entities/address.entity");
let Route = class Route {
    id;
    origin;
    destination;
    estimated_time;
    route_type;
    distance_km;
};
exports.Route = Route;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Route.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => address_entity_1.Address, { nullable: false }),
    __metadata("design:type", address_entity_1.Address)
], Route.prototype, "origin", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => address_entity_1.Address, { nullable: false }),
    __metadata("design:type", address_entity_1.Address)
], Route.prototype, "destination", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], Route.prototype, "estimated_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], Route.prototype, "route_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "float" }),
    __metadata("design:type", Number)
], Route.prototype, "distance_km", void 0);
exports.Route = Route = __decorate([
    (0, typeorm_1.Entity)("routes")
], Route);
//# sourceMappingURL=route.entity.js.map