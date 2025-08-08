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
exports.CreateRouteInput = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateRouteInput {
    origin_id;
    destination_id;
    estimated_time;
    route_type;
    distance_km;
}
exports.CreateRouteInput = CreateRouteInput;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: "Origin address ID" }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateRouteInput.prototype, "origin_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2, description: "Destination address ID" }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateRouteInput.prototype, "destination_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 120, description: "Estimated time in minutes" }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateRouteInput.prototype, "estimated_time", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "road", description: "Route type" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateRouteInput.prototype, "route_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 550.5, description: "Distance in km" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateRouteInput.prototype, "distance_km", void 0);
//# sourceMappingURL=create-route.dto.js.map