import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Region } from "./entities/region.entity";
import { CreateRegionInput } from "./dto/create-region.dto";
import { UpdateRegionDto } from "./dto/update-region.dto";
import { Country } from "../countries/entities/country.entity";

@Injectable()
export class RegionsService {
  private readonly logger = new Logger(RegionsService.name);

  constructor(
    @InjectRepository(Region)
    private readonly regionRepo: Repository<Region>,

    @InjectRepository(Country)
    private readonly countryRepo: Repository<Country>
  ) {}

  async create(input: CreateRegionInput): Promise<Region> {
    const country = await this.countryRepo.findOne({
      where: { id: input.country_id },
    });
    if (!country) throw new BadRequestException("Country not found");

    const exists = await this.regionRepo.findOne({
      where: { name: input.name, country: { id: input.country_id } },
    });
    if (exists)
      throw new BadRequestException("Region already exists in this country");

    const region = this.regionRepo.create({
      name: input.name,
      country,
    });
    const saved = await this.regionRepo.save(region);
    this.logger.log(`Region created: ID ${saved.id}`);
    return saved;
  }

  async findAll(): Promise<Region[]> {
    return this.regionRepo.find({ relations: ["country"] });
  }

  async findOne(id: number): Promise<Region> {
    const region = await this.regionRepo.findOne({
      where: { id },
      relations: ["country"],
    });
    if (!region) throw new NotFoundException("Region not found");
    return region;
  }

  async update(id: number, input: UpdateRegionDto): Promise<Region> {
    const region = await this.findOne(id);

    if (input.country_id) {
      const country = await this.countryRepo.findOne({
        where: { id: input.country_id },
      });
      if (!country) throw new BadRequestException("Country not found");
      region.country = country;
    }

    if (input.name) {
      const exists = await this.regionRepo.findOne({
        where: {
          name: input.name,
          country: { id: input.country_id ?? region.country.id },
        },
      });
      if (exists && exists.id !== region.id) {
        throw new BadRequestException(
          "Region with this name already exists in this country"
        );
      }
    }

    Object.assign(region, {
      name: input.name ?? region.name,
    });

    const updated = await this.regionRepo.save(region);
    this.logger.log(`Region updated: ID ${updated.id}`);
    return updated;
  }

  async remove(id: number): Promise<boolean> {
    const region = await this.findOne(id);
    await this.regionRepo.remove(region);
    this.logger.log(`Region deleted: ID ${id}`);
    return true;
  }
}
