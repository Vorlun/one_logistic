import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { District } from "./entities/district.entity";
import { CreateDistrictInput } from "./dto/create-district.dto";
import { UpdateDistrictDto } from "./dto/update-district.dto";
import { Region } from "../regions/entities/region.entity";

@Injectable()
export class DistrictsService {
  private readonly logger = new Logger(DistrictsService.name);

  constructor(
    @InjectRepository(District)
    private readonly districtRepo: Repository<District>,

    @InjectRepository(Region)
    private readonly regionRepo: Repository<Region>
  ) {}

  async create(input: CreateDistrictInput): Promise<District> {
    const region = await this.regionRepo.findOne({
      where: { id: input.region_id },
    });
    if (!region) {
      this.logger.warn(`Region not found for ID: ${input.region_id}`);
      throw new BadRequestException("Region not found");
    }

    const district = this.districtRepo.create({
      name: input.name,
      region,
    });

    const saved = await this.districtRepo.save(district);
    this.logger.log(`District created: ID ${saved.id}`);
    return saved;
  }

  async findAll(): Promise<District[]> {
    this.logger.log("Fetching all districts");
    return this.districtRepo.find({ relations: ["region", "addresses"] });
  }

  async findOne(id: number): Promise<District> {
    const district = await this.districtRepo.findOne({
      where: { id },
      relations: ["region", "addresses"],
    });
    if (!district) {
      this.logger.warn(`District not found: ID ${id}`);
      throw new NotFoundException("District not found");
    }
    return district;
  }

  async update(id: number, input: UpdateDistrictDto): Promise<District> {
    const district = await this.findOne(id);

    if (input.region_id) {
      const region = await this.regionRepo.findOne({
        where: { id: input.region_id },
      });
      if (!region) {
        this.logger.warn(`Region not found for ID: ${input.region_id}`);
        throw new BadRequestException("Region not found");
      }
      district.region = region;
    }

    Object.assign(district, {
      name: input.name ?? district.name,
    });

    const updated = await this.districtRepo.save(district);
    this.logger.log(`District updated: ID ${updated.id}`);
    return updated;
  }

  async remove(id: number): Promise<boolean> {
    const district = await this.findOne(id);
    await this.districtRepo.remove(district);
    this.logger.log(`District deleted: ID ${id}`);
    return true;
  }
}
