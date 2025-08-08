import { Country } from "../../countries/entities/country.entity";
import { District } from "../../districts/entities/district.entity";
export declare class Region {
    id: number;
    name: string;
    country: Country;
    districts: District[];
}
