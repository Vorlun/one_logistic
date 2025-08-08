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
exports.DistrictsController = void 0;
const common_1 = require("@nestjs/common");
const districts_service_1 = require("./districts.service");
const create_district_dto_1 = require("./dto/create-district.dto");
const update_district_dto_1 = require("./dto/update-district.dto");
const district_entity_1 = require("./entities/district.entity");
const swagger_1 = require("@nestjs/swagger");
let DistrictsController = class DistrictsController {
    districtsService;
    constructor(districtsService) {
        this.districtsService = districtsService;
    }
    create(input) {
        return this.districtsService.create(input);
    }
    findAll() {
        return this.districtsService.findAll();
    }
    findOne(id) {
        return this.districtsService.findOne(id);
    }
    update(id, input) {
        return this.districtsService.update(id, input);
    }
    remove(id) {
        return this.districtsService.remove(id);
    }
};
exports.DistrictsController = DistrictsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "Create a new district" }),
    (0, swagger_1.ApiBody)({ type: create_district_dto_1.CreateDistrictInput }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "District created", type: district_entity_1.District }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_district_dto_1.CreateDistrictInput]),
    __metadata("design:returntype", Promise)
], DistrictsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Get list of all districts" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DistrictsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Get district by ID" }),
    (0, swagger_1.ApiParam)({ name: "id", type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "District details", type: district_entity_1.District }),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DistrictsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Update district by ID" }),
    (0, swagger_1.ApiParam)({ name: "id", type: Number }),
    (0, swagger_1.ApiBody)({ type: update_district_dto_1.UpdateDistrictDto }),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_district_dto_1.UpdateDistrictDto]),
    __metadata("design:returntype", Promise)
], DistrictsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Delete district by ID" }),
    (0, swagger_1.ApiParam)({ name: "id", type: Number }),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DistrictsController.prototype, "remove", null);
exports.DistrictsController = DistrictsController = __decorate([
    (0, swagger_1.ApiTags)("Districts"),
    (0, common_1.Controller)("districts"),
    __metadata("design:paramtypes", [districts_service_1.DistrictsService])
], DistrictsController);
//# sourceMappingURL=districts.controller.js.map