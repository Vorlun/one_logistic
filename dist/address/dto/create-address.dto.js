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
exports.CreateAddressInput = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateAddressInput {
    district_id;
    street;
    house_number;
    postal_code;
    lat;
    lon;
    user_id;
    building_ids;
}
exports.CreateAddressInput = CreateAddressInput;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: "District ID", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateAddressInput.prototype, "district_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Amir Temur street", description: "Street name" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreateAddressInput.prototype, "street", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "12A", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateAddressInput.prototype, "house_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "100100", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreateAddressInput.prototype, "postal_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "41.2995", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", String)
], CreateAddressInput.prototype, "lat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "69.2401", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", String)
], CreateAddressInput.prototype, "lon", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5, required: false, description: "User ID" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateAddressInput.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [1, 2],
        required: false,
        description: "Building IDs to link",
        type: [Number],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateAddressInput.prototype, "building_ids", void 0);
//# sourceMappingURL=create-address.dto.js.map