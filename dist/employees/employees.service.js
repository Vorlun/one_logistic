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
var EmployeesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const employee_entity_1 = require("./entities/employee.entity");
const company_entity_1 = require("../companies/entities/company.entity");
const user_entity_1 = require("../users/entities/user.entity");
let EmployeesService = EmployeesService_1 = class EmployeesService {
    employeeRepo;
    companyRepo;
    userRepo;
    logger = new common_1.Logger(EmployeesService_1.name);
    constructor(employeeRepo, companyRepo, userRepo) {
        this.employeeRepo = employeeRepo;
        this.companyRepo = companyRepo;
        this.userRepo = userRepo;
    }
    async create(input) {
        const company = await this.companyRepo.findOne({
            where: { id: input.company_id },
        });
        if (!company) {
            this.logger.warn(`Company not found: ID ${input.company_id}`);
            throw new common_1.BadRequestException("Company not found");
        }
        const user = await this.userRepo.findOne({
            where: { id: input.user_id },
        });
        if (!user) {
            this.logger.warn(`User not found: ID ${input.user_id}`);
            throw new common_1.BadRequestException("User not found");
        }
        const exists = await this.employeeRepo.findOne({
            where: { company: { id: company.id }, user: { id: user.id } },
        });
        if (exists) {
            this.logger.warn(`Employee already exists for company ${company.id} and user ${user.id}`);
            throw new common_1.BadRequestException("Employee already exists");
        }
        const employee = this.employeeRepo.create({
            company,
            user,
            position: input.position,
            is_active: input.is_active ?? true,
        });
        const saved = await this.employeeRepo.save(employee);
        this.logger.log(`Employee created: ID ${saved.id}`);
        return saved;
    }
    async findAll() {
        this.logger.log("Fetching all employees");
        return this.employeeRepo.find({ relations: ["company", "user"] });
    }
    async findOne(id) {
        const employee = await this.employeeRepo.findOne({
            where: { id },
            relations: ["company", "user"],
        });
        if (!employee) {
            this.logger.warn(`Employee not found: ID ${id}`);
            throw new common_1.NotFoundException("Employee not found");
        }
        return employee;
    }
    async update(input) {
        const employee = await this.findOne(input.id);
        if (input.company_id) {
            const company = await this.companyRepo.findOne({
                where: { id: input.company_id },
            });
            if (!company) {
                throw new common_1.BadRequestException("Company not found");
            }
            employee.company = company;
        }
        if (input.user_id) {
            const user = await this.userRepo.findOne({
                where: { id: input.user_id },
            });
            if (!user) {
                throw new common_1.BadRequestException("User not found");
            }
            employee.user = user;
        }
        Object.assign(employee, {
            position: input.position ?? employee.position,
            is_active: input.is_active ?? employee.is_active,
        });
        const updated = await this.employeeRepo.save(employee);
        this.logger.log(`Employee updated: ID ${updated.id}`);
        return updated;
    }
    async remove(id) {
        const employee = await this.findOne(id);
        await this.employeeRepo.remove(employee);
        this.logger.log(`Employee deleted: ID ${id}`);
        return true;
    }
    async findAllWithRestrictions(user) {
        const employees = await this.employeeRepo.find({
            relations: ["company", "user"],
        });
        if (user.role.level === 2) {
            return employees.map((e) => ({
                id: e.id,
                position: e.position,
                is_active: e.is_active,
                company: { id: e.company.id, name: e.company.name },
                user: { email: e.user.email, full_name: e.user.full_name },
            }));
        }
        return employees;
    }
    async findOneWithRestrictions(id, user) {
        const employee = await this.findOne(id);
        if (user.role.level === 2) {
            return {
                id: employee.id,
                position: employee.position,
                is_active: employee.is_active,
                company: { id: employee.company.id, name: employee.company.name },
                user: {
                    email: employee.user.email,
                    full_name: employee.user.full_name,
                },
            };
        }
        return employee;
    }
    async filterByCompany(companyId, user) {
        const employees = await this.employeeRepo.find({
            where: { company: { id: companyId } },
            relations: ["company", "user"],
        });
        if (user.role.level === 2) {
            return employees.map((e) => ({
                id: e.id,
                position: e.position,
                is_active: e.is_active,
                company: { id: e.company.id, name: e.company.name },
                user: { email: e.user.email, full_name: e.user.full_name },
            }));
        }
        return employees;
    }
};
exports.EmployeesService = EmployeesService;
exports.EmployeesService = EmployeesService = EmployeesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __param(1, (0, typeorm_1.InjectRepository)(company_entity_1.Company)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], EmployeesService);
//# sourceMappingURL=employees.service.js.map