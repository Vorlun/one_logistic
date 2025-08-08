import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, In } from "typeorm";
import { Building } from "./entities/building.entity";
import { CreateBuildingInput } from "./dto/create-building.dto";
import { UpdateBuildingDto } from "./dto/update-building.dto";
import { User } from "../users/entities/user.entity";
import { Company } from "../companies/entities/company.entity";
import { Address } from "../address/entities/address.entity";

@Injectable()
export class BuildingsService {
  private readonly logger = new Logger(BuildingsService.name);

  constructor(
    @InjectRepository(Building)
    private readonly buildingRepo: Repository<Building>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,

    @InjectRepository(Address)
    private readonly addressRepo: Repository<Address>
  ) {}

  async create(input: CreateBuildingInput): Promise<Building> {
    const building = this.buildingRepo.create({
      name: input.name,
      type: input.type,
      is_active: input.is_active ?? true,
    });

    if (input.user_id) {
      const user = await this.userRepo.findOne({
        where: { id: input.user_id },
      });
      if (!user) throw new BadRequestException("User not found");
      building.user = user;
    }

    if (input.company_id) {
      const company = await this.companyRepo.findOne({
        where: { id: input.company_id },
      });
      if (!company) throw new BadRequestException("Company not found");
      building.company = company;
    }

    const saved = await this.buildingRepo.save(building);
    this.logger.log(`Building created: ID ${saved.id}`);
    return saved;
  }

  async findAll(): Promise<Building[]> {
    return this.buildingRepo.find({
      relations: ["user", "company", "addresses", "employees"],
    });
  }

  async findOne(id: number): Promise<Building> {
    const building = await this.buildingRepo.findOne({
      where: { id },
      relations: ["user", "company", "addresses", "employees"],
    });
    if (!building) throw new NotFoundException("Building not found");
    return building;
  }

  async update(id: number, input: UpdateBuildingDto): Promise<Building> {
    const building = await this.findOne(id);

    if (input.user_id) {
      const user = await this.userRepo.findOne({
        where: { id: input.user_id },
      });
      if (!user) throw new BadRequestException("User not found");
      building.user = user;
    }

    if (input.company_id) {
      const company = await this.companyRepo.findOne({
        where: { id: input.company_id },
      });
      if (!company) throw new BadRequestException("Company not found");
      building.company = company;
    }

    Object.assign(building, {
      name: input.name ?? building.name,
      type: input.type ?? building.type,
      is_active: input.is_active ?? building.is_active,
    });

    const updated = await this.buildingRepo.save(building);
    this.logger.log(`Building updated: ID ${updated.id}`);
    return updated;
  }

  async remove(id: number): Promise<boolean> {
    const building = await this.findOne(id);
    await this.buildingRepo.remove(building);
    this.logger.log(`Building deleted: ID ${id}`);
    return true;
  }
}
