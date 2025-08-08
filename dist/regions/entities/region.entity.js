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
exports.Region = void 0;
const typeorm_1 = require("typeorm");
const country_entity_1 = require("../../countries/entities/country.entity");
const district_entity_1 = require("../../districts/entities/district.entity");
let Region = class Region {
    id;
    name;
    country;
    districts;
};
exports.Region = Region;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Region.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Region.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => country_entity_1.Country, (c) => c.regions, {
        nullable: false,
        onDelete: "RESTRICT",
    }),
    __metadata("design:type", country_entity_1.Country)
], Region.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => district_entity_1.District, (d) => d.region),
    __metadata("design:type", Array)
], Region.prototype, "districts", void 0);
exports.Region = Region = __decorate([
    (0, typeorm_1.Entity)("regions"),
    (0, typeorm_1.Index)(["name", "country"], { unique: false })
], Region);
//# sourceMappingURL=region.entity.js.map