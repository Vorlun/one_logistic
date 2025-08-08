"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildingModule = void 0;
const common_1 = require("@nestjs/common");
const building_entity_1 = require("./entities/building.entity");
const typeorm_1 = require("@nestjs/typeorm");
const building_controller_1 = require("./building.controller");
const building_service_1 = require("./building.service");
const user_entity_1 = require("../users/entities/user.entity");
const company_entity_1 = require("../companies/entities/company.entity");
const address_entity_1 = require("../address/entities/address.entity");
let BuildingModule = class BuildingModule {
};
exports.BuildingModule = BuildingModule;
exports.BuildingModule = BuildingModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([building_entity_1.Building, user_entity_1.User, company_entity_1.Company, address_entity_1.Address])],
        controllers: [building_controller_1.BuildingsController],
        providers: [building_service_1.BuildingsService],
        exports: [building_service_1.BuildingsService],
    })
], BuildingModule);
//# sourceMappingURL=building.module.js.map