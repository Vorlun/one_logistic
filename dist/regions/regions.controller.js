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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionsController = void 0;
const common_1 = require("@nestjs/common");
const regions_service_1 = require("./regions.service");
const create_region_dto_1 = require("./dto/create-region.dto");
const update_region_dto_1 = require("./dto/update-region.dto");
const region_entity_1 = require("./entities/region.entity");
const swagger_1 = require("@nestjs/swagger");
const roles_level_decorator_1 = require("../common/decorators/roles-level.decorator");
let RegionsController = class RegionsController {
    regionsService;
    constructor(regionsService) {
        this.regionsService = regionsService;
    }
    create(input) {
        return this.regionsService.create(input);
    }
    findAll() {
        return this.regionsService.findAll();
    }
    findOne(id) {
        return this.regionsService.findOne(id);
    }
    update(id, input) {
        return this.regionsService.update(id, input);
    }
    remove(id) {
        return this.regionsService.remove(id);
    }
};
exports.RegionsController = RegionsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_level_decorator_1.RoleLevel)(2),
    (0, swagger_1.ApiOperation)({ summary: "Create a new region" }),
    (0, swagger_1.ApiBody)({ type: create_region_dto_1.CreateRegionInput }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Region successfully created",
        type: region_entity_1.Region,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_region_dto_1.CreateRegionInput]),
    __metadata("design:returntype", Promise)
], RegionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_level_decorator_1.RoleLevel)(1),
    (0, swagger_1.ApiOperation)({ summary: "Get list of all regions" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "List of regions", type: [region_entity_1.Region] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RegionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, roles_level_decorator_1.RoleLevel)(1),
    (0, swagger_1.ApiOperation)({ summary: "Get region details by ID" }),
    (0, swagger_1.ApiParam)({ name: "id", type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Region details", type: region_entity_1.Region }),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RegionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, roles_level_decorator_1.RoleLevel)(2),
    (0, swagger_1.ApiOperation)({ summary: "Update region by ID" }),
    (0, swagger_1.ApiParam)({ name: "id", type: Number }),
    (0, swagger_1.ApiBody)({ type: update_region_dto_1.UpdateRegionDto }),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_region_dto_1.UpdateRegionDto]),
    __metadata("design:returntype", Promise)
], RegionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, roles_level_decorator_1.RoleLevel)(3),
    (0, swagger_1.ApiOperation)({ summary: "Delete region by ID" }),
    (0, swagger_1.ApiParam)({ name: "id", type: Number }),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RegionsController.prototype, "remove", null);
exports.RegionsController = RegionsController = __decorate([
    (0, swagger_1.ApiTags)("Regions"),
    (0, common_1.Controller)("regions"),
    __metadata("design:paramtypes", [regions_service_1.RegionsService])
], RegionsController);
//# sourceMappingURL=regions.controller.js.map