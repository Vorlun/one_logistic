import { Repository } from "typeorm";
import { Country } from "./entities/country.entity";
import { CreateCountryInput } from "./dto/create-country.dto";
import { UpdateCountryDto } from "./dto/update-country.dto";
export declare class CountriesService {
    private readonly countryRepo;
    private readonly logger;
    constructor(countryRepo: Repository<Country>);
    create(input: CreateCountryInput): Promise<Country>;
    findAll(): Promise<Country[]>;
    findOne(id: number): Promise<Country>;
    update(id: number, input: UpdateCountryDto): Promise<Country>;
    remove(id: number): Promise<boolean>;
}
