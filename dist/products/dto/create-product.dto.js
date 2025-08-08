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
exports.CreateProductInput = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateProductInput {
    order_id;
    name;
    weight_kg;
    volume_m3;
    quantity;
    type;
    price_per;
}
exports.CreateProductInput = CreateProductInput;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: "Order ID" }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateProductInput.prototype, "order_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Glass Bottles", description: "Product name" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateProductInput.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 200, description: "Weight per item in kg" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProductInput.prototype, "weight_kg", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0.5, description: "Volume per item in m3" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProductInput.prototype, "volume_m3", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100, description: "Quantity of items" }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateProductInput.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "fragile", description: "Product type" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateProductInput.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10.5, description: "Price per item" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProductInput.prototype, "price_per", void 0);
//# sourceMappingURL=create-product.dto.js.map