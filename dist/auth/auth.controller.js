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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const create_user_dto_1 = require("../users/dto/create-user.dto");
const swagger_1 = require("@nestjs/swagger");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const reset_password_dto_1 = require("../users/dto/reset-password.dto");
const self_guard_1 = require("../common/guards/self.guard");
const user_entity_1 = require("../users/entities/user.entity");
class LoginDto {
    email;
    password;
}
class ChangePasswordDto {
    oldPassword;
    newPassword;
    confirmPassword;
}
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async register(dto, currentUser, res) {
        const caller = currentUser ??
            {
                role: { id: 0, name: "guest", level: 0 },
            };
        return this.authService.register(dto, caller, res);
    }
    async registerAdmin(dto, currentUser, res) {
        const caller = currentUser ??
            {
                role: { id: 0, name: "guest", level: 0 },
            };
        return this.authService.register(dto, caller, res);
    }
    async login(email, password, res) {
        return this.authService.login(email, password, res);
    }
    async logout(currentUser, res) {
        return this.authService.logout(currentUser.id, res);
    }
    async refresh(req, res) {
        return this.authService.refresh(req, res);
    }
    async changePassword(currentUser, oldPassword, newPassword, confirmPassword) {
        return this.authService.changePassword(currentUser.id, oldPassword, newPassword, confirmPassword);
    }
    async forgotPassword(email) {
        return this.authService.forgotPassword(email);
    }
    async setNewPassword(token, body) {
        return this.authService.setNewPassword(token, body.newPassword, body.confirmPassword);
    }
    async activateAccount(token) {
        return this.authService.activateAccount(token);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)("register"),
    (0, swagger_1.ApiOperation)({ summary: "Register a new user" }),
    (0, swagger_1.ApiBody)({ type: create_user_dto_1.CreateUserDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "User registered successfully",
        type: user_entity_1.User,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Validation failed" }),
    (0, swagger_1.ApiResponse)({ status: 409, description: "User already exists" }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)("register-admin"),
    (0, swagger_1.ApiOperation)({ summary: "Register a new admin user" }),
    (0, swagger_1.ApiBody)({ type: create_user_dto_1.CreateUserDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Admin user registered successfully",
        type: user_entity_1.User,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Validation failed" }),
    (0, swagger_1.ApiResponse)({ status: 409, description: "User already exists" }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerAdmin", null);
__decorate([
    (0, common_1.Post)("login"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: "Login user and get tokens" }),
    (0, swagger_1.ApiBody)({ type: LoginDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Access token returned" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Invalid credentials" }),
    __param(0, (0, common_1.Body)("email")),
    __param(1, (0, common_1.Body)("password")),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)("logout"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, self_guard_1.SelfGuard),
    (0, swagger_1.ApiCookieAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Logout user and clear refresh token" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Successfully logged out" }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)("refresh"),
    (0, swagger_1.ApiCookieAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Get new access token using refresh token" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "New access token returned" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Invalid or expired refresh token" }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, common_1.Post)("change-password"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, self_guard_1.SelfGuard),
    (0, swagger_1.ApiCookieAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Change password (old + new)" }),
    (0, swagger_1.ApiBody)({ type: ChangePasswordDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Password updated successfully" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Validation failed" }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)("oldPassword")),
    __param(2, (0, common_1.Body)("newPassword")),
    __param(3, (0, common_1.Body)("confirmPassword")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Post)("forgot-password"),
    (0, swagger_1.ApiOperation)({ summary: "Request password reset email" }),
    (0, swagger_1.ApiBody)({ schema: { example: { email: "user@example.com" } } }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Reset link sent to email" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Email not found" }),
    __param(0, (0, common_1.Body)("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)("reset-password/:token"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: "Set new password" }),
    (0, swagger_1.ApiParam)({
        name: "token",
        required: true,
        description: "Reset token from email",
    }),
    (0, swagger_1.ApiBody)({ type: reset_password_dto_1.SetNewPasswordDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Password reset successful" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Invalid or expired token" }),
    __param(0, (0, common_1.Param)("token")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, reset_password_dto_1.SetNewPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "setNewPassword", null);
__decorate([
    (0, common_1.Get)("activate/:token"),
    (0, swagger_1.ApiOperation)({ summary: "Activate user account" }),
    (0, swagger_1.ApiParam)({
        name: "token",
        required: true,
        description: "Activation token from email",
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Account activated successfully" }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "Invalid or expired activation token",
    }),
    __param(0, (0, common_1.Param)("token")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "activateAccount", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)("Auth"),
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map