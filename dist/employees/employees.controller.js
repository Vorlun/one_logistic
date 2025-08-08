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
exports.EmployeesController = void 0;
const common_1 = require("@nestjs/common");
const employees_service_1 = require("./employees.service");
const create_employee_dto_1 = require("./dto/create-employee.dto");
const update_employee_dto_1 = require("./dto/update-employee.dto");
const employee_entity_1 = require("./entities/employee.entity");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_level_decorator_1 = require("../common/decorators/roles-level.decorator");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const user_entity_1 = require("../users/entities/user.entity");
const roles_guard_1 = require("../common/guards/roles.guard");
let EmployeesController = class EmployeesController {
    employeesService;
    constructor(employeesService) {
        this.employeesService = employeesService;
    }
    create(input) {
        return this.employeesService.create(input);
    }
    findAll(user) {
        return this.employeesService.findAllWithRestrictions(user);
    }
    findOne(id, user) {
        return this.employeesService.findOneWithRestrictions(id, user);
    }
    update(id, input) {
        return this.employeesService.update({ ...input, id });
    }
    remove(id) {
        return this.employeesService.remove(id);
    }
    filterByCompany(companyId, user) {
        return this.employeesService.filterByCompany(companyId, user);
    }
};
exports.EmployeesController = EmployeesController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_level_decorator_1.RoleLevel)(2),
    (0, swagger_1.ApiOperation)({
        summary: "Create a new employee",
        description: "Access: Admin (Level 2) and higher",
    }),
    (0, swagger_1.ApiBody)({ type: create_employee_dto_1.CreateEmployeeInput }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Employee successfully created",
        type: employee_entity_1.Employee,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_employee_dto_1.CreateEmployeeInput]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_level_decorator_1.RoleLevel)(2),
    (0, swagger_1.ApiOperation)({
        summary: "Get list of all employees",
        description: "Access: Admin (Level 2) and higher",
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "List of employees" }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, roles_level_decorator_1.RoleLevel)(2),
    (0, swagger_1.ApiOperation)({
        summary: "Get employee details by ID",
        description: "Access: Admin (Level 2) and higher",
    }),
    (0, swagger_1.ApiParam)({ name: "id", type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Employee details", type: employee_entity_1.Employee }),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, roles_level_decorator_1.RoleLevel)(2),
    (0, swagger_1.ApiOperation)({
        summary: "Update employee by ID",
        description: "Access: Admin (Level 2) and higher",
    }),
    (0, swagger_1.ApiParam)({ name: "id", type: Number }),
    (0, swagger_1.ApiBody)({ type: update_employee_dto_1.UpdateEmployeeDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Employee successfully updated",
        type: employee_entity_1.Employee,
    }),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, roles_level_decorator_1.RoleLevel)(3),
    (0, swagger_1.ApiOperation)({
        summary: "Delete employee by ID",
        description: "Access: Super Admin (Level 3)",
    }),
    (0, swagger_1.ApiParam)({ name: "id", type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Employee successfully deleted" }),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)("filter/company/:companyId"),
    (0, roles_level_decorator_1.RoleLevel)(2),
    (0, swagger_1.ApiOperation)({
        summary: "Filter employees by company ID",
        description: "Access: Admin (Level 2) and higher",
    }),
    (0, swagger_1.ApiParam)({ name: "companyId", type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Filtered employees list" }),
    __param(0, (0, common_1.Param)("companyId", common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "filterByCompany", null);
exports.EmployeesController = EmployeesController = __decorate([
    (0, swagger_1.ApiTags)("Employees"),
    (0, common_1.Controller)("employees"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.LevelGuard),
    __metadata("design:paramtypes", [employees_service_1.EmployeesService])
], EmployeesController);
//# sourceMappingURL=employees.controller.js.map