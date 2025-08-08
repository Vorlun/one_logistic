import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Employee } from "./entities/employee.entity";
import { CreateEmployeeInput } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { Company } from "../companies/entities/company.entity";
import { User } from "../users/entities/user.entity";

@Injectable()
export class EmployeesService {
  private readonly logger = new Logger(EmployeesService.name);

  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,

    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}

  async create(input: CreateEmployeeInput): Promise<Employee> {
    const company = await this.companyRepo.findOne({
      where: { id: input.company_id },
    });
    if (!company) {
      this.logger.warn(`Company not found: ID ${input.company_id}`);
      throw new BadRequestException("Company not found");
    }

    const user = await this.userRepo.findOne({
      where: { id: input.user_id },
    });
    if (!user) {
      this.logger.warn(`User not found: ID ${input.user_id}`);
      throw new BadRequestException("User not found");
    }

    const exists = await this.employeeRepo.findOne({
      where: { company: { id: company.id }, user: { id: user.id } },
    });
    if (exists) {
      this.logger.warn(
        `Employee already exists for company ${company.id} and user ${user.id}`
      );
      throw new BadRequestException("Employee already exists");
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

  async findAll(): Promise<Employee[]> {
    this.logger.log("Fetching all employees");
    return this.employeeRepo.find({ relations: ["company", "user"] });
  }

  async findOne(id: number): Promise<Employee> {
    const employee = await this.employeeRepo.findOne({
      where: { id },
      relations: ["company", "user"],
    });
    if (!employee) {
      this.logger.warn(`Employee not found: ID ${id}`);
      throw new NotFoundException("Employee not found");
    }
    return employee;
  }

  async update(input: UpdateEmployeeDto & { id: number }): Promise<Employee> {
    const employee = await this.findOne(input.id);

    if (input.company_id) {
      const company = await this.companyRepo.findOne({
        where: { id: input.company_id },
      });
      if (!company) {
        throw new BadRequestException("Company not found");
      }
      employee.company = company;
    }

    if (input.user_id) {
      const user = await this.userRepo.findOne({
        where: { id: input.user_id },
      });
      if (!user) {
        throw new BadRequestException("User not found");
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

  async remove(id: number): Promise<boolean> {
    const employee = await this.findOne(id);
    await this.employeeRepo.remove(employee);
    this.logger.log(`Employee deleted: ID ${id}`);
    return true;
  }

  async findAllWithRestrictions(user: User): Promise<any[]> {
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

  async findOneWithRestrictions(id: number, user: User): Promise<any> {
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

  async filterByCompany(companyId: number, user: User): Promise<any[]> {
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
}
