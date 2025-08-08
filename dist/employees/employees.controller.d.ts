import { EmployeesService } from "./employees.service";
import { CreateEmployeeInput } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { Employee } from "./entities/employee.entity";
import { User } from "../users/entities/user.entity";
export declare class EmployeesController {
    private readonly employeesService;
    constructor(employeesService: EmployeesService);
    create(input: CreateEmployeeInput): Promise<Employee>;
    findAll(user: User): Promise<any>;
    findOne(id: number, user: User): Promise<any>;
    update(id: number, input: Omit<UpdateEmployeeDto, "id">): Promise<Employee>;
    remove(id: number): Promise<boolean>;
    filterByCompany(companyId: number, user: User): Promise<any>;
}
