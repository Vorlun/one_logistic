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
exports.RolesController = void 0;
const common_1 = require("@nestjs/common");
const roles_service_1 = require("./roles.service");
const create_role_input_1 = require("./inputs/create-role.input");
const update_role_input_1 = require("./inputs/update-role.input");
const role_entity_1 = require("./entities/role.entity");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_level_decorator_1 = require("../common/decorators/roles-level.decorator");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const user_entity_1 = require("../users/entities/user.entity");
const roles_guard_1 = require("../common/guards/roles.guard");
let RolesController = class RolesController {
    rolesService;
    constructor(rolesService) {
        this.rolesService = rolesService;
    }
    create(input) {
        return this.rolesService.create(input);
    }
    findAll(user) {
        return this.rolesService.findAllWithRestrictions(user);
    }
    findOne(id, user) {
        return this.rolesService.findOneWithRestrictions(id, user);
    }
    update(id, input) {
        return this.rolesService.update({ ...input, id });
    }
    remove(id) {
        return this.rolesService.remove(id);
    }
    filterByName(name, user) {
        return this.rolesService.filterByName(name, user);
    }
};
exports.RolesController = RolesController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_level_decorator_1.RoleLevel)(3),
    (0, swagger_1.ApiOperation)({ summary: "Create a new role", description: "Access: Super Admin (Level 3)" }),
    (0, swagger_1.ApiBody)({ type: create_role_input_1.CreateRoleInput }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "Role successfully created", type: role_entity_1.Role }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_role_input_1.CreateRoleInput]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_level_decorator_1.RoleLevel)(2),
    (0, swagger_1.ApiOperation)({ summary: "Get list of all roles", description: "Access: Admin (Level 2) and higher" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "List of roles" }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, roles_level_decorator_1.RoleLevel)(2),
    (0, swagger_1.ApiOperation)({ summary: "Get role details by ID", description: "Access: Admin (Level 2) and higher" }),
    (0, swagger_1.ApiParam)({ name: "id", type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Role details", type: role_entity_1.Role }),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, roles_level_decorator_1.RoleLevel)(3),
    (0, swagger_1.ApiOperation)({ summary: "Update role by ID", description: "Access: Super Admin (Level 3)" }),
    (0, swagger_1.ApiParam)({ name: "id", type: Number }),
    (0, swagger_1.ApiBody)({ type: update_role_input_1.UpdateRoleInput }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Role successfully updated", type: role_entity_1.Role }),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, roles_level_decorator_1.RoleLevel)(3),
    (0, swagger_1.ApiOperation)({ summary: "Delete role by ID", description: "Access: Super Admin (Level 3)" }),
    (0, swagger_1.ApiParam)({ name: "id", type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Role successfully deleted" }),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)("filter/name/:name"),
    (0, roles_level_decorator_1.RoleLevel)(2),
    (0, swagger_1.ApiOperation)({ summary: "Filter roles by name", description: "Access: Admin (Level 2) and higher" }),
    (0, swagger_1.ApiParam)({ name: "name", type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Filtered roles list" }),
    __param(0, (0, common_1.Param)("name")),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "filterByName", null);
exports.RolesController = RolesController = __decorate([
    (0, swagger_1.ApiTags)("Roles"),
    (0, common_1.Controller)("roles"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.LevelGuard),
    __metadata("design:paramtypes", [roles_service_1.RolesService])
], RolesController);
//# sourceMappingURL=roles.controller.js.map