import { Repository } from "typeorm";
import { Company } from "./entities/company.entity";
import { CreateCompanyInput } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { User } from "../users/entities/user.entity";
export declare class CompaniesService {
    private readonly companyRepo;
    private readonly userRepo;
    private readonly logger;
    constructor(companyRepo: Repository<Company>, userRepo: Repository<User>);
    create(input: CreateCompanyInput): Promise<Company>;
    findAll(): Promise<Company[]>;
    findOne(id: number): Promise<Company>;
    update(id: number, input: UpdateCompanyDto): Promise<Company>;
    remove(id: number): Promise<boolean>;
}
