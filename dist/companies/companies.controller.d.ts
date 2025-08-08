import { CompaniesService } from "./companies.service";
import { CreateCompanyInput } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { Company } from "./entities/company.entity";
export declare class CompaniesController {
    private readonly companiesService;
    constructor(companiesService: CompaniesService);
    create(input: CreateCompanyInput): Promise<Company>;
    findAll(): Promise<Company[]>;
    findOne(id: number): Promise<Company>;
    update(id: number, input: UpdateCompanyDto): Promise<Company>;
    remove(id: number): Promise<boolean>;
}
