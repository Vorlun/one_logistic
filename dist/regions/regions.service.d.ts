import { Repository } from "typeorm";
import { Region } from "./entities/region.entity";
import { CreateRegionInput } from "./dto/create-region.dto";
import { UpdateRegionDto } from "./dto/update-region.dto";
import { Country } from "../countries/entities/country.entity";
export declare class RegionsService {
    private readonly regionRepo;
    private readonly countryRepo;
    private readonly logger;
    constructor(regionRepo: Repository<Region>, countryRepo: Repository<Country>);
    create(input: CreateRegionInput): Promise<Region>;
    findAll(): Promise<Region[]>;
    findOne(id: number): Promise<Region>;
    update(id: number, input: UpdateRegionDto): Promise<Region>;
    remove(id: number): Promise<boolean>;
}
