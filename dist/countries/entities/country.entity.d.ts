import { Region } from "../../regions/entities/region.entity";
export declare class Country {
    id: number;
    iso_code: string;
    name: string;
    regions: Region[];
}
