import { CountriesService } from "./countries.service";
import { CreateCountryInput } from "./dto/create-country.dto";
import { UpdateCountryDto } from "./dto/update-country.dto";
import { Country } from "./entities/country.entity";
export declare class CountriesController {
    private readonly countriesService;
    constructor(countriesService: CountriesService);
    create(input: CreateCountryInput): Promise<Country>;
    findAll(): Promise<Country[]>;
    findOne(id: number): Promise<Country>;
    update(id: number, input: UpdateCountryDto): Promise<Country>;
    remove(id: number): Promise<boolean>;
}
