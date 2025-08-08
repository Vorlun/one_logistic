import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Country } from "./entities/country.entity";
import { CreateCountryInput } from "./dto/create-country.dto";
import { UpdateCountryDto } from "./dto/update-country.dto";

@Injectable()
export class CountriesService {
  private readonly logger = new Logger(CountriesService.name);

  constructor(
    @InjectRepository(Country)
    private readonly countryRepo: Repository<Country>
  ) {}

  async create(input: CreateCountryInput): Promise<Country> {
    const exists = await this.countryRepo.findOne({
      where: { iso_code: input.iso_code },
    });
    if (exists)
      throw new BadRequestException(
        "Country with this ISO code already exists"
      );

    const country = this.countryRepo.create(input);
    const saved = await this.countryRepo.save(country);
    this.logger.log(`Country created: ID ${saved.id}`);
    return saved;
  }

  async findAll(): Promise<Country[]> {
    return this.countryRepo.find({ relations: ["regions"] });
  }

  async findOne(id: number): Promise<Country> {
    const country = await this.countryRepo.findOne({
      where: { id },
      relations: ["regions"],
    });
    if (!country) throw new NotFoundException("Country not found");
    return country;
  }

  async update(id: number, input: UpdateCountryDto): Promise<Country> {
    const country = await this.findOne(id);

    Object.assign(country, {
      iso_code: input.iso_code ?? country.iso_code,
      name: input.name ?? country.name,
    });

    const updated = await this.countryRepo.save(country);
    this.logger.log(`Country updated: ID ${updated.id}`);
    return updated;
  }

  async remove(id: number): Promise<boolean> {
    const country = await this.findOne(id);
    await this.countryRepo.remove(country);
    this.logger.log(`Country deleted: ID ${id}`);
    return true;
  }
}
