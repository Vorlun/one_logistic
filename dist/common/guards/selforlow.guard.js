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
exports.SelfOrLowerGuard = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
let SelfOrLowerGuard = class SelfOrLowerGuard {
    userRepo;
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const currentUser = req.user;
        const targetId = +req.params.id;
        if (currentUser.id === targetId)
            return true;
        const targetUser = await this.userRepo.findOne({
            where: { id: targetId },
            relations: ["role"],
        });
        if (!targetUser) {
            throw new common_1.ForbiddenException("Target user not found");
        }
        if (currentUser.role.level > targetUser.role.level) {
            return true;
        }
        throw new common_1.ForbiddenException("You cannot manage this user");
    }
};
exports.SelfOrLowerGuard = SelfOrLowerGuard;
exports.SelfOrLowerGuard = SelfOrLowerGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SelfOrLowerGuard);
//# sourceMappingURL=selforlow.guard.js.map