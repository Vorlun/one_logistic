import { Repository } from "typeorm";
import { Employee } from "./entities/employee.entity";
import { CreateEmployeeInput } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { Company } from "../companies/entities/company.entity";
import { User } from "../users/entities/user.entity";
export declare class EmployeesService {
    private readonly employeeRepo;
    private readonly companyRepo;
    private readonly userRepo;
    private readonly logger;
    constructor(employeeRepo: Repository<Employee>, companyRepo: Repository<Company>, userRepo: Repository<User>);
    create(input: CreateEmployeeInput): Promise<Employee>;
    findAll(): Promise<Employee[]>;
    findOne(id: number): Promise<Employee>;
    update(input: UpdateEmployeeDto & {
        id: number;
    }): Promise<Employee>;
    remove(id: number): Promise<boolean>;
    findAllWithRestrictions(user: User): Promise<any[]>;
    findOneWithRestrictions(id: number, user: User): Promise<any>;
    filterByCompany(companyId: number, user: User): Promise<any[]>;
}
