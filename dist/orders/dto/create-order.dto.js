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
exports.CreateOrderInput = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateOrderInput {
    client_id;
    dispatcher_id;
    pickup_address_id;
    delivery_address_id;
    route_id;
    vehicle_ids;
    status;
    total_price;
    currency;
}
exports.CreateOrderInput = CreateOrderInput;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: "Client user ID" }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateOrderInput.prototype, "client_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2, description: "Dispatcher user ID" }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateOrderInput.prototype, "dispatcher_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10, description: "Pickup address ID" }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateOrderInput.prototype, "pickup_address_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 11, description: "Delivery address ID" }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateOrderInput.prototype, "delivery_address_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5, description: "Route ID" }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateOrderInput.prototype, "route_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [1, 2],
        description: "Vehicle IDs assigned to order",
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.IsInt)({ each: true }),
    __metadata("design:type", Array)
], CreateOrderInput.prototype, "vehicle_ids", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "pending", description: "Order status" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreateOrderInput.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1500.75, description: "Total price" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateOrderInput.prototype, "total_price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "USD", description: "Currency code" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(10),
    __metadata("design:type", String)
], CreateOrderInput.prototype, "currency", void 0);
//# sourceMappingURL=create-order.dto.js.map