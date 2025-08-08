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
exports.District = void 0;
const typeorm_1 = require("typeorm");
const region_entity_1 = require("../../regions/entities/region.entity");
const address_entity_1 = require("../../address/entities/address.entity");
let District = class District {
    id;
    name;
    region;
    addresses;
};
exports.District = District;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], District.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], District.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => region_entity_1.Region, (r) => r.districts, {
        nullable: false,
        onDelete: "RESTRICT",
    }),
    __metadata("design:type", region_entity_1.Region)
], District.prototype, "region", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => address_entity_1.Address, (a) => a.district),
    __metadata("design:type", Array)
], District.prototype, "addresses", void 0);
exports.District = District = __decorate([
    (0, typeorm_1.Entity)("districts"),
    (0, typeorm_1.Index)(["name", "region"], { unique: false })
], District);
//# sourceMappingURL=district.entity.js.map