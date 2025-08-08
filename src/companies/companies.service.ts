import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Company } from "./entities/company.entity";
import { CreateCompanyInput } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { User } from "../users/entities/user.entity";

@Injectable()
export class CompaniesService {
  private readonly logger = new Logger(CompaniesService.name);

  constructor(
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}

  async create(input: CreateCompanyInput): Promise<Company> {
    const company = this.companyRepo.create({
      name: input.name,
      inn: input.inn,
      email: input.email,
      phone: input.phone,
    });

    if (input.manager_id) {
      const manager = await this.userRepo.findOne({
        where: { id: input.manager_id },
      });
      if (!manager) throw new BadRequestException("Manager not found");
      company.manager = manager;
    }

    const saved = await this.companyRepo.save(company);
    this.logger.log(`Company created: ID ${saved.id}`);
    return saved;
  }

  async findAll(): Promise<Company[]> {
    return this.companyRepo.find({
      relations: ["manager", "buildings", "employees"],
    });
  }

  async findOne(id: number): Promise<Company> {
    const company = await this.companyRepo.findOne({
      where: { id },
      relations: ["manager", "buildings", "employees"],
    });
    if (!company) throw new NotFoundException("Company not found");
    return company;
  }

  async update(id: number, input: UpdateCompanyDto): Promise<Company> {
    const company = await this.findOne(id);

    if (input.manager_id) {
      const manager = await this.userRepo.findOne({
        where: { id: input.manager_id },
      });
      if (!manager) throw new BadRequestException("Manager not found");
      company.manager = manager;
    }

    Object.assign(company, {
      name: input.name ?? company.name,
      inn: input.inn ?? company.inn,
      email: input.email ?? company.email,
      phone: input.phone ?? company.phone,
    });

    const updated = await this.companyRepo.save(company);
    this.logger.log(`Company updated: ID ${updated.id}`);
    return updated;
  }

  async remove(id: number): Promise<boolean> {
    const company = await this.findOne(id);
    await this.companyRepo.remove(company);
    this.logger.log(`Company deleted: ID ${id}`);
    return true;
  }
}
