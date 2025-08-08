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
exports.CreateVehicleInput = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateVehicleInput {
    driver_id;
    company_id;
    plate_number;
    model;
    type;
    capacity_kg;
    volume_m3;
    status;
}
exports.CreateVehicleInput = CreateVehicleInput;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: "Driver ID" }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateVehicleInput.prototype, "driver_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: "Company ID" }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateVehicleInput.prototype, "company_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "01A777AA", description: "Plate number" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreateVehicleInput.prototype, "plate_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Mercedes Sprinter", description: "Vehicle model" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateVehicleInput.prototype, "model", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "fragile", description: "Product type suitable" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateVehicleInput.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2000, description: "Capacity in kg" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateVehicleInput.prototype, "capacity_kg", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 15, description: "Volume in m3" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateVehicleInput.prototype, "volume_m3", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "available", description: "Vehicle status" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreateVehicleInput.prototype, "status", void 0);
//# sourceMappingURL=create-vehicle.dto.js.map